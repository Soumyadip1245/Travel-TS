using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BackendApi.Models
{
    public class Package
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int AvailableCount { get; set; }

        [ForeignKey("User")]
        public int? SupplierId { get; set; }

        [ForeignKey("Destination")]
        public int DestinationId { get; set; }

        public bool IsPublic { get; set; }
        public bool IsArchived { get; set; }
        public bool IsFeatured { get; set; } = false;
        public bool IsVerified { get; set; }
        public bool FlightBooking { get; set; }
        public bool Accommodation { get; set; }
        public bool Sightseeing { get; set; }
        public bool LuxuryFacilities { get; set; }
        public string ImagePath { get; set; }
        public string PdfPath { get; set; }
        public decimal PercentageIncome { get; private set; }
        public virtual User Supplier { get; set; }
        public virtual Destination Destination { get; set; }
        public virtual ICollection<Watchlist> Watchlists { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
        public virtual ICollection<FlightDetail> FlightDetails { get; set; }
        public virtual ICollection<AccommodationDetail> AccommodationDetails { get; set; }
        public virtual ICollection<LuxuryFacility> LuxuryFacility { get; set; }
        public virtual ICollection<SightseeingDetail> SightseeingDetails { get; set; }
        public ICollection<PackageImage> Images { get; set; }
        [JsonIgnore]
        public ICollection<Booking> Bookings { get; set; }
        public void CalculatePercentageIncome()
        {
            if (Price < 25000)
            {
                PercentageIncome = 12;
            }
            else if (Price >= 25000 && Price < 50000)
            {
                PercentageIncome = 10;
            }
            else if (Price >= 50000 && Price < 100000)
            {
                PercentageIncome = 8;
            }
            else if (Price >= 100000 && Price < 200000)
            {
                PercentageIncome = 5;
            }
            else if (Price >= 200000)
            {
                PercentageIncome = 2;
            }
            else
            {
                PercentageIncome = 0;
            }
        }
    }

}