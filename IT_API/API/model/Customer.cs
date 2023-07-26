using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.model
{
    public class Customer
    {
        [Key]
        public Guid Cid { get; set; }
        public string Name { get; set; }
        public string telPhone { get; set; }
        public string Email { get; set; }

    }
}
