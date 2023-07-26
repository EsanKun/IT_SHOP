using API.Data;
using API.model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApproveController : ControllerBase
    {
        private readonly FullStackDbContext _fullstackDbContext;
        public ApproveController(FullStackDbContext fullStackDbContext)
        {
            _fullstackDbContext = fullStackDbContext;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAllApprove()
        {
            var approve = await _fullstackDbContext.Approves.ToListAsync();

            return Ok(approve);
        }

        [HttpPost]
        public async Task<IActionResult> AddApprove([FromBody] onApprove approveRequest)
        {
            approveRequest.Id = Guid.NewGuid();

            // เพิ่มข้อมูลที่ส่งเข้ามาลงไปใน Table แต่ยังไม่ได้อัปเดตในดาต้าเบส
            await _fullstackDbContext.Approves.AddAsync(approveRequest);
            // บันทึกข้อมูลล่าสุดของ Table ในดาต้าเบส
            await _fullstackDbContext.SaveChangesAsync();

            return Ok(approveRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetApprove([FromRoute] Guid id)
        {
            var approve = await _fullstackDbContext.Approves.FirstOrDefaultAsync(x => x.Id == id);

            if (approve == null)
            {
                return NotFound();
            }

            return Ok(approve);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateApprove([FromRoute] Guid id, onApprove updateApproveRequest)
        {
            var approve = await _fullstackDbContext.Approves.FindAsync(id);

            if (approve == null)
            {
                return NotFound();
            }

            approve.Pid1 = updateApproveRequest.Pid1;
            approve.Pid2 = updateApproveRequest.Pid2;
            approve.brand = updateApproveRequest.brand;
            approve.gen = updateApproveRequest.gen;
            approve.description = updateApproveRequest.description;
            approve.amount = updateApproveRequest.amount;
            approve.price = updateApproveRequest.price;
            approve.discount = updateApproveRequest.discount;
            approve.image = updateApproveRequest.image;


            await _fullstackDbContext.SaveChangesAsync();

            return Ok(approve);

        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteApprove([FromRoute] Guid id)
        {
            var approve = await _fullstackDbContext.Approves.FindAsync(id);

            if (approve == null)
            {
                return NotFound();
            }

            _fullstackDbContext.Approves.Remove(approve);
            await _fullstackDbContext.SaveChangesAsync();

            return Ok(approve);
        }

    }
}
