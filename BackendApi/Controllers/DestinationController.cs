using BackendApi.Models;
using BackendApi.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DestinationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DestinationController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost("AddDestinations")]
        public async Task<IActionResult> AddDestinations()
        {
            var destinations = new List<Destination>
    {
        new Destination { Name = "Paris", Country = "France", Description = "A popular travel destination in Europe, known for the Eiffel Tower." },
        new Destination { Name = "Tokyo", Country = "Japan", Description = "A bustling metropolis and cultural hub in Japan." },
        new Destination { Name = "Rio de Janeiro", Country = "Brazil", Description = "Famous for its Carnival festival and Christ the Redeemer statue." },
        new Destination { Name = "Sydney", Country = "Australia", Description = "Known for the Sydney Opera House and Harbour Bridge." },
        new Destination { Name = "Rome", Country = "Italy", Description = "Home to ancient ruins, including the Colosseum and the Vatican." },
        new Destination { Name = "Toronto", Country = "Canada", Description = "A major Canadian city known for the CN Tower and multiculturalism." },
        new Destination { Name = "New Delhi", Country = "India", Description = "India's capital, known for its rich history and landmarks like the Red Fort." },
        new Destination { Name = "New York City", Country = "United States", Description = "Known for Times Square, Central Park, and the Statue of Liberty." },
        new Destination { Name = "Cairo", Country = "Egypt", Description = "Home to the Pyramids of Giza and ancient Egyptian civilization." },
        new Destination { Name = "Cape Town", Country = "South Africa", Description = "Famous for Table Mountain and its beautiful coastal scenery." },
        new Destination { Name = "Dubai", Country = "United Arab Emirates", Description = "Known for its modern architecture, shopping, and desert safaris." },
        new Destination { Name = "Bangkok", Country = "Thailand", Description = "Thailand's capital, famous for its vibrant street life and temples." },
        new Destination { Name = "Istanbul", Country = "Turkey", Description = "A city that bridges Europe and Asia, rich in history and culture." },
        new Destination { Name = "Singapore", Country = "Singapore", Description = "A global financial hub known for its cleanliness and modern architecture." },
        new Destination { Name = "Hong Kong", Country = "China", Description = "Known for its skyline and deep natural harbor." },
        new Destination { Name = "Barcelona", Country = "Spain", Description = "Famous for its art and architecture, especially the works of Gaudí." },
        new Destination { Name = "Berlin", Country = "Germany", Description = "Germany's capital, known for its historical sites like the Berlin Wall." },
        new Destination { Name = "Moscow", Country = "Russia", Description = "Russia's capital, known for the Kremlin and Red Square." },
        new Destination { Name = "Athens", Country = "Greece", Description = "Known for its ancient landmarks like the Parthenon." },
        new Destination { Name = "Seoul", Country = "South Korea", Description = "A vibrant city known for its pop culture and technology." },
        new Destination { Name = "Mexico City", Country = "Mexico", Description = "The capital of Mexico, known for its rich history and culture." },
        new Destination { Name = "Buenos Aires", Country = "Argentina", Description = "Famous for its European-style architecture and tango dance." },
        new Destination { Name = "Lisbon", Country = "Portugal", Description = "Known for its hilly, coastal landscape and historic sites." },
        new Destination { Name = "Amsterdam", Country = "Netherlands", Description = "Known for its canals, museums, and liberal culture." },
        new Destination { Name = "Vienna", Country = "Austria", Description = "Famous for its classical music heritage and historic architecture." },
        new Destination { Name = "Zurich", Country = "Switzerland", Description = "A global banking hub known for its beautiful lakes and mountains." },
        new Destination { Name = "Stockholm", Country = "Sweden", Description = "Sweden's capital, known for its archipelago and vibrant culture." },
        new Destination { Name = "Copenhagen", Country = "Denmark", Description = "Known for its design, architecture, and the Little Mermaid statue." },
        new Destination { Name = "Helsinki", Country = "Finland", Description = "Finland's capital, known for its modern architecture and design." },
        new Destination { Name = "Oslo", Country = "Norway", Description = "Norway's capital, known for its green spaces and museums." },
        new Destination { Name = "Reykjavik", Country = "Iceland", Description = "Iceland's capital, known for its proximity to natural wonders." },
        new Destination { Name = "Dubai", Country = "United Arab Emirates", Description = "Known for its luxury shopping, ultramodern architecture, and lively nightlife." },
        new Destination { Name = "Kuala Lumpur", Country = "Malaysia", Description = "Known for its iconic Petronas Twin Towers and diverse culture." },
        new Destination { Name = "Beijing", Country = "China", Description = "China's capital, known for its historical sites like the Great Wall and Forbidden City." },
        new Destination { Name = "Shanghai", Country = "China", Description = "China's largest city, known for its modern skyline and historic landmarks." },
        new Destination { Name = "Rio de Janeiro", Country = "Brazil", Description = "Known for its beaches, Carnaval festival, and Christ the Redeemer statue." },
        new Destination { Name = "Los Angeles", Country = "United States", Description = "Known for Hollywood and the entertainment industry." },
        new Destination { Name = "San Francisco", Country = "United States", Description = "Known for the Golden Gate Bridge and its tech industry." },
        new Destination { Name = "Chicago", Country = "United States", Description = "Known for its architecture and vibrant arts scene." },
        new Destination { Name = "Miami", Country = "United States", Description = "Known for its beaches, nightlife, and cultural diversity." }
      
    };

            foreach (var destination in destinations)
            {
                var existingDestination = await _context.Destination
                    .FirstOrDefaultAsync(d => d.Name == destination.Name && d.Country == destination.Country);

                if (existingDestination == null)
                {
                    _context.Destination.Add(destination);
                }
            }

            await _context.SaveChangesAsync();

            return Ok("All predefined destinations added successfully.");
        }
        [HttpGet("GetAllDestinationDetails")]
        public IActionResult GetAllDestinationDetails()
        {
            var destinations = _context.Destination.ToList();
            return Ok(destinations);
        }
    }
}
