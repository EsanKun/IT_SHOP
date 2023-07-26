using API.model;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class FullStackDbContext : DbContext
    {
        public FullStackDbContext(DbContextOptions<FullStackDbContext> options) : base(options) { }


        //public DbSet<Customers> Customers => Set<Customers>();

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Sales> Sale { get; set; }
        public DbSet<salesDetail> saleDetails { get; set; }
        public DbSet<onApprove> Approves { get; set; }
        public DbSet<testMixProduct> testMixProducts { get; set; }

    }
}
