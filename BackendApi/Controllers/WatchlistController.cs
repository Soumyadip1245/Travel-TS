using BackendApi.Models;
using BackendApi.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WatchlistController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public WatchlistController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }
        [HttpGet("AddWatchlist")]
        public IActionResult AddWishList([FromQuery] int userId, [FromQuery] int packageId )
        {
            var watchlist = _context.Watchlist.Where(w=>w.UserId == userId && w.PackageId == packageId).FirstOrDefault();
            if (watchlist != null) return BadRequest("Package already exist in wishlist");
            Watchlist w = new Watchlist();
            w.UserId = userId;
            w.PackageId = packageId;
            _context.Watchlist.Add(w);
            _context.SaveChanges();
            return Ok("Package added to the wishlist");
        }
        

        // Endpoint to remove a package from the wishlist
        [HttpGet("RemoveWatchlist")]
        public async Task<IActionResult> RemoveWatchlist([FromQuery] int userId, [FromQuery] int packageId)
        {
            // Find the watchlist entry to remove
            var watchlistEntry = await _context.Watchlist
                .FirstOrDefaultAsync(w => w.UserId == userId && w.PackageId == packageId);

            if (watchlistEntry == null)
            {
                return NotFound("Package not found in wishlist.");
            }

            _context.Watchlist.Remove(watchlistEntry);
            await _context.SaveChangesAsync();

            return Ok("Package removed from wishlist.");
        }
    }
}
