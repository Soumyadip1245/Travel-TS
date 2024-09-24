using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BackendApi.Models
{
    public class FlightDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string FlightName { get; set; }

        public string FlightNumber { get; set; }

        public string? DepartureDate { get; set; } 

        public string? ArrivalDate { get; set; } 

        public int Priority { get; set; } 

        [ForeignKey("Package")]
        public int PackageId { get; set; }
        [JsonIgnore]
        public virtual Package Package { get; set; }
    }
}
