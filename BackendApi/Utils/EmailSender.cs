using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace BackendApi.Utils
{
    public class EmailSender : IEmailSender
    {
        private readonly string _smtpServer;
        private readonly int _smtpPort;
        private readonly string _smtpUsername;
        private readonly string _smtpPassword;
        private readonly ILogger<EmailSender> _logger;

        public EmailSender(IConfiguration configuration, ILogger<EmailSender> logger)
        {
            _smtpServer = configuration["EmailSettings:SmtpServer"];
            _smtpPort = int.TryParse(configuration["EmailSettings:SmtpPort"], out var port) ? port : 587; // Default to 587
            _smtpUsername = configuration["EmailSettings:SmtpUsername"];
            _smtpPassword = configuration["EmailSettings:SmtpPassword"];
            _logger = logger;

            // Log SMTP configuration values (sensitive data should be handled carefully)
            _logger.LogInformation("SMTP Server: {SmtpServer}", _smtpServer);
            _logger.LogInformation("SMTP Port: {SmtpPort}", _smtpPort);
            _logger.LogInformation("SMTP Username: {SmtpUsername}", _smtpUsername); // Be cautious, log this only if necessary
        }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            // Validate the input parameters
            if (string.IsNullOrEmpty(email)) throw new ArgumentException("Email cannot be null or empty.", nameof(email));
            if (string.IsNullOrEmpty(subject)) throw new ArgumentException("Subject cannot be null or empty.", nameof(subject));
            if (string.IsNullOrEmpty(message)) throw new ArgumentException("Message cannot be null or empty.", nameof(message));

            using var client = new SmtpClient(_smtpServer, _smtpPort)
            {
                EnableSsl = true,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(_smtpUsername, _smtpPassword)
            };

            using var mailMessage = new MailMessage
            {
                From = new MailAddress(_smtpUsername),  // Sender's email
                Subject = subject,
                Body = message,
                IsBodyHtml = true  // Mark the body as HTML
            };

            mailMessage.To.Add(email);  // Add the recipient

            try
            {
                await client.SendMailAsync(mailMessage); // Send the email
                _logger.LogInformation("Email sent successfully to {Email}", email);
            }
            catch (SmtpException smtpEx)
            {
                // Log the exception with a specific message
                _logger.LogError(smtpEx, "Failed to send email to {Email}", email);
                throw new InvalidOperationException("Failed to send email.", smtpEx);
            }
            catch (Exception ex)
            {
                // Log unexpected exceptions
                _logger.LogError(ex, "An unexpected error occurred while sending email to {Email}", email);
                throw new InvalidOperationException("An unexpected error occurred while sending email.", ex);
            }
        }
    }
}
