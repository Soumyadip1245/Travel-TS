using BackendApi.Models;
using BackendApi.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PackageInteractionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PackageInteractionController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost("InteractWithPackage")]
        public async Task<IActionResult> InteractWithPackage([FromQuery] int userId, [FromQuery] int destinationId)
        {
            var interaction = await _context.UserPackageInteraction
                .FirstOrDefaultAsync(ui => ui.UserId == userId && ui.DestinationId == destinationId);

            if (interaction != null)
            {
                // Interaction exists, increment the count
                interaction.InteractionCount += 1;
                interaction.UpdatedAt = DateTime.Now;
                _context.UserPackageInteraction.Update(interaction);
            }
            else
            {
                // No interaction exists, create a new one
                interaction = new UserPackageInteraction
                {
                    UserId = userId,
                    DestinationId = destinationId,
                    InteractionCount = 1,
                    UpdatedAt = DateTime.Now
                };
                _context.UserPackageInteraction.Add(interaction);
            }

            await _context.SaveChangesAsync();

            // Redirect to the GetPackageTravelInformation action in the User controller
            return Ok("Interacted");
        }
    }
}
