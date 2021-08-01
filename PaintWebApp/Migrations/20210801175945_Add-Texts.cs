using Microsoft.EntityFrameworkCore.Migrations;

namespace PaintWebApp.Migrations
{
    public partial class AddTexts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Texts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Position = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Offsets = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Bounds = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TextString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDrawed = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Texts", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Texts");
        }
    }
}
