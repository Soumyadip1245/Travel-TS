using BackendApi.Models;
using BackendApi.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PackageUploadController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpClientFactory _httpClientFactory;

        public PackageUploadController(ApplicationDbContext context, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _httpClientFactory = httpClientFactory;
        }

        [HttpPost("UploadPackages")]
        public async Task<IActionResult> UploadPackages(IFormFile file, int supplierId)
        {
            
            if (file == null || file.Length == 0)
                return BadRequest("Please upload a valid Excel file.");

            List<Package> packages = new List<Package>();
            try
            {
                ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    using (var package = new ExcelPackage(stream))
                    {
                        var worksheet = package.Workbook.Worksheets.First();
                        for (int row = 2; row <= worksheet.Dimension.Rows; row++) // Skip the header row
                        {
                            string name = worksheet.Cells[row, 1].Value?.ToString().Trim();
                            string description = worksheet.Cells[row, 2].Value?.ToString().Trim();
                            decimal price = Convert.ToDecimal(worksheet.Cells[row, 3].Value?.ToString().Trim());
                            int availableCount = Convert.ToInt32(worksheet.Cells[row, 4].Value?.ToString().Trim());
                            string imageUrl = worksheet.Cells[row, 5].Value?.ToString().Trim();
                            string pdfUrl = worksheet.Cells[row, 6].Value?.ToString().Trim();
                            string destinationId = (worksheet.Cells[row, 7].Value?.ToString().Trim());

                            // Download image and PDF
                            string imagePath = await DownloadFile(imageUrl, "uploads/images");
                            string pdfPath = await DownloadFile(pdfUrl, "uploads/pdfs");
                            var id = _context.Destination.Where(d=>d.Name == destinationId).FirstOrDefault();
                            // Create package object
                            var packageObj = new Package
                            {
                                Name = name,
                                Description = description,
                                Price = price,
                                AvailableCount = availableCount,
                                ImagePath = imagePath,
                                PdfPath = pdfPath,
                                DestinationId = id.Id,
                                SupplierId = supplierId,
                                IsPublic = false,
                                IsVerified = false, // Initial state as not verified
                            };

                            packageObj.CalculatePercentageIncome(); // Calculate percentage income based on price

                            packages.Add(packageObj);
                        }
                    }
                }

                // Save packages in bulk
                await _context.Package.AddRangeAsync(packages);
                await _context.SaveChangesAsync();

                return Ok("Packages uploaded successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        string GenerateRandomFileName(string originalFileName)
        {
            var extension = Path.GetExtension(originalFileName);
            var randomFileName = GenerateRandomFileName(12); // 12-character random file name
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
        private async Task<string> DownloadFile(string fileUrl, string folderPath)
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync(fileUrl);

            if (response.IsSuccessStatusCode)
            {
                var fileBytes = await response.Content.ReadAsByteArrayAsync();
                string fileName = Guid.NewGuid() + Path.GetExtension(fileUrl);
                string filePath = Path.Combine("wwwroot", folderPath, fileName); 

                Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                await System.IO.File.WriteAllBytesAsync(filePath, fileBytes);
                return $"/{folderPath}/{fileName}";
            }

            throw new Exception($"Failed to download file from {fileUrl}");
        }
    }
}
