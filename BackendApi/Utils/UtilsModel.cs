using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackendApi.Utils
{
    public class UtilsModel
    {
    }
    public class UserUpdate
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? BusinessName { get; set; }
        public string? ContactPerson { get; set; }
        public string? AccountId { get; set; }
        public string? Phone { get; set; }
        public bool? IsLocked { get; set; }
        public bool? AutoRegistrationCompleted { get; set; }
        public bool? IsAgreement { get; set; }
    }
    public class PackageDto
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int AvailableCount { get; set; }

        [Required]
        public string DestinationName { get; set; }

        public int SupplierId {  get; set; }
    }
    public class PackageAdditionalDetailsDto
    {
        public int PackageId { get; set; }
        public List<FlightDetailDto> FlightDetails { get; set; }
        public List<AccommodationDetailDto> AccommodationDetails { get; set; }
        public List<LuxuryFacilityDto> LuxuryFacilities { get; set; }
        public List<SightseeingDetailDto> SightseeingDetails { get; set; }
    }
    public class FlightDetailDto
    {
        public string FlightName { get; set; }
        public string FlightNumber { get; set; }
        public string? DepartureDate { get; set; }
        public string? ArrivalDate { get; set; }
        public int Priority { get; set; }
    }

    public class AccommodationDetailDto
    {
        public string HotelName { get; set; }
        public string RoomType { get; set; }
        public string? CheckInDate { get; set; }
        public string? CheckOutDate { get; set; }
        public int Priority { get; set; }
    }

    public class LuxuryFacilityDto
    {
        public string FacilityName { get; set; }
        public int Priority { get; set; }
    }

    public class SightseeingDetailDto
    {
        public string TourName { get; set; }
        public string TourDescription { get; set; }
        public int Priority { get; set; }

    }
    public class UserPackageDto
    {
        public List<AllPackagUserDto> AllVerifiedPublicPackages { get; set; }
        public List<AllPackagUserDto> SuggestedPackages { get; set; }
        public List<AllPackagUserDto> WishlistPackages { get; set; }
    }
    public class AllPackagUserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string imgBase {  get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Destination { get; set; }
        // Add other relevant package details
    }
    public class BookingViewModel
    {
        public int PackageId { get; set; }
        public int UserId { get; set; }
        public int SupplierId { get; set; }
        // Package details
        public string PackageName { get; set; }
        public string Destination { get; set; }
        public decimal Price { get; set; }

        // List of travellers
        public List<TravellerViewModel> Travellers { get; set; } = new List<TravellerViewModel>();

        // Booking details
        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public int NumberOfAdults { get; set; }

        [Required]
        public int NumberOfChildren { get; set; }

        public decimal TotalPrice { get; set; }

        public decimal SupplierPaymentAmount { get; set; }

        public string? SpecialRequests { get; set; }
    }

    public class TravellerViewModel
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string PassportNumber { get; set; }
    }
    public class AdminDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public int RoleId { get; set; }
        public bool IsLocked { get; set; }

        public string? BusinessName { get; set; }
        public string? ContactPerson { get; set; }
        public string? Phone { get; set; }
    }

    public class AdminLockRequest
    {
        public int Id { get; set; }
        public bool IsLocked { get; set; }
    }
}
