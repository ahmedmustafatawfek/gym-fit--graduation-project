using Microsoft.EntityFrameworkCore.Migrations;

namespace Gym.API.Migrations
{
    public partial class addingPriceToPrograms : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Nutrition_Programs",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Nutrition_Programs");
        }
    }
}
