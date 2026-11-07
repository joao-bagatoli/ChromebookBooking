using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChromebookBooking.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddSectionShift : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Shift",
                table: "Sections",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Shift",
                table: "Sections");
        }
    }
}
