using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BackendApi.Models
{
    public class UploadItinery
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("Booking")]
        public int BookingId { get; set; }
        public string Path { get; set; }
        public bool FlightBooking { get; set; } = false;
        public bool Accommodation { get; set; } = false;
        public bool Sightseeing { get; set; } = false;
        public bool LuxuryFacilities { get; set; } = false;
        public string FileName { get; set; }    
        [JsonIgnore]
        public virtual Booking Booking { get; set; }
    }
}
