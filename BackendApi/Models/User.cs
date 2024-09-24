using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace BackendApi.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(255)]
        public string PasswordHash { get; set; }

        [ForeignKey("Role")]
        public int RoleId { get; set; }
        public string? BusinessName { get; set; }
        public string? ContactPerson { get; set; }
        public string? Phone { get; set; }
        public string? AccountId { get; set; }
        public bool IsLocked { get; set; } = false;
        public bool AutoRegistrationCompleted { get; set; } = false;
        public bool IsAgreement { get; set; } = false;
        public DateTime RegistrationDate { get; set; } = DateTime.Now;

        // Navigation properties
        public virtual Role Role { get; set; }
        [JsonIgnore]
        public virtual ICollection<Package> Packages { get; set; }
        public virtual ICollection<Watchlist> Watchlists { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
        public virtual ICollection<UserPackageInteraction> UserPackageInteraction { get; set; }
        [JsonIgnore]
        public virtual Website Website { get; set; }
    }
}