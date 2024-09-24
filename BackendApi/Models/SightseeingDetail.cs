using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BackendApi.Models
{
    public class SightseeingDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string TourName { get; set; }

        public string TourDescription { get; set; }

        public int Priority { get; set; } 

        [ForeignKey("Package")]
        public int PackageId { get; set; }
        [JsonIgnore]
        public virtual Package Package { get; set; }
    }
}
