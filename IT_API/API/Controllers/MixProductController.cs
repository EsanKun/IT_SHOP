using API.Data;
using API.model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MixProductController : ControllerBase
    {
        private readonly FullStackDbContext _fullstackDbContext;
        public MixProductController(FullStackDbContext fullStackDbContext)
        {
            _fullstackDbContext = fullStackDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMixProduct()
        {
            var mixProducts = await _fullstackDbContext.testMixProducts.ToListAsync();

            return Ok(mixProducts);
        }

        [HttpPost]
        public async Task<IActionResult> AddMixProduct([FromBody] testMixProduct mixProductRequest)
        {
            mixProductRequest.Id = Guid.NewGuid();

            // เพิ่มข้อมูลที่ส่งเข้ามาลงไปใน Table แต่ยังไม่ได้อัปเดตในดาต้าเบส
            await _fullstackDbContext.testMixProducts.AddAsync(mixProductRequest);
            // บันทึกข้อมูลล่าสุดของ Table ในดาต้าเบส
            await _fullstackDbContext.SaveChangesAsync();

            return Ok(mixProductRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetMixProduct([FromRoute] Guid id)
        {
            var mixProduct = await _fullstackDbContext.testMixProducts.FirstOrDefaultAsync(x => x.Id == id);

            if (mixProduct == null)
            {
                return NotFound();
            }

            return Ok(mixProduct);
        }

        [HttpGet]
        [Route("status/{status}")]
        public async Task<IActionResult> GetSetByType(string status)
        {
            var mixProduct = await _fullstackDbContext.testMixProducts.Where(x => x.status == status).ToListAsync();
            if (mixProduct == null || mixProduct.Count == 0)
            {
                return NotFound();
            }
            return Ok(mixProduct);
        }

        //[HttpGet]
        //[Route("{id:Guid}")]
        //public async Task<IActionResult> GetAllProductinMixProduct([FromRoute] Guid id)
        //{
        //    var mixProduct = await _fullstackDbContext.testMixProducts.FirstOrDefaultAsync(x => x.Id == id);

        //    if (mixProduct == null)
        //    {
        //        return NotFound();
        //    }

        //    string[] PIDs = mixProduct.Pid.Split(',').Select(x => x.Trim()).ToArray();

        //    foreach(var pid in PIDs)
        //    {
        //        return Ok(pid);
        //    }

        //    return Ok(mixProduct);
        //}

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateMixProduct([FromRoute] Guid id, testMixProduct updateMixProductRequest)
        {
            var mixProduct = await _fullstackDbContext.testMixProducts.FindAsync(id);

            if (mixProduct == null)
            {
                return NotFound();
            }

            mixProduct.Pid = updateMixProductRequest.Pid;
            mixProduct.brand = updateMixProductRequest.brand;
            mixProduct.gen = updateMixProductRequest.gen;
            mixProduct.description = updateMixProductRequest.description;
            mixProduct.type = updateMixProductRequest.type;
            mixProduct.status = updateMixProductRequest.status;
            mixProduct.amount = updateMixProductRequest.amount;
            mixProduct.price = updateMixProductRequest.price;
            mixProduct.discount = updateMixProductRequest.discount;
            mixProduct.image = updateMixProductRequest.image;


            await _fullstackDbContext.SaveChangesAsync();

            return Ok(mixProduct);

        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteMixProduct([FromRoute] Guid id)
        {
            var mixProduct = await _fullstackDbContext.testMixProducts.FindAsync(id);

            if (mixProduct == null)
            {
                return NotFound();
            }

            _fullstackDbContext.testMixProducts.Remove(mixProduct);
            await _fullstackDbContext.SaveChangesAsync();

            return Ok(mixProduct);
        }
    }
}
