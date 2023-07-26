using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.model
{
    public class Product
    {
        [Key]
        public Guid Pid { get; set; }
        public string brand { get; set; }
        public string gen { get; set; }
        public string type { get; set; }
        public int amount { get; set; }
        public string description { get; set; }
        public int price { get; set; }
        public string image { get; set; }
    }
}
