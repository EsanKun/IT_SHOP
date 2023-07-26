using API.Data;
using API.model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class saleDetailController : ControllerBase
    {
        private readonly FullStackDbContext _fullstackDbContext;
        public saleDetailController(FullStackDbContext fullStackDbContext)
        {
            _fullstackDbContext = fullStackDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllsaleDetail()
        {
            var details = await _fullstackDbContext.saleDetails.ToListAsync();

            return Ok(details);
        }

        [HttpPost]
        public async Task<IActionResult> AddDetail([FromBody] salesDetail detailRequest)
        {
            detailRequest.SDid = Guid.NewGuid();

            // เพิ่มข้อมูลที่ส่งเข้ามาลงไปใน Table แต่ยังไม่ได้อัปเดตในดาต้าเบส
            await _fullstackDbContext.saleDetails.AddAsync(detailRequest);
            // บันทึกข้อมูลล่าสุดของ Table ในดาต้าเบส
            await _fullstackDbContext.SaveChangesAsync();

            return Ok(detailRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetDetail([FromRoute] Guid id)
        {
            var detail = await _fullstackDbContext.saleDetails.FirstOrDefaultAsync(x => x.SDid == id);

            if (detail == null)
            {
                return NotFound();
            }

            return Ok(detail);
        }

        [HttpGet]
        [Route("saleId/{saleId}")]
        public async Task<IActionResult> GetAllDtailbySaleId(string saleId)
        {
            var details = await _fullstackDbContext.saleDetails.Where(x => x.saleId == saleId).ToListAsync();
            if (details == null || details.Count == 0)
            {
                return NotFound();
            }
            return Ok(details);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateDetails([FromRoute] Guid id, salesDetail updateDetailsRequest)
        {
            var detail = await _fullstackDbContext.saleDetails.FindAsync(id);

            if (detail == null)
            {
                return NotFound();
            }

            detail.saleId = updateDetailsRequest.saleId;
            detail.proudctId = updateDetailsRequest.proudctId;
            detail.eachAmount = updateDetailsRequest.eachAmount;
            detail.totalPrice = updateDetailsRequest.totalPrice;



            await _fullstackDbContext.SaveChangesAsync();

            return Ok(detail);

        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteDetail([FromRoute] Guid id)
        {
            var detail = await _fullstackDbContext.saleDetails.FindAsync(id);

            if (detail == null)
            {
                return NotFound();
            }

            _fullstackDbContext.saleDetails.Remove(detail);
            await _fullstackDbContext.SaveChangesAsync();

            return Ok(detail);
        }
    }
}
