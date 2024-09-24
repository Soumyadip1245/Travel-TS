using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BackendApi.Models
{
    public class Payment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("Booking")]
        public int BookingId { get; set; }

        [Required]
        public string PaymentMethod { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string TransactionId { get; set; }

        [Required]
        public string PaymentStatus { get; set; } // e.g., "Pending", "Completed"

        // Navigation property
        [JsonIgnore]
        public virtual Booking Booking { get; set; }
    }
}
