using API.Data;
using API.model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly FullStackDbContext _fullstackDbContext;
        public SaleController(FullStackDbContext fullStackDbContext)
        {
            _fullstackDbContext = fullStackDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSale()
        {
            var sales = await _fullstackDbContext.Sale.ToListAsync();

            return Ok(sales);
        }

        [HttpPost]
        public async Task<IActionResult> AddSale([FromBody] Sales SaleRequest)
        {
            SaleRequest.Sid = Guid.NewGuid();
            SaleRequest.saleDate = DateTime.Now;

            // เพิ่มข้อมูลที่ส่งเข้ามาลงไปใน Table แต่ยังไม่ได้อัปเดตในดาต้าเบส
            await _fullstackDbContext.Sale.AddAsync(SaleRequest);
            // บันทึกข้อมูลล่าสุดของ Table ในดาต้าเบส
            await _fullstackDbContext.SaveChangesAsync();

            return Ok(SaleRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetSale([FromRoute] Guid id)
        {
            var sale = await _fullstackDbContext.Sale.FirstOrDefaultAsync(x => x.Sid == id);

            if (sale == null)
            {
                return NotFound();
            }

            return Ok(sale);
        }

        [HttpGet]
        [Route("customerTelPhone/{customerTelPhone}")]
        public async Task<IActionResult> GetAllSale_byCusPhone(string customerTelPhone)
        {
            var sales = await _fullstackDbContext.Sale.Where(x => x.customerTelPhone == customerTelPhone).ToListAsync();
            if (sales == null || sales.Count == 0)
            {
                return NotFound();
            }
            return Ok(sales);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateSale([FromRoute] Guid id, Sales updateSaleRequest)
        {
            var sale = await _fullstackDbContext.Sale.FindAsync(id);

            if (sale == null)
            {
                return NotFound();
            }

            sale.customerTelPhone = updateSaleRequest.customerTelPhone;
            sale.saleDate = updateSaleRequest.saleDate = DateTime.Now;
            sale.totalPrice = updateSaleRequest.totalPrice;
            sale.totalAmount = updateSaleRequest.totalAmount;

            await _fullstackDbContext.SaveChangesAsync();

            return Ok(sale);

        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteSale([FromRoute] Guid id)
        {
            var sale = await _fullstackDbContext.Sale.FindAsync(id);

            if (sale == null)
            {
                return NotFound();
            }

            _fullstackDbContext.Sale.Remove(sale);
            await _fullstackDbContext.SaveChangesAsync();

            return Ok(sale);
        }
    }
}
