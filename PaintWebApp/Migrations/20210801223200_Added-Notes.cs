using Microsoft.EntityFrameworkCore.Migrations;

namespace PaintWebApp.Migrations
{
    public partial class AddedNotes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Notes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Postition = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Offsets = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sizes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDrawing = table.Column<bool>(type: "bit", nullable: false),
                    TextString = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notes", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notes");
        }
    }
}
