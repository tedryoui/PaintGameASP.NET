using Microsoft.EntityFrameworkCore.Migrations;

namespace PaintWebApp.Migrations
{
    public partial class AddedNotesFix2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsDrawing",
                table: "Notes",
                newName: "IsDrawed");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsDrawed",
                table: "Notes",
                newName: "IsDrawing");
        }
    }
}
