using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChromebookBooking.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddQuantityToBookingTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ChromebooksQuantity",
                table: "Bookings",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChromebooksQuantity",
                table: "Bookings");
        }
    }
}
