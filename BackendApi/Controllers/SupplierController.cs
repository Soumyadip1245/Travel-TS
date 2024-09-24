using BackendApi.Models;
using BackendApi.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupplierController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SupplierController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("GetPriceComparison/{supplierId}")]
        public async Task<IActionResult> GetPriceComparison()
        {
            var priceComparison = await _context.Package
                .Join(_context.User,
                      p => p.SupplierId,
                      u => u.Id,
                      (p, u) => new { p.DestinationId, p.Price, SupplierName = u.Username })
                .Join(_context.Destination,
                      pu => pu.DestinationId,
                      d => d.Id,
                      (pu, d) => new { pu.Price, pu.SupplierName, DestinationName = d.Name })
                .Where(pu => pu.SupplierName != null)
                .GroupBy(p => p.DestinationName)
                .Select(g => new
                {
                    Destination = g.Key,
                    Prices = g.Select(x => new
                    {
                        Supplier = x.SupplierName,
                        Price = x.Price
                    }).ToList()
                })
                .ToListAsync();

            return Ok(priceComparison);
        }

        [HttpGet("SupplierDashboardData/{supplierId}")]
        public async Task<IActionResult> GetSupplierDashboardData(int supplierId)
        {
            var totalPackages = await _context.Package.CountAsync(p => p.SupplierId == supplierId);
            var totalBookings = await _context.Bookings.CountAsync(b => b.Package.SupplierId == supplierId);
            var totalUsers = await _context.User.CountAsync(u => u.RoleId == 3);
            var approvedPackagesCount = await _context.Package
                                        .Where(p => p.SupplierId == supplierId && p.IsVerified)
                                        .CountAsync();

            var dashboardData = new
            {
                TotalPackages = totalPackages,
                TotalBookings = totalBookings,
                TotalUsers = totalUsers,
                ApprovedPackagesCount = approvedPackagesCount
            };

            return Ok(dashboardData);
        }

        [HttpGet("SupplierDestinationPackageCounts/{supplierId}")]
        public async Task<IActionResult> GetSupplierDestinationPackageCounts(int supplierId)
        {

            var destinationPackageCounts = await _context.Package
                .Where(p => p.SupplierId == supplierId)
                .GroupBy(p => p.DestinationId)
                .Select(g => new
                {
                    DestinationId = g.Key,
                    PackageCount = g.Count()
                })
                .ToListAsync();

            var destinationNames = await _context.Destination
                .Where(d => destinationPackageCounts.Select(dp => dp.DestinationId).Contains(d.Id))
                .ToDictionaryAsync(d => d.Id, d => d.Name);

            var result = destinationPackageCounts.Select(dp => new
            {
                DestinationName = destinationNames[dp.DestinationId],
                PackageCount = dp.PackageCount
            });

            return Ok(result);
        }
    }
}
