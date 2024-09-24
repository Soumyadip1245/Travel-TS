using BackendApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendApi.Utils
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<User> User { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Package> Package { get; set; }
        public DbSet<Destination> Destination { get; set; }
        public DbSet<Watchlist> Watchlist { get; set; }
        public DbSet<Payment> Payment { get; set; }
        public DbSet<FlightDetail> FlightDetail { get; set; }
        public DbSet<SightseeingDetail> SightseeingDetail { get; set; }
        public DbSet<AccommodationDetail> AccommodationDetail { get; set; }
        public DbSet<LuxuryFacility> LuxuryFacility { get; set; }
        public DbSet<UserPackageInteraction> UserPackageInteraction { get; set; }
        public DbSet<PackageImage> PackageImage { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<TravelerInfo> TravelerInfos { get; set; }
        public DbSet<UploadItinery> UploadItinery { get; set; }
        public DbSet<Website> Website { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Role>()
                .HasMany(r => r.Users)
                .WithOne(u => u.Role)
                .HasForeignKey(u => u.RoleId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Packages)
                .WithOne(p => p.Supplier)
                .HasForeignKey(p => p.SupplierId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Watchlists)
                .WithOne(w => w.User)
                .HasForeignKey(w => w.UserId);

            modelBuilder.Entity<Booking>()
              .HasOne(b => b.Package)
              .WithMany(p => p.Bookings)
              .HasForeignKey(b => b.PackageId);

            modelBuilder.Entity<Package>()
                .HasMany(p => p.Watchlists)
                .WithOne(w => w.Package)
                .HasForeignKey(w => w.PackageId);


            modelBuilder.Entity<Package>()
                .HasOne(p => p.Destination)
                .WithMany(d => d.Packages)
                .HasForeignKey(p => p.DestinationId);
            modelBuilder.Entity<UserPackageInteraction>()
               .HasOne(upi => upi.User)
               .WithMany(u => u.UserPackageInteraction)
               .HasForeignKey(upi => upi.UserId);

            modelBuilder.Entity<UserPackageInteraction>()
                .HasOne(upi => upi.Destination)
                .WithMany(p => p.UserPackageInteraction)
                .HasForeignKey(upi => upi.DestinationId);
            modelBuilder.Entity<Booking>()
                .HasMany(u => u.TravelerInfos)
                .WithOne(p => p.Booking)
                .HasForeignKey(p => p.BookingId);
        }
    }
}