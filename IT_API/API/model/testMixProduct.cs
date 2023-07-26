using System.ComponentModel.DataAnnotations;
using System.Text.Json.Nodes;

namespace API.model
{
    public class testMixProduct
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Pid { get; set; }
        public string brand { get; set; }
        public string gen { get; set; }
        public string type { get; set; }
        public string status { get; set; }
        public string description { get; set; }
        public int amount { get; set; }
        public int price { get; set; }
        public int discount { get; set; }
        public string image { get; set; }
    }
}
