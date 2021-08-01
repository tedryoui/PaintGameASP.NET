using Microsoft.EntityFrameworkCore.Migrations;

namespace PaintWebApp.Migrations
{
    public partial class AddedNotesFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Postition",
                table: "Notes",
                newName: "Position");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Position",
                table: "Notes",
                newName: "Postition");
        }
    }
}
