using Microsoft.EntityFrameworkCore.Migrations;

namespace Gym.API.Migrations
{
    public partial class Programs_addingMealDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MealDescription",
                table: "Nutrition_Programs",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MealDescription",
                table: "Nutrition_Programs");
        }
    }
}
