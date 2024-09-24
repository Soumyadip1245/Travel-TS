using BackendApi.Models;
using BackendApi.Utils;
using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Generators;
using System.Security.Cryptography;
using System.Text;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailSender emailContext;
        public AccountController(ApplicationDbContext context, IEmailSender emailSender)
        {
            _context = context;
            emailContext = emailSender;
        }

        [HttpPost("Register")]
        public IActionResult Register([FromBody] RegisterRequest model)
        {
            if (_context.User.Any(u => u.Email == model.Email))
            {
                return BadRequest("Email already exists.");
            }

            var role = _context.Role.SingleOrDefault(r => r.Name == model.Role);
            if (role == null)
            {
                return BadRequest("Some issue with role is there.");
            }

            var user = new User
            {
                Username = model.Username,
                Email = model.Email,
                PasswordHash = HashPassword(model.Password),
                RoleId = role.Id,
                BusinessName = null,
                ContactPerson = null,
                Phone = null,
                IsLocked = false
            };
            if (model.Role == "Supplier")
            {
                user.BusinessName = model.BusinessName;
                user.ContactPerson = model.ContactPersonName;
                user.Phone = model.PhoneNumber;
                user.IsLocked = true;
            }
            _context.User.Add(user);
            _context.SaveChanges();

            return Ok("User registered successfully.");
        }
        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginRequest model)
        {
            var user = _context.User.Include(u => u.Role).SingleOrDefault(u => u.Email == model.Email);
            if (user == null)
            {
                return BadRequest("User not found with the details");
            }
            else
            {
                if (!VerifyPassword(model.Password, user.PasswordHash)) return Unauthorized("Invalid email or password");
                else if(user.Role.Name == "Supplier")
                {
                    if (user.IsLocked) return BadRequest("You account still needs some approval. Kindly wait.");
                    else if (!user.IsLocked && !user.IsAgreement) return BadRequest("You agreement is still yet to be signed");
                    else if (!user.IsLocked && user.IsAgreement) return Ok(user);
                    else return BadRequest("Something is wrong. Kindly email on support@travel");

                }
                else if (user.Role.Name == "User")
                {
                    var timeSinceRegistration = DateTime.Now - user.RegistrationDate;
                    if (timeSinceRegistration.TotalMinutes < 15)
                    {
                        var timeLeft = 15 - timeSinceRegistration.TotalMinutes;
                        return BadRequest($"You can log in after {Math.Ceiling(timeLeft)} minutes. We are setting up your dashboard");
                    }
                    else if(user.IsLocked)
                    {
                        return BadRequest("Your account is under review");
                    }
                    else
                    {
                        return Ok(user);
                    }
                }
                else return Ok(user);
            }
        }

        // Utility methods for hashing and verifying passwords
        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private bool VerifyPassword(string password, string hashedPassword)
        {
           return BCrypt.Net.BCrypt.Verify(password,hashedPassword);
        }
        [HttpPost("SendVerificationEmail")]
        public async Task<IActionResult> SendVerificationEmail(string email, string userName, string signUrl)
        {
            // Construct the email subject
            var subject = "Your Details Have Been Verified";

            // Construct the email message using the HTML template
            var message = $@"
            <!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>Verification Email</title>
                <style>
                    body {{ font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }}
                    .email-container {{ max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }}
                    .email-header {{ text-align: center; padding-bottom: 20px; border-bottom: 1px solid #dddddd; }}
                    .email-header h1 {{ color: #333333; font-size: 24px; margin: 0; }}
                    .email-content {{ padding: 20px 0; text-align: center; }}
                    .email-content p {{ color: #555555; font-size: 16px; margin: 10px 0; }}
                    .email-content .btn {{ display: inline-block; background-color: #4CAF50; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 16px; border-radius: 5px; margin-top: 20px; }}
                    .email-footer {{ text-align: center; padding-top: 20px; border-top: 1px solid #dddddd; }}
                    .email-footer p {{ color: #777777; font-size: 14px; }}
                    .email-footer a {{ color: #4CAF50; text-decoration: none; }}
                </style>
            </head>
            <body>
                <div class='email-container'>
                    <div class='email-header'>
                        <h1>Details Verified</h1>
                    </div>
                    <div class='email-content'>
                        <p>Dear {userName},</p>
                        <p>We have successfully verified your details. To proceed further, you need to digitally sign the agreement.</p>
                        <a href='{signUrl}' class='btn'>Sign the Agreement</a>
                    </div>
                    <div class='email-footer'>
                        <p>If you have any questions, feel free to <a href='mailto:support@example.com'>contact us</a>.</p>
                    </div>
                </div>
            </body>
            </html>";

            await emailContext.SendEmailAsync(email, subject, message);

            return Ok("Verification email sent successfully.");
        }
        [HttpGet("LoadBalanced")]
        public String LoadBalanced()
        {
            return "Port : 7259";
        }
    }


    // Models for request data
    public class RegisterRequest
    {
        public string Role { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? BusinessName { get; set; }
        public string? ContactPersonName { get; set; }
        public string? PhoneNumber { get; set; }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
