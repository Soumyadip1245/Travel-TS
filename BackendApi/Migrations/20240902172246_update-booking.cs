using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendApi.Migrations
{
    /// <inheritdoc />
    public partial class updatebooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SupplierId",
                table: "Bookings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_SupplierId",
                table: "Bookings",
                column: "SupplierId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_User_SupplierId",
                table: "Bookings",
                column: "SupplierId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_User_SupplierId",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_SupplierId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "SupplierId",
                table: "Bookings");
        }
    }
}
