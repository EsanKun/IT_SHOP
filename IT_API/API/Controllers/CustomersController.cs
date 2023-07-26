using API.Data;
using API.model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {

        private readonly FullStackDbContext _fullstackDbContext;
        public CustomersController(FullStackDbContext fullStackDbContext)
        {
            _fullstackDbContext = fullStackDbContext;
        }

        [HttpGet]
        public async Task <IActionResult> GetAllCustomers()
        {
            var customer = await _fullstackDbContext.Customers.ToListAsync();
            return Ok(customer);
        }

        [HttpPost]
        public async Task<IActionResult> AddCustomer([FromBody] Customer customerRequest)
        {
            customerRequest.Cid = Guid.NewGuid();

            // เพิ่มข้อมูลที่ส่งเข้ามาลงไปใน Table แต่ยังไม่ได้อัปเดตในดาต้าเบส
            await _fullstackDbContext.Customers.AddAsync(customerRequest);
            // บันทึกข้อมูลล่าสุดของ Table ในดาต้าเบส
            await _fullstackDbContext.SaveChangesAsync();

            return Ok(customerRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetCustomer([FromRoute] Guid id)
        {
            var customer = await _fullstackDbContext.Customers.FirstOrDefaultAsync(x => x.Cid == id);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        [HttpGet]
        [Route("telPhone/{telPhone}")]
        public async Task<IActionResult> GetCustomerbytelPhone([FromRoute] string telPhone)
        {
            var customer = await _fullstackDbContext.Customers.FirstOrDefaultAsync(x => x.telPhone == telPhone);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }


        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> SearchCustomers(string input)
        {
            var customers = await _fullstackDbContext.Customers
                .Where(p => p.Name.Contains(input) || p.telPhone.Contains(input) || p.Email.Contains(input))
                .ToListAsync();

            if (customers == null || customers.Count == 0)
            {
                return NotFound();
            }

            return Ok(customers);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateCustomer([FromRoute] Guid id, Customer updateCustomerRequest)
        {
            var customer = await _fullstackDbContext.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            customer.Name = updateCustomerRequest.Name;
            customer.Email = updateCustomerRequest.Email;
            customer.telPhone = updateCustomerRequest.telPhone;

            await _fullstackDbContext.SaveChangesAsync();

            return Ok(customer);

        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteCustomer([FromRoute] Guid id)
        {
            var customer = await _fullstackDbContext.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            _fullstackDbContext.Customers.Remove(customer);
            await _fullstackDbContext.SaveChangesAsync();

            return Ok(customer);
        }
    }
}
