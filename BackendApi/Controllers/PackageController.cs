using BackendApi.Models;
using BackendApi.Utils;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using static System.Net.Mime.MediaTypeNames;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PackageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public PackageController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }
        [HttpPost("AddPackageWithFiles")]
        public async Task<IActionResult> AddPackageWithFiles([FromForm] PackageDto packageDto, IFormFile imageFile, IFormFile pdfFile)
        {
            if (packageDto == null)
            {
                return BadRequest("Package details are required.");
            }

            var destination = await _context.Destination
                .FirstOrDefaultAsync(d => d.Name == packageDto.DestinationName);

            if (destination == null)
            {
                return BadRequest("Invalid destination name.");
            }

            var package = new Package
            {
                Name = packageDto.Name,
                Description = packageDto.Description,
                Price = Math.Round(packageDto.Price, 2),
                AvailableCount = packageDto.AvailableCount,
                DestinationId = destination.Id,
                IsPublic = false,
                IsArchived = false,
                SupplierId = packageDto.SupplierId,
                IsVerified = false,
                FlightBooking = false,
                Accommodation = false,
                LuxuryFacilities  = false,
                Sightseeing = false
            };
            package.CalculatePercentageIncome();
            string webRootPath = _environment?.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

            // Handle image file upload
            if (imageFile != null)
            {
                var imageFileName = GenerateRandomFileName(imageFile.FileName);
                var imagePath = Path.Combine(webRootPath, "uploads", "images");
                if (!Directory.Exists(imagePath))
                {
                    Directory.CreateDirectory(imagePath);
                }

                var imageFilePath = Path.Combine(imagePath, imageFileName);
                using (var stream = new FileStream(imageFilePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }
                package.ImagePath = $"/uploads/images/{imageFileName}";
            }

            // Handle PDF file upload
            if (pdfFile != null)
            {
                var pdfFileName = GenerateRandomFileName(pdfFile.FileName);
                var pdfPath = Path.Combine(webRootPath, "uploads", "pdfs");
                if (!Directory.Exists(pdfPath))
                {
                    Directory.CreateDirectory(pdfPath);
                }

                var pdfFilePath = Path.Combine(pdfPath, pdfFileName);
                using (var stream = new FileStream(pdfFilePath, FileMode.Create))
                {
                    await pdfFile.CopyToAsync(stream);
                }
                package.PdfPath = $"/uploads/pdfs/{pdfFileName}";
            }

            _context.Package.Add(package);
            await _context.SaveChangesAsync();

            return Ok("Package added successfully.");
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
        [HttpGet("GetAllPackages")]
        public IActionResult GetAllPackages(int supplierId)
        {
            var packages = _context.Package.Where(p => p.SupplierId == supplierId && p.IsArchived == false).Include(p => p.Destination).Include(p => p.AccommodationDetails)
                .Include(p=>p.FlightDetails)
                .Include(p => p.LuxuryFacility)
                .Include(p => p.SightseeingDetails)
                .Include(p => p.Images);
             if (packages == null || !packages.Any())
            {
                return NotFound("No packages found for this supplier.");
            }

            return Ok(packages);
        }
        [HttpGet("GetAllarchivedPackages")]
        public IActionResult GetAllarchivedPackages(int supplierId)
        {
            var packages = _context.Package.Where(p => p.SupplierId == supplierId && p.IsArchived == true).Include(p => p.Destination);
            if (packages == null || !packages.Any())
            {
                return NotFound("No packages found for this supplier.");
            }

            return Ok(packages);
        }
        [HttpPost("AddPackageAdditionalDetails")]
        public async Task<IActionResult> AddPackageDetails([FromBody] PackageAdditionalDetailsDto detailsDto)
        {
            if (detailsDto == null || detailsDto.PackageId <= 0)
            {
                return BadRequest("Invalid package or details.");
            }

            var package = await _context.Package
                .Include(p => p.FlightDetails)
                .Include(p => p.AccommodationDetails)
                .Include(p => p.LuxuryFacility)
                .Include(p => p.SightseeingDetails)
                .FirstOrDefaultAsync(p => p.Id == detailsDto.PackageId);

            if (package == null)
            {
                return NotFound("Package not found.");
            }

            // Add FlightDetails
            if (detailsDto.FlightDetails.Count > 0)
            {
                foreach (var flightDetailDto in detailsDto.FlightDetails)
                {
                    var flightDetail = new FlightDetail
                    {
                        FlightName = flightDetailDto.FlightName,
                        FlightNumber = flightDetailDto.FlightNumber,
                        DepartureDate = flightDetailDto.DepartureDate,
                        ArrivalDate = flightDetailDto.ArrivalDate,
                        Priority = flightDetailDto.Priority,
                        PackageId = package.Id
                    };
                    _context.FlightDetail.Add(flightDetail);
                }
                package.FlightBooking = true; 
            }

            // Add AccommodationDetails
            if (detailsDto.AccommodationDetails.Count > 0)
            {
                foreach (var accommodationDetailDto in detailsDto.AccommodationDetails)
                {
                    var accommodationDetail = new AccommodationDetail
                    {
                        HotelName = accommodationDetailDto.HotelName,
                        RoomType = accommodationDetailDto.RoomType,
                        CheckInDate = accommodationDetailDto.CheckInDate,
                        CheckOutDate = accommodationDetailDto.CheckOutDate,
                        Priority = accommodationDetailDto.Priority,
                        PackageId = package.Id
                    };
                    _context.AccommodationDetail.Add(accommodationDetail);
                }
                package.Accommodation = true; 
            }

            // Add LuxuryFacilities
            if (detailsDto.LuxuryFacilities.Count > 0)
            {
                foreach (var luxuryFacilityDto in detailsDto.LuxuryFacilities)
                {
                    var luxuryFacility = new LuxuryFacility
                    {
                        FacilityName = luxuryFacilityDto.FacilityName,
                        Priority = luxuryFacilityDto.Priority,
                        PackageId = package.Id
                    };
                    _context.LuxuryFacility.Add(luxuryFacility);
                }
                package.LuxuryFacilities = true; 
            }

            // Add SightseeingDetails
            if (detailsDto.SightseeingDetails.Count > 0)
            {
                foreach (var sightseeingDetailDto in detailsDto.SightseeingDetails)
                {
                    var sightseeingDetail = new SightseeingDetail
                    {
                        TourName = sightseeingDetailDto.TourName,
                        TourDescription = sightseeingDetailDto.TourDescription,
                        Priority = sightseeingDetailDto.Priority,
                        PackageId = package.Id
                    };
                    _context.SightseeingDetail.Add(sightseeingDetail);
                }
                package.Sightseeing = true; 
            }
           

            await _context.SaveChangesAsync();
            return Ok("Package details added successfully.");
        }
        [HttpPost("UploadImages")]
        public async Task<IActionResult> UploadImages(IFormFile[] images, [FromForm] int packageId)
        {
            if (images == null || images.Length == 0 || packageId <= 0)
            {
                return BadRequest("Invalid package or no images provided.");
            }

            var package = await _context.Package.FindAsync(packageId);
            if (package == null)
            {
                return NotFound("Package not found.");
            }

            string webRootPath = _environment?.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            var uploadPath = Path.Combine(webRootPath, "uploads", "images");
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }
            string path = "";
            foreach (var image in images)
            {
                if (image != null && image.Length > 0)
                {
                    var imageFileName = GenerateRandomFileName(Path.GetFileName(image.FileName));
                    var imageFilePath = Path.Combine(uploadPath, imageFileName);

                    using (var stream = new FileStream(imageFilePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }
                    path = $"/uploads/images/{imageFileName}";
                    var packageImage = new PackageImage
                    {
                        ImagePath = $"/uploads/images/{imageFileName}",
                        PackageId = package.Id
                    };

                    _context.PackageImage.Add(packageImage);
                }
            }

            await _context.SaveChangesAsync();
            return Ok(path);
        }

        [HttpGet("GetPackageById")]
        public IActionResult GetPackageById(int packageId)
        {
            var packages = _context.Package.Where(p => p.Id == packageId).Include(p => p.FlightDetails)
                .Include(p=>p.Supplier)
                .Include(p => p.AccommodationDetails)
                .Include(p => p.LuxuryFacility)
                .Include(p => p.SightseeingDetails)
                .Include(p => p.Images)
            .Include(p => p.Destination);
            if (packages == null)
            {
                return NotFound("No packages found for this supplier.");
            }

            return Ok(packages);
        }

        [HttpGet("GetAllPackagesThatExist")]
        public IActionResult GetAllPackages()
        {
            var packages = _context.Package.Include(p=>p.Images).Include(p=>p.Supplier).Include(p=>p.Destination).Include(p => p.FlightDetails).Include(p => p.SightseeingDetails).Include(p => p.AccommodationDetails).Include(p => p.LuxuryFacility).ToList();
            return Ok(packages);
        }
        [HttpPost("ToggleVerification")]
        public async Task<IActionResult> ToggleVerification([FromQuery] int id, [FromQuery] bool isVerified)
        {
            var package = await _context.Package.FindAsync(id);
            if (package!.IsArchived && isVerified)
            {
                return BadRequest("Package cannot be verified as it is archived by supplier");
            }

            package.IsVerified = isVerified;
            _context.Package.Update(package);
            await _context.SaveChangesAsync();

            return Ok("Verification settings is applied successfully");
        }
        [HttpPost("TogglePublic")]
        public async Task<IActionResult> TogglePublic([FromQuery] int id, [FromQuery] bool isPublic)
        {
            var package = await _context.Package.FindAsync(id);
            if (package!.IsArchived && isPublic)
            {
                return BadRequest("Package cannot be public as it is archived by supplier");
            }

            package.IsPublic = isPublic;
            _context.Package.Update(package);
            await _context.SaveChangesAsync();

            return Ok("Visibility settings is applied successfully");
        }
        [HttpPost("ToggleFeatured")]
        public async Task<IActionResult> ToggleFeatured([FromQuery] int id, [FromQuery] bool isFeatured)
        {
            var package = await _context.Package.FindAsync(id);
            if (package!.IsArchived && isFeatured)
            {
                return BadRequest("Package cannot be featured as it is archived by supplier");
            }

            package.IsFeatured = isFeatured;
            _context.Package.Update(package);
            await _context.SaveChangesAsync();

            return Ok("Featured settings is applied successfully");
        }
        [HttpGet("GetAllVerifiedPackages")]
        public IActionResult GetPackage()
        {
            var allVerifiedPublicPackages =   _context.Package
               .Where(p => p.IsVerified && p.IsPublic)
               .ToList();
            return Ok(allVerifiedPublicPackages);
        }
        [HttpGet("GetPackagesForUser")]
        public async Task<IActionResult> GetPackagesForUser([FromQuery] int userId)
        {
            var allVerifiedPublicPackages = await _context.Package
                .Include(u=>u.Supplier).Include(p => p.Images).Include(p => p.Supplier).Include(p => p.Destination).Include(p => p.FlightDetails).Include(p => p.SightseeingDetails).Include(p => p.AccommodationDetails).Include(p => p.LuxuryFacility)
                .Where(p => !p.Supplier.IsLocked && p.Supplier.IsAgreement && p.IsVerified && p.IsPublic)
                .ToListAsync();

            var suggestedInteractions = await _context.UserPackageInteraction
                .Where(upi => upi.UserId == userId && upi.InteractionCount >= 2)
                .OrderByDescending(p => p.UpdatedAt)
                .Take(1)
                .Select(upi => upi.DestinationId)
                .ToListAsync();
          
           

          

            var suggestedPackages = await _context.Package
                .Include(u => u.Supplier)
                .Include (p => p.Destination)
                .Include(p => p.Images).Include(p => p.Supplier).Include(p => p.Destination).Include(p => p.FlightDetails).Include(p => p.SightseeingDetails).Include(p => p.AccommodationDetails).Include(p => p.LuxuryFacility)
                .Where(p => suggestedInteractions.Contains(p.Destination.Id) && !p.IsArchived && !p.Supplier.IsLocked && p.Supplier.IsAgreement)
                .Take(5)
                .ToListAsync();
            var wishlistPackageIds = await _context.Watchlist
                .Where(wl => wl.UserId == userId)
                .Select(wl => wl.PackageId)
                .ToListAsync();

            var wishlistPackages = await _context.Package
                .Include(u => u.Supplier).Include(p => p.Images).Include(p => p.Supplier).Include(p => p.Destination).Include(p => p.FlightDetails).Include(p => p.SightseeingDetails).Include(p => p.AccommodationDetails).Include(p => p.LuxuryFacility)
                .Where(p => wishlistPackageIds.Contains(p.Id) && !p.IsArchived && !p.Supplier.IsLocked && p.Supplier.IsAgreement)
                .ToListAsync();

            var userPackageData = new
            {
                AllVerifiedPublicPackages = allVerifiedPublicPackages,
                SuggestedPackages = suggestedPackages,
                WishlistPackages = wishlistPackages
            };

            return Ok(userPackageData);
        }
        [HttpGet("GetPackageByDestinationId")]
        public async Task<IActionResult> GetPackageByDestinationId(int destinationId)
        {
            var packages = await _context.Package.Include(p=>p.Destination).Where(p=> p.Destination.Id == destinationId).ToListAsync();
            return Ok(packages);
        }
        [HttpGet("GetAvailableCountForPackage")]
        public IActionResult GetAvailableCountForPackage(int packageId)
        {
            var count = _context.Package.Where(p => p.Id == packageId).Select(p => p.AvailableCount);
            return Ok(count);
        }
        [HttpGet("ArchivePackage")]
        public async Task<IActionResult> ArchivePackage(int id)
        {
            var package = _context.Package.Where(p=>p.Id == id).FirstOrDefault();
            package.IsArchived = !package.IsArchived;
            _context.Package.Update(package);
            await _context.SaveChangesAsync();
            return Ok("Archived");

        }
        [HttpGet("DeleteImage")]
        public async Task<IActionResult> DeleteImage(string path)
        {
            var image = _context.PackageImage.Where(p => p.ImagePath == path).FirstOrDefault();
            if (image == null)
            {
                return BadRequest("Image not found error");
            }
            _context.PackageImage.Remove(image!);
            await _context.SaveChangesAsync();
            return Ok("Image removed");
        }
    }

}