using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendApi.Models
{
    public class Booking
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BookingId { get; set; }

        [ForeignKey("Package")]
        public int PackageId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        [ForeignKey("Supplier")]
        public int SupplierId { get; set; }

        public DateTime BookingDate { get; set; } = DateTime.Now;

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public int NumberOfAdults { get; set; }

        [Required]
        public int NumberOfChildren { get; set; }

        public decimal TotalPrice { get; set; }

        public decimal SupplierPaymentAmount { get; set; } // Amount the supplier needs to pay to accept the booking

        public string? SpecialRequests { get; set; }

        [ForeignKey("Payment")]
        public int? PaymentId { get; set; } // Nullable in case payment is pending

        public string Status { get; set; } = "Pending"; // Booking status

        public string? ConfirmationNumber { get; set; }

        public bool IsCustomerDetailsVisible { get; set; } = false; // Default to false, only set to true after payment

        // Navigation properties
        public virtual Package Package { get; set; }
        public virtual User User { get; set; }
        public virtual User Supplier { get; set; }
        public virtual Payment? Payment { get; set; }
        public virtual ICollection<TravelerInfo> TravelerInfos { get; set; }
        public ICollection<UploadItinery> ItinaryList { get; set; }
    }
}
