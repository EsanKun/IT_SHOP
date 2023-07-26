using API.Data;
using API.model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly FullStackDbContext _fullstackDbContext;
        public ProductsController(FullStackDbContext fullStackDbContext)
        {
            _fullstackDbContext = fullStackDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _fullstackDbContext.Products.ToListAsync();

            return Ok(products);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] Product productRequest)
        {
            productRequest.Pid = Guid.NewGuid();

            // เพิ่มข้อมูลที่ส่งเข้ามาลงไปใน Table แต่ยังไม่ได้อัปเดตในดาต้าเบส
            await _fullstackDbContext.Products.AddAsync(productRequest);
            // บันทึกข้อมูลล่าสุดของ Table ในดาต้าเบส
            await _fullstackDbContext.SaveChangesAsync();

            return Ok(productRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetProduct([FromRoute] Guid id)
        {
            var product = await _fullstackDbContext.Products.FirstOrDefaultAsync(x => x.Pid == id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpGet]
        [Route("type/{type}")]
        public async Task<IActionResult> GetProductByType(string type)
        {
            var products = await _fullstackDbContext.Products.Where(x => x.type == type).ToListAsync();
            if (products == null || products.Count == 0)
            {
                return NotFound();
            }
            return Ok(products);
        }

        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> SearchProducts(string input)
        {
            var products = await _fullstackDbContext.Products
                .Where(p => p.brand.Contains(input) || p.gen.Contains(input) || p.description.Contains(input) || p.type.Contains(input))
                .ToListAsync();

            if (products == null || products.Count == 0)
            {
                return NotFound();
            }

            return Ok(products);
        }


        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] Guid id, Product updateProductRequest)
        {
            var product = await _fullstackDbContext.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            product.brand = updateProductRequest.brand;
            product.gen = updateProductRequest.gen;
            product.type = updateProductRequest.type;
            product.amount = updateProductRequest.amount;
            product.description = updateProductRequest.description;
            product.price = updateProductRequest.price;
            product.image = updateProductRequest.image;


            await _fullstackDbContext.SaveChangesAsync();

            return Ok(product);

        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] Guid id)
        {
            var product = await _fullstackDbContext.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            _fullstackDbContext.Products.Remove(product);
            await _fullstackDbContext.SaveChangesAsync();

            return Ok(product);
        }
    }
}
