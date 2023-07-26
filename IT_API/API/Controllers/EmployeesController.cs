using API.Data;
using API.model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly FullStackDbContext _fullstackDbContext;
        public EmployeesController(FullStackDbContext fullStackDbContext) 
        { 
            _fullstackDbContext = fullStackDbContext;
        }

        [HttpGet]
        public async Task <IActionResult> GetAllEmployees() 
        {
            var employees = await _fullstackDbContext.Employees.ToListAsync();
            
            return Ok(employees);
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] Employee employeeObj)
        {
            if (employeeObj == null)
            {
                return BadRequest();
            }

            if (employeeObj.userName == "owner" && employeeObj.password == "own123")
            {
                return Ok(new { Message = "Owner" });
            }


            var employee = await _fullstackDbContext.Employees
                .FirstOrDefaultAsync(x => x.userName == employeeObj.userName && x.password == employeeObj.password);
            if(employee == null) 
                return NotFound(new {Message = "Employee Not Found!"});

            return Ok(employee);

        }

        private string CreateJwt(Employee employee)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysecret....");
            var identity = new ClaimsIdentity(new Claim[] { 
                new Claim(ClaimTypes.Role, employee.role.ToString()),
                new Claim(ClaimTypes.Name,$"{employee.Name}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var TokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(TokenDescriptor);
            return jwtTokenHandler.WriteToken(token); 
        }

        [HttpPost]
        public async Task <IActionResult> AddEmployee([FromBody] Employee employeeRequest)
        {
            employeeRequest.Eid = Guid.NewGuid();

            // เพิ่มข้อมูลที่ส่งเข้ามาลงไปใน Table แต่ยังไม่ได้อัปเดตในดาต้าเบส
            await _fullstackDbContext.Employees.AddAsync(employeeRequest);
            // บันทึกข้อมูลล่าสุดของ Table ในดาต้าเบส
            await _fullstackDbContext.SaveChangesAsync();

            return Ok(employeeRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetEmployee([FromRoute]Guid id) 
        {
            var employee = await _fullstackDbContext.Employees.FirstOrDefaultAsync(x => x.Eid == id);

            if(employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> SearchEmployees(string input)
        {
            var employees = await _fullstackDbContext.Employees
                .Where(p => p.Name.Contains(input) || p.telPhone.Contains(input) || p.Email.Contains(input) || p.Address.Contains(input))
                .ToListAsync();

            if (employees == null || employees.Count == 0)
            {
                return NotFound();
            }

            return Ok(employees);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] Guid id, Employee updateEmployeeRequest)
        {
            var employee = await _fullstackDbContext.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            employee.Name       = updateEmployeeRequest.Name;
            employee.Email      = updateEmployeeRequest.Email;
            employee.telPhone   = updateEmployeeRequest.telPhone;
            employee.Address    = updateEmployeeRequest.Address;
            employee.role       = updateEmployeeRequest.role;
            employee.userName = updateEmployeeRequest.userName;
            employee.password = updateEmployeeRequest.password;

            await _fullstackDbContext.SaveChangesAsync();

            return Ok(employee);

        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id)
        {
            var employee = await _fullstackDbContext.Employees.FindAsync(id);

            if(employee == null)
            {
                return NotFound();
            }

            _fullstackDbContext.Employees.Remove(employee);
            await _fullstackDbContext.SaveChangesAsync(); 

            return Ok(employee);
        }

    }
}
