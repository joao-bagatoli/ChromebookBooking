using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChromebookBooking.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddIsActiveToSection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Sections",
                type: "boolean",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Sections");
        }
    }
}
