using System.ComponentModel.DataAnnotations;

namespace API.model
{
    public class Employee
    {
        [Key]
        public Guid Eid { get; set; }
        public string Name { get; set; }
        public int role { get; set; }
        public string telPhone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public string token { get; set; }

    }
}
