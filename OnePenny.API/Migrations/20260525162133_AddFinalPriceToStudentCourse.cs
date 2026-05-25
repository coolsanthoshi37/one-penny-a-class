using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnePenny.API.Migrations
{
    /// <inheritdoc />
    public partial class AddFinalPriceToStudentCourse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "FinalPriceAtPurchase",
                table: "StudentCourses",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FinalPriceAtPurchase",
                table: "StudentCourses");
        }
    }
}
