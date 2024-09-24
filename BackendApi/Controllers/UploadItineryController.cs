using BackendApi.Models;
using BackendApi.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace BackendApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UploadItineryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;


        public UploadItineryController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }
        [HttpPost("UploadItinery")]
        public async Task<IActionResult> UploadFile([FromQuery] int bookingId,[FromQuery] string fileName, [FromQuery] string type, IFormFile pdfFile)
        {
            var booking = _context.Bookings.Where(b=> b.BookingId == bookingId).FirstOrDefault();
            string webRootPath = _environment?.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            if (pdfFile != null)
            {
                var pdfFileName = GenerateRandomFileName(pdfFile.FileName);
                var pdfPath = Path.Combine(webRootPath, "uploads", "itinery");
                if (!Directory.Exists(pdfPath))
                {
                    Directory.CreateDirectory(pdfPath);
                }

                var pdfFilePath = Path.Combine(pdfPath, pdfFileName);
                using (var stream = new FileStream(pdfFilePath, FileMode.Create))
                {
                    await pdfFile.CopyToAsync(stream);
                }
                UploadItinery ui = new UploadItinery();
                ui.Path = $"/uploads/itinery/{pdfFileName}";
                ui.FileName = fileName;
                if (type == "Flight") ui.FlightBooking = true;
                else if (type == "Luxury") ui.LuxuryFacilities = true;
                else if (type == "Sightseeing") ui.Sightseeing = true;
                else ui.Accommodation = true;
                ui.Booking = booking;
                _context.UploadItinery.Add(ui);
                await _context.SaveChangesAsync();
                return Ok("Uploaded Itinery");
                 
            }
            else
            {
                return BadRequest("Pdf is needed to load");
            }
        }
        string GenerateRandomFileName(string originalFileName)
        {
            var extension = Path.GetExtension(originalFileName);
            var randomFileName = GenerateRandomFileName(12); 
            return $"{randomFileName}{extension}";
        }
        string GenerateRandomFileName(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new RNGCryptoServiceProvider();
            var stringBuilder = new StringBuilder(length);

            var buffer = new byte[4];
            for (int i = 0; i < length; i++)
            {
                random.GetBytes(buffer);
                var randomIndex = BitConverter.ToUInt32(buffer, 0) % chars.Length;
                stringBuilder.Append(chars[(int)randomIndex]);
            }

            return stringBuilder.ToString();
        }
        [HttpGet("GetItineryForBooking")]
        public async Task<IActionResult> GetItineryForBooking(int bookingId)
        {
            var itinery = _context.UploadItinery.Where(ui=>ui.BookingId == bookingId).ToList();
            if(itinery == null)
            {

            }
            return Ok(itinery);
        }
    }
}
