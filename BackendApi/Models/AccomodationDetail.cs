using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BackendApi.Models
{
    public class AccommodationDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string HotelName { get; set; }

        public string RoomType { get; set; }

        public string? CheckInDate { get; set; } 

        public string? CheckOutDate { get; set; } 

        public int Priority { get; set; } 

        [ForeignKey("Package")]
        public int PackageId { get; set; }
        [JsonIgnore]
        public virtual Package Package { get; set; }
    }
}
