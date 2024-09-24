using BackendApi.Models;
using BackendApi.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;


        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("suppliers")]
        public IActionResult GetSuppliers()
        {
            var suppliers = _context.User.Include(u => u.Role).Where(u => u.Role.Name == "Supplier").ToList();
            if (suppliers.Count > 0)
            {
                return Ok(suppliers);
            }
            else
            {
                return BadRequest("No suppliers found in our database");
            }
        }
        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            var suppliers = _context.User.Include(u => u.Role).Where(u => u.Role.Name == "User").ToList();
            if (suppliers.Count > 0)
            {
                return Ok(suppliers);
            }
            else
            {
                return BadRequest("No users found in our database");
            }
        }
        [HttpPut("update-supplier")]
        public async Task<IActionResult> UpdateSupplier([FromBody] UserUpdate updateUser)
        {
            if (updateUser == null || updateUser.Id <= 0)
            {
                return BadRequest("Invalid supplier data.");
            }

            var supplier = await _context.User
                .SingleOrDefaultAsync(u => u.Id == updateUser.Id);

            if (supplier == null)
            {
                return NotFound("Supplier not found.");
            }
            if (!string.IsNullOrEmpty(updateUser.Username))
            {
                supplier.Username = updateUser.Username;
            }
            if (!string.IsNullOrEmpty(updateUser.Email))
            {
                supplier.Email = updateUser.Email;
            }
            if (!string.IsNullOrEmpty(updateUser.BusinessName))
            {
                supplier.BusinessName = updateUser.BusinessName;
            }
            if (!string.IsNullOrEmpty(updateUser.ContactPerson))
            {
                supplier.ContactPerson = updateUser.ContactPerson;
            }
            if (!string.IsNullOrEmpty(updateUser.Phone))
            {
                supplier.Phone = updateUser.Phone;
            }
            if (!string.IsNullOrEmpty(updateUser.AccountId))
            {
                supplier.AccountId = updateUser.AccountId;
            }
            if (updateUser.IsLocked.HasValue)
            {
                supplier.IsLocked = updateUser.IsLocked.Value;
            }
            if (updateUser.AutoRegistrationCompleted.HasValue)
            {
                supplier.AutoRegistrationCompleted = updateUser.AutoRegistrationCompleted.Value;
            }
            if (updateUser.IsAgreement.HasValue)
            {
                supplier.IsAgreement = updateUser.IsAgreement.Value;
            }
            _context.User.Update(supplier);
            await _context.SaveChangesAsync();

            return Ok("Supplier updated successfully.");
        }
        [HttpGet("FindUserById")]
        public IActionResult findUserById(int id)
        {
            var user = _context.User.Include(u=>u.Role).FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return BadRequest("User not found with id");
            }
            return Ok(user);
        }

        [HttpGet("getAdmins")]
        public async Task<IActionResult> getAdmins()
        {
            var admins = await _context.User
                         .Where(u => u.RoleId == 1)
                         .ToListAsync();

            return Ok(admins);
        }

        [HttpPost("AddAdmin")]
        public async Task<IActionResult> AddAdmin([FromBody] AdminDto newUser)
        {
            if (newUser == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userEntity = new User
            {
                Username = newUser.Username,
                Email = newUser.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(newUser.PasswordHash),
                RoleId = 1,
                BusinessName = newUser.BusinessName,
                ContactPerson = newUser.ContactPerson,
                Phone = newUser.Phone,
                IsLocked = false,
                AutoRegistrationCompleted = false,
                IsAgreement = false,
                RegistrationDate = DateTime.Now
            };

            _context.User.Add(userEntity);
            var result = await _context.SaveChangesAsync();


            if (result > 0)
            {
                return Ok(userEntity);
            }
            else
            {
                return StatusCode(500, "A problem occurred while handling your request.");
            }
        }

        [HttpDelete("deleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully" });
        }


        [HttpPut("toggle-lock")]
        public async Task<IActionResult> ToggleLock([FromBody] AdminLockRequest request)
        {
            var admin = await _context.User.FindAsync(request.Id);
            if (admin == null)
            {
                return BadRequest("User currently not available");
            }

            admin.IsLocked = request.IsLocked;

            _context.User.Update(admin);
            await _context.SaveChangesAsync();

            return Ok("Lock settings updated succesful");
        }
        [HttpGet("GetCount")]
        public async Task<IActionResult> GetDashboardData()
        {
            var totalSuppliers = await _context.User.Include(u=>u.Role).CountAsync(u => u.Role.Name == "Supplier");
            var totalUsers = await _context.User.Include(u => u.Role).CountAsync(u => u.Role.Name == "User");
            var totalPackages = await _context.Package.CountAsync();
            var totalBookings = await _context.Bookings.CountAsync();

            var dashboardData = new
            {
                TotalSuppliers = totalSuppliers,
                TotalUsers = totalUsers,
                TotalPackages = totalPackages,
                TotalBookings = totalBookings
            };
            return Ok(dashboardData);
        }

        [HttpGet("GetPie")]
        public async Task<IActionResult> GetPackageCountsByCountry()
        {
            var packageCounts = await _context.Package
                .Join(_context.Destination,
                      p => p.DestinationId,
                      d => d.Id,
                      (p, d) => new { p, d.Country })
                .GroupBy(pd => pd.Country)
                .Select(g => new
                {
                    Country = g.Key,
                    PackageCount = g.Count()
                })
                .ToListAsync();

            return Ok(packageCounts);
        }

        [HttpGet("GetMonthlyBookings")]
        public async Task<IActionResult> GetMonthlyBookings()
        {
            var monthlyBookings = await _context.Bookings
                .GroupBy(b => new { b.BookingDate.Year, b.BookingDate.Month })
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    BookingCount = g.Count()
                })
                .OrderBy(g => g.Year).ThenBy(g => g.Month)
                .ToListAsync();

            var bookingCounts = new int[12];

            foreach (var data in monthlyBookings)
            {
                bookingCounts[data.Month - 1] += data.BookingCount;
            }

            return Ok(bookingCounts);
        }


        [HttpGet("GetPackageStatistics")]
        public async Task<IActionResult> GetPackageStatistics()
        {
            var packageCounts = await _context.Package
                .GroupBy(p => new { p.IsVerified, p.IsPublic })
                .Select(g => new
                {
                    IsVerified = g.Key.IsVerified,
                    IsPublic = g.Key.IsPublic,
                    Count = g.Count()
                })
                .ToListAsync();

            var totalCount = packageCounts.Sum(pc => pc.Count);
            var verifiedCount = packageCounts.Where(pc => pc.IsVerified).Sum(pc => pc.Count);
            var publicCount = packageCounts.Where(pc => pc.IsPublic).Sum(pc => pc.Count);

            var response = new
            {
                TotalPackages = totalCount,
                VerifiedPackages = verifiedCount,
                PublicPackages = publicCount
            };

            return Ok(response);
        }
    }
}