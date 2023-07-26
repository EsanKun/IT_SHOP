using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.ComponentModel.DataAnnotations;

namespace API.model
{
    public class salesDetail
    {
        [Key]
        public Guid SDid { get; set; }
        public string saleId { get; set; }
        public string proudctId { get; set; }
        public int eachAmount { get; set; }
        public decimal totalPrice { get; set; }
    }
}
