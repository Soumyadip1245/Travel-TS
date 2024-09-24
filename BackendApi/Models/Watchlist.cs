using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BackendApi.Models
{
    public class Watchlist
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [ForeignKey("Package")]
    
        public int PackageId { get; set; }
        [JsonIgnore]
        // Navigation properties
        public virtual User User { get; set; }
        [JsonIgnore]
        public virtual Package Package { get; set; }
    }
}
