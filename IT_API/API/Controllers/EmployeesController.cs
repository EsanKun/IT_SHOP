﻿using API.Data;
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
        private readonly IConfiguration _configuration;
        private static Employee emp = new Employee();
        public EmployeesController(FullStackDbContext fullStackDbContext, IConfiguration configuration) 
        { 
            _fullstackDbContext = fullStackDbContext;
            _configuration = configuration;
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
            if (employee == null)
                return NotFound(new { Message = "Employee Not Found!" });

            return Ok(employee);

            //if(employeeObj == null)
            //{
            //    return BadRequest();
            //}

            //if(!BCrypt.Net.BCrypt.Verify(employeeObj.password, emp.password))
            //{
            //    return BadRequest("Wrong Password");
            //}
            //var employee = await _fullstackDbContext.Employees
            //        .FirstOrDefaultAsync(x => x.userName == employeeObj.userName && x.password == employeeObj.password);

            //string _token = CreateToken(employee);

            //employee.token = _token;

            //return Ok(employee);

        }

        private string CreateToken(Employee employee)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, employee.userName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
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

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(employeeRequest.password);

            employeeRequest.password = passwordHash;

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
