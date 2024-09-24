using BackendApi.Models;
using BackendApi.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WebsiteController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WebsiteController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Check if subscription is still valid
        [HttpGet("GetWhetherAvailableOrNot")]
        public async Task<IActionResult> GetWhetherAvailableOrNot([FromQuery] int supplierId)
        {
            var website = await _context.Website
                                        .Include(w => w.Supplier)
                                        .FirstOrDefaultAsync(w => w.SupplierId == supplierId);

            if (website == null)
            {
                return NotFound("Supplier or website not found.");
            }

            if (website.ValidTill > DateTime.Now)
            {
                return Ok(website);
            }
            else
            {
                return BadRequest("Subscription is no longer valid.");
            }
        }

        // POST: Purchase or update website subscription
        [HttpPost("PurchaseWebsite")]
        public async Task<IActionResult> PurchaseWebsite([FromBody] SupplierModel sp)
        {
            // Find supplier by ID
            var supplier = await _context.User.FindAsync(sp.SupplierId);

            if (supplier == null)
            {
                return NotFound("Supplier not found.");
            }

            // Check if a website exists for this supplier
            var website = await _context.Website.FirstOrDefaultAsync(w => w.SupplierId == sp.SupplierId);

            if (website != null)
            {
                // Update existing website
                website.ValidTill = DateTime.Now.AddMonths(1);
                _context.Website.Update(website);
            }
            else
            {
                // Create a new website for this supplier
                string customDomain = GenerateCustomDomain(supplier.BusinessName ?? supplier.Username);

                Website newWebsite = new Website
                {
                    Supplier = supplier,
                    SupplierId = supplier.Id,
                    ValidTill = DateTime.Now.AddMonths(1),
                    IsOpen = false,
                    CustomDomain = customDomain
                };

                await _context.Website.AddAsync(newWebsite);
            }

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok("Subscription updated successfully.");
        }

        // Private helper method to generate a custom domain
        private string GenerateCustomDomain(string supplier)
        {
            string baseDomain = supplier.ToLower().Replace(" ", "_");
            string customDomain = baseDomain;

            int count = 1;
            while (_context.Website.Any(w => w.CustomDomain == customDomain))
            {
                customDomain = $"{baseDomain}_packages{count}";
                count++;
            }

            return customDomain;
        }
    }

    // SupplierModel to receive SupplierId from the client
    public class SupplierModel
    {
        public int SupplierId { get; set; }
    }
}
