using Microsoft.AspNetCore.Mvc;
using OnePenny.API.Models;
using OnePenny.API.Services;
using OnePenny.API.DTOs;


namespace OnePenny.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            bool isAdmin = dto.Username == "admin" && dto.Password == "123";

            var response = new LoginResponseDto
            {
                Username = dto.Username,
                Role = isAdmin ? "Admin" : "Student"
            };

            return Ok(response);
        }
    }
}