using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class sale : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sale",
                columns: table => new
                {
                    Sid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    customerTelPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    customerType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    saleDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    totalAmount = table.Column<int>(type: "int", nullable: false),
                    totalPrice = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sale", x => x.Sid);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sale");
        }
    }
}
