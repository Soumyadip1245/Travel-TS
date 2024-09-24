using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BackendApi.Models
{
    public class UserPackageInteraction
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [ForeignKey("Package")]
        public int DestinationId { get; set; }

        public int InteractionCount { get; set; } 

        public DateTime UpdatedAt { get; set; }
        public virtual User User { get; set; }
        [JsonIgnore]
        public virtual Destination Destination { get; set; }
    }

}
