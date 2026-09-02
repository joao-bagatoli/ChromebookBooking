using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ChromebookBooking.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddClassPeriodsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClassPeriods",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Shift = table.Column<int>(type: "integer", nullable: false),
                    StartTime = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    EndTime = table.Column<TimeOnly>(type: "time without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassPeriods", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_ClassPeriodId",
                table: "Bookings",
                column: "ClassPeriodId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_ClassPeriods_ClassPeriodId",
                table: "Bookings",
                column: "ClassPeriodId",
                principalTable: "ClassPeriods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_ClassPeriods_ClassPeriodId",
                table: "Bookings");

            migrationBuilder.DropTable(
                name: "ClassPeriods");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_ClassPeriodId",
                table: "Bookings");
        }
    }
}
