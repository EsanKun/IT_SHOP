using Azure.Core.Pipeline;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.model
{
    public class Sales
    {
        [Key]
        public Guid     Sid { get; set; }
        public string   customerTelPhone { get; set; }
        public string customerType { get; set; }
        public DateTime saleDate { get; set; }
        public int      totalAmount { get; set; }
        public int  totalPrice { get; set; }
    }
}
