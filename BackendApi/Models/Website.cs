using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackendApi.Models
{
    public class Website
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Theme { get; set; } // Allows the supplier to choose a theme
        public string CustomDomain { get; set; } // Optional: Custom domain for the supplier's website
        public bool IsOpen { get; set; } = false;
        [ForeignKey("User")]
        public int SupplierId { get; set; }
        public User Supplier { get; set; }
        public DateTime ValidTill { get; set; }
    }
}
