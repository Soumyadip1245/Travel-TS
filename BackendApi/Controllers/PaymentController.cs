using BackendApi.Models;
using BackendApi.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Text;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly string _razorpayKeyId;
        private readonly string _razorpayKeySecret;
        private readonly HttpClient _httpClient;

        public PaymentController(ApplicationDbContext context, HttpClient httpClient, IConfiguration configuration)
        {
            _context = context;
            _httpClient = httpClient;
            _razorpayKeyId = configuration["Razorpay:KeyId"];
            _razorpayKeySecret = configuration["Razorpay:KeySecret"];
        }
        [HttpPost("createPaymentLink")]
        public async Task<IActionResult> CreatePaymentLink([FromBody] PaymentRequest request)
        {
            var booking = _context.Bookings.FirstOrDefault(b => b.BookingId == request.Id);

            // Check if booking exists
            if (booking == null)
            {
                return BadRequest("Booking not found.");
            }

            // Update the booking status
            booking.Status = "Approved";

            // Save changes to the database
            await _context.SaveChangesAsync();
            var url = "https://localhost:7259/api/payment/callback?bookingId=" + request.Id;
            // Prepare the request payload
            var payload = new
            {
                amount = request.Amount * 100,
                currency = "INR",
                customer = new
                {
                    name = request.CustomerName,
                    email = request.CustomerEmail
                },
                notify = new
                {
                    email = true
                },
                callback_url = url,
                callback_method = "get"
            };

            // Convert payload to JSON
            var jsonPayload = JsonConvert.SerializeObject(payload);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            // Setup HTTP request
            var requestMessage = new HttpRequestMessage(HttpMethod.Post, "https://api.razorpay.com/v1/payment_links/")
            {
                Headers =
                {
                    Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue(
                        "Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_razorpayKeyId}:{_razorpayKeySecret}")))
                },
                Content = content
            };

            // Send request and get response
            var response = await _httpClient.SendAsync(requestMessage);
            response.EnsureSuccessStatusCode();
            var responseData = await response.Content.ReadAsStringAsync();

            // Parse the response data
            dynamic paymentLinkResponse = JsonConvert.DeserializeObject<dynamic>(responseData);

            // Extract payment link and handle possible issues
            string paymentLink = paymentLinkResponse?.short_url;

            if (string.IsNullOrEmpty(paymentLink))
            {
                return StatusCode(500, "Failed to generate payment link.");
            }

            // Return the payment link
            return Ok("Booking accepted and payment link is sent to buyer");
        }
        [HttpGet("callback")]
        public async Task<IActionResult> HandleRazorpayCallback([FromQuery] int bookingId, [FromQuery] string razorpay_payment_id)
        {
            // Fetch the booking details from the database
            var booking = await _context.Bookings
                .Include(b => b.Package)
                .ThenInclude(p => p.Supplier)
                .Where(b => b.BookingId == bookingId)
                .FirstOrDefaultAsync();

            if (booking == null)
            {
                return NotFound("Booking not found.");
            }

            // Log payment details for debugging
            System.Diagnostics.Debug.WriteLine($"Payment ID: {razorpay_payment_id}");
            decimal percentageIncome = booking.Package.PercentageIncome;
            decimal amountToTransfer = booking.SupplierPaymentAmount * (1 - (percentageIncome / 100)) * 100;

            // Prepare the transfer payload
            var transferPayload = new
            {
                transfers = new[]
                {
            new
            {
                account = booking.Package.Supplier.AccountId,
                amount = amountToTransfer,
                currency = "INR"
            }
        }
            };

            // Convert payload to JSON
            var jsonPayload = JsonConvert.SerializeObject(transferPayload);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            // Setup HTTP request for transferring funds
            var requestMessage = new HttpRequestMessage(HttpMethod.Post, $"https://api.razorpay.com/v1/payments/{razorpay_payment_id}/transfers")
            {
                Headers =
        {
            Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue(
                "Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_razorpayKeyId}:{_razorpayKeySecret}")))
        },
                Content = content
            };

            // Send the transfer request and get response
            var response = await _httpClient.SendAsync(requestMessage);
            response.EnsureSuccessStatusCode();
            var responseData = await response.Content.ReadAsStringAsync();

            // Parse the response data
            dynamic paymentLinkResponse = JsonConvert.DeserializeObject<dynamic>(responseData);

            // Create a new Payment object and associate it with the booking
            Payment payment = new Payment
            {
                Booking = booking,
                PaymentStatus = "Paid",
                Amount = booking.TotalPrice,
                TransactionId = razorpay_payment_id,
                PaymentMethod = "Razorpay"
            };

            // Add the payment to the context
            _context.Payment.Add(payment); // Ensure Payment entity is tracked

            // Update the booking status and payment association
            booking.Payment = payment;
            booking.Status = "Confirmed";
            booking.Package.AvailableCount = booking.Package.AvailableCount < 0? 0: booking.Package.AvailableCount - 1;
            // Save changes to the database
            await _context.SaveChangesAsync();  // Ensure changes are persisted

            // Return response
            return Ok(new
            {
                Message = $"Thank you! Payment is confirmed for booking {bookingId}.",
                PaymentId = razorpay_payment_id
            });
        }
    }
        // Request model for creating payment link
        public class PaymentRequest
    {
        public int Amount { get; set; }
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
    }
}