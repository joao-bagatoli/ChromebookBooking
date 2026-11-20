using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChromebookBooking.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddDisciplineToBookings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Discipline",
                table: "Bookings",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discipline",
                table: "Bookings");
        }
    }
}
