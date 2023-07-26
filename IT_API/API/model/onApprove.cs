using System.ComponentModel.DataAnnotations;

namespace API.model
{
    public class onApprove
    {
        [Key]
        public Guid Id { get; set; }
        public string Pid1 { get; set; }
        public string Pid2 { get; set; }
        public string brand { get; set; }
        public string gen { get; set; }
        public string type { get; set; }
        public string description { get; set; }
        public int amount { get; set; }
        public int price { get; set; }
        public int discount { get; set; }
        public string image { get; set; }
    }
}
