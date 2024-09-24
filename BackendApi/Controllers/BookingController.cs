using BackendApi.Models;
using BackendApi.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailSender emailContext;
        public BookingController(ApplicationDbContext context, IEmailSender emailSender)
        {
            _context = context;
            emailContext = emailSender;
        }
        [HttpPost("createBooking")]
       public async Task<IActionResult> createBooking([FromBody] BookingViewModel bm)
        {
            var packages = _context.Package.Where(p => p.Id == bm.PackageId).ToList().First();
            var users = _context.User.Where(u => u.Id == bm.UserId).ToList().First();
            var suppliers = _context.User.Where(u => u.Id == bm.SupplierId).ToList().First();
            if (packages.AvailableCount < bm.NumberOfAdults + bm.NumberOfChildren)
            {
                return BadRequest("Unfortunately! while booking packages got booked!!");
            }
            List<TravelerInfo> tfList = new List<TravelerInfo>();
            for (int i = 0; i < bm.Travellers.Count; i++)
            {
                TravelerInfo tf = new TravelerInfo();
                tf.FullName = bm.Travellers[i].FullName;
                tf.PassportNumber = bm.Travellers[i].PassportNumber;
                tf.DateOfBirth = bm.Travellers[i].DateOfBirth;
                tfList.Add(tf);
            }
            Booking b = new Booking();
            b.TravelerInfos = tfList;
            b.Package = packages;
            b.StartDate = bm.StartDate;
            b.EndDate = bm.EndDate; 
            b.NumberOfAdults = bm.NumberOfAdults;
            b.NumberOfChildren = bm.NumberOfChildren;
            b.TotalPrice = bm.TotalPrice;
            b.SupplierPaymentAmount = bm.SupplierPaymentAmount;
            b.SpecialRequests = bm.SpecialRequests;
            b.IsCustomerDetailsVisible = false;
            b.User = users;
            b.Supplier = suppliers;
            _context.Bookings.Add(b);
            _context.Package.Update(packages);
            _context.SaveChanges();
            await SendVerificationEmail(users.Email, bm.Travellers.First().FullName, "https://localhost:5173/invoice/id=" + b.BookingId);
            return Ok("Booking is done successfully! Wait for vendor to approve.");

        }
        [HttpGet("GetBookingWithId")]
        public async Task<IActionResult> GetBookingWithId(int id)
        {
            var booking =  _context.Bookings
                .Include(b => b.Package)
                .Include(b=>b.User)
                .Include(b => b.TravelerInfos).Where(b => b.BookingId == id).FirstOrDefault();
            return Ok(booking);
        }
        private async Task<IActionResult> SendVerificationEmail(string email, string userName, string invoiceUrl)
        {
            // Construct the email subject
            var subject = "Your Invoice is Ready";

            // Construct the email message using the HTML template
            var message = $@"
    <!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Invoice Ready</title>
        <style>
            body {{ font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; color: #333; }}
            .container {{ max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }}
            h1 {{ color: #4CAF50; text-align: center; }}
            .content {{ text-align: center; }}
            .content p {{ font-size: 16px; line-height: 1.5; }}
            .btn {{ display: inline-block; background-color: #4CAF50; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 16px; border-radius: 5px; margin-top: 20px; }}
            .btn:hover {{ background-color: #45a049; }}
            .footer {{ text-align: center; font-size: 14px; color: #777; margin-top: 20px; }}
        </style>
    </head>
    <body>
        <div class='container'>
            <h1>Your Invoice is Ready!</h1>
            <div class='content'>
                <p>Dear {userName},</p>
                <p>We are pleased to inform you that your invoice is now ready. Please click the button below to view and download your invoice.</p>
                <a href='{invoiceUrl}' class='btn'>View Invoice</a>
                <p>If you have any questions or need further assistance, feel free to contact us.</p>
            </div>
            <div class='footer'>
                <p>&copy; 2024 Your Company. All rights reserved.</p>
                <p><a href='mailto:support@example.com'>Contact Us</a></p>
            </div>
        </div>
    </body>
    </html>";

            // Send the email
            await emailContext.SendEmailAsync(email, subject, message);

            return Ok("Invoice email sent successfully.");
        }

        [HttpGet("GetBusiness")]
        public async Task<IActionResult> GetBooking(int userId)
        {
            var businessPending = await _context.Bookings
                .Include(b=>b.User)
                .Include(b=>b.Package)
                .ThenInclude(b=>b.Destination)
                .Where(b=>b.SupplierId == userId && (b.Status == "Pending" || b.Status == "Approved")).ToListAsync();
            var businessCompleted = await _context.Bookings
               .Include(b => b.User)
               .Include(b=>b.TravelerInfos)
               .Include(b=>b.Payment)
               .Include(b => b.Package)
               .ThenInclude(b => b.Destination)
               .Where(b => b.SupplierId == userId && b.Status == "Confirmed").ToListAsync();
            var businessRejected = await _context.Bookings
               .Include(b => b.User)
               .Include(b => b.TravelerInfos)
               .Include(b => b.Payment)
               .Include(b => b.Package)
               .ThenInclude(b => b.Destination)
               .Where(b => b.SupplierId == userId && b.Status == "Rejected").ToListAsync();
            BookingSupplier bs = new BookingSupplier();
            bs.PendingBookings = businessPending ;
            bs.AllBookings = businessCompleted ;
            bs.RejectedBooking = businessRejected ;
            return Ok(bs);
        }
        [HttpGet("GetBusinessForUser")]
        public async Task<IActionResult> GetBookingFOrUser(int userId)
        {

            var businessPending = await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Package)
                .ThenInclude(b => b.Destination)
                .Where(b => b.UserId == userId && (b.Status == "Pending" || b.Status == "Approved")).ToListAsync();
            var businessCompleted = await _context.Bookings
               .Include(b => b.User)
               .Include(b => b.TravelerInfos)
               .Include(b => b.Payment)
               .Include(b => b.Package)
               .ThenInclude(b => b.Destination).
               Where(b=>b.UserId == userId && b.Status == "Confirmed").ToListAsync();
            var businessRejected = await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Package)
                .ThenInclude(b => b.Destination)
                .Where(b => b.UserId == userId && (b.Status == "Rejected")).ToListAsync();
            BookingSupplier bs = new BookingSupplier();
            bs.PendingBookings = businessPending;
            bs.AllBookings = businessCompleted;
            bs.RejectedBooking = businessRejected;
            return Ok(bs);
        }
        [HttpGet("GetBusinessForAdmin")]
        public async Task<IActionResult> GetBusinessForAdmin()
        {
            var businessPending = await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Package)
                .ThenInclude(b => b.Destination)
                .Where(b =>  (b.Status == "Pending" || b.Status == "Approved")).ToListAsync();
            var businessCompleted = await _context.Bookings
               .Include(b => b.User)
               .Include(b => b.TravelerInfos)
               .Include(b => b.Payment)
               .Include(b => b.Package)
               .ThenInclude(b => b.Destination)
               .Where(b => b.Status == "Confirmed").ToListAsync();
              var businessRejected = await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Package)
                .ThenInclude(b => b.Destination)
                .Where(b =>  (b.Status == "Rejected")).ToListAsync();
            BookingSupplier bs = new BookingSupplier();
            bs.PendingBookings = businessPending;
            bs.AllBookings = businessCompleted;
            bs.RejectedBooking = businessRejected;
            return Ok(bs);
        }
        [HttpGet("RejectBooking")]
        public async Task<IActionResult> RejectBooking(int id)
        {
            var booking = _context.Bookings
               .Where(b => b.BookingId == id).FirstOrDefault();
            booking.Status = "Rejected";
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();
            return Ok("Booking Rejected");
        }
        
    }

    public class BookingSupplier
    {
        public virtual List<Booking> PendingBookings { get; set; }
        public virtual List<Booking> AllBookings { get; set; }
         public virtual List<Booking> RejectedBooking { get; set; }
    }
}
