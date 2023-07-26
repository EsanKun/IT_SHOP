using Microsoft.AspNetCore.Mvc;

namespace IT_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<ActionResult<List<Customer>>> GetCustomers() 
        {
            return new List<Customer>
            {
                new Customer
                {
                    Name = "Boosh",
                    Phone = "0123456789",
                    Email = "Un_Usn@gmail.com",
                }
            };
        }
    }
}
