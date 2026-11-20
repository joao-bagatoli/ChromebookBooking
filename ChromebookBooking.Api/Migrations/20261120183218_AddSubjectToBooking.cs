using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChromebookBooking.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddSubjectToBooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Subject",
                table: "Bookings",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Subject",
                table: "Bookings");
        }
    }
}
