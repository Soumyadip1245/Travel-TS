﻿// <auto-generated />
using System;
using BackendApi.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BackendApi.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240903092644_initialOp")]
    partial class initialOp
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("BackendApi.Models.AccommodationDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CheckInDate")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CheckOutDate")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("HotelName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.Property<int>("Priority")
                        .HasColumnType("int");

                    b.Property<string>("RoomType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("PackageId");

                    b.ToTable("AccommodationDetail");
                });

            modelBuilder.Entity("BackendApi.Models.Booking", b =>
                {
                    b.Property<int>("BookingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("BookingId"));

                    b.Property<DateTime>("BookingDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("ConfirmationNumber")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsCustomerDetailsVisible")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("NumberOfAdults")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfChildren")
                        .HasColumnType("int");

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.Property<int?>("PaymentId")
                        .HasColumnType("int");

                    b.Property<string>("SpecialRequests")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("SupplierId")
                        .HasColumnType("int");

                    b.Property<decimal>("SupplierPaymentAmount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("TotalPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("BookingId");

                    b.HasIndex("PackageId");

                    b.HasIndex("PaymentId");

                    b.HasIndex("SupplierId");

                    b.HasIndex("UserId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("BackendApi.Models.Destination", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.ToTable("Destination");
                });

            modelBuilder.Entity("BackendApi.Models.FlightDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ArrivalDate")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("DepartureDate")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FlightName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FlightNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.Property<int>("Priority")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PackageId");

                    b.ToTable("FlightDetail");
                });

            modelBuilder.Entity("BackendApi.Models.LuxuryFacility", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("FacilityName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.Property<int>("Priority")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PackageId");

                    b.ToTable("LuxuryFacility");
                });

            modelBuilder.Entity("BackendApi.Models.Package", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Accommodation")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("AvailableCount")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("DestinationId")
                        .HasColumnType("int");

                    b.Property<bool>("FlightBooking")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("ImagePath")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("IsPublic")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsSpecial")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsVerified")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("LuxuryFacilities")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("PdfPath")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("PercentageIncome")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(65,30)");

                    b.Property<bool>("Sightseeing")
                        .HasColumnType("tinyint(1)");

                    b.Property<int?>("SupplierId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("DestinationId");

                    b.HasIndex("SupplierId");

                    b.ToTable("Package");
                });

            modelBuilder.Entity("BackendApi.Models.PackageImage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ImagePath")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PackageId");

                    b.ToTable("PackageImage");
                });

            modelBuilder.Entity("BackendApi.Models.Payment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("BookingId")
                        .HasColumnType("int");

                    b.Property<int?>("PackageId")
                        .HasColumnType("int");

                    b.Property<string>("PaymentMethod")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PaymentStatus")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("TransactionId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BookingId");

                    b.HasIndex("PackageId");

                    b.HasIndex("UserId");

                    b.ToTable("Payment");
                });

            modelBuilder.Entity("BackendApi.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("BackendApi.Models.SightseeingDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.Property<int>("Priority")
                        .HasColumnType("int");

                    b.Property<string>("TourDescription")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("TourName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("PackageId");

                    b.ToTable("SightseeingDetail");
                });

            modelBuilder.Entity("BackendApi.Models.TravelerInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("BookingId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PassportNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("BookingId");

                    b.ToTable("TravelerInfos");
                });

            modelBuilder.Entity("BackendApi.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AccountId")
                        .HasColumnType("longtext");

                    b.Property<bool>("AutoRegistrationCompleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("BusinessName")
                        .HasColumnType("longtext");

                    b.Property<string>("ContactPerson")
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<bool>("IsAgreement")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsLocked")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Phone")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("RegistrationDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("BackendApi.Models.UserPackageInteraction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("DestinationId")
                        .HasColumnType("int");

                    b.Property<int>("InteractionCount")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("DestinationId");

                    b.HasIndex("UserId");

                    b.ToTable("UserPackageInteraction");
                });

            modelBuilder.Entity("BackendApi.Models.Watchlist", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PackageId");

                    b.HasIndex("UserId");

                    b.ToTable("Watchlist");
                });

            modelBuilder.Entity("BackendApi.Models.AccommodationDetail", b =>
                {
                    b.HasOne("BackendApi.Models.Package", "Package")
                        .WithMany("AccommodationDetails")
                        .HasForeignKey("PackageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Package");
                });

            modelBuilder.Entity("BackendApi.Models.Booking", b =>
                {
                    b.HasOne("BackendApi.Models.Package", "Package")
                        .WithMany("Bookings")
                        .HasForeignKey("PackageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BackendApi.Models.Payment", "Payment")
                        .WithMany()
                        .HasForeignKey("PaymentId");

                    b.HasOne("BackendApi.Models.User", "Supplier")
                        .WithMany()
                        .HasForeignKey("SupplierId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BackendApi.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Package");

                    b.Navigation("Payment");

                    b.Navigation("Supplier");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BackendApi.Models.FlightDetail", b =>
                {
                    b.HasOne("BackendApi.Models.Package", "Package")
                        .WithMany("FlightDetails")
                        .HasForeignKey("PackageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Package");
                });

            modelBuilder.Entity("BackendApi.Models.LuxuryFacility", b =>
                {
                    b.HasOne("BackendApi.Models.Package", "Package")
                        .WithMany("LuxuryFacility")
                        .HasForeignKey("PackageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Package");
                });

            modelBuilder.Entity("BackendApi.Models.Package", b =>
                {
                    b.HasOne("BackendApi.Models.Destination", "Destination")
                        .WithMany("Packages")
                        .HasForeignKey("DestinationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BackendApi.Models.User", "Supplier")
                        .WithMany("Packages")
                        .HasForeignKey("SupplierId");

                    b.Navigation("Destination");

                    b.Navigation("Supplier");
                });

            modelBuilder.Entity("BackendApi.Models.PackageImage", b =>
                {
                    b.HasOne("BackendApi.Models.Package", "Package")
                        .WithMany("Images")
                        .HasForeignKey("PackageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Package");
                });

            modelBuilder.Entity("BackendApi.Models.Payment", b =>
                {
                    b.HasOne("BackendApi.Models.Booking", "Booking")
                        .WithMany()
                        .HasForeignKey("BookingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BackendApi.Models.Package", null)
                        .WithMany("Payments")
                        .HasForeignKey("PackageId");

                    b.HasOne("BackendApi.Models.User", null)
                        .WithMany("Payments")
                        .HasForeignKey("UserId");

                    b.Navigation("Booking");
                });

            modelBuilder.Entity("BackendApi.Models.SightseeingDetail", b =>
                {
                    b.HasOne("BackendApi.Models.Package", "Package")
                        .WithMany("SightseeingDetails")
                        .HasForeignKey("PackageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Package");
                });

            modelBuilder.Entity("BackendApi.Models.TravelerInfo", b =>
                {
                    b.HasOne("BackendApi.Models.Booking", "Booking")
                        .WithMany("TravelerInfos")
                        .HasForeignKey("BookingId");

                    b.Navigation("Booking");
                });

            modelBuilder.Entity("BackendApi.Models.User", b =>
                {
                    b.HasOne("BackendApi.Models.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("BackendApi.Models.UserPackageInteraction", b =>
                {
                    b.HasOne("BackendApi.Models.Destination", "Destination")
                        .WithMany("UserPackageInteraction")
                        .HasForeignKey("DestinationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BackendApi.Models.User", "User")
                        .WithMany("UserPackageInteraction")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Destination");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BackendApi.Models.Watchlist", b =>
                {
                    b.HasOne("BackendApi.Models.Package", "Package")
                        .WithMany("Watchlists")
                        .HasForeignKey("PackageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BackendApi.Models.User", "User")
                        .WithMany("Watchlists")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Package");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BackendApi.Models.Booking", b =>
                {
                    b.Navigation("TravelerInfos");
                });

            modelBuilder.Entity("BackendApi.Models.Destination", b =>
                {
                    b.Navigation("Packages");

                    b.Navigation("UserPackageInteraction");
                });

            modelBuilder.Entity("BackendApi.Models.Package", b =>
                {
                    b.Navigation("AccommodationDetails");

                    b.Navigation("Bookings");

                    b.Navigation("FlightDetails");

                    b.Navigation("Images");

                    b.Navigation("LuxuryFacility");

                    b.Navigation("Payments");

                    b.Navigation("SightseeingDetails");

                    b.Navigation("Watchlists");
                });

            modelBuilder.Entity("BackendApi.Models.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("BackendApi.Models.User", b =>
                {
                    b.Navigation("Packages");

                    b.Navigation("Payments");

                    b.Navigation("UserPackageInteraction");

                    b.Navigation("Watchlists");
                });
#pragma warning restore 612, 618
        }
    }
}
