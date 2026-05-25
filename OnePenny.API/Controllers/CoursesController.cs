using Microsoft.AspNetCore.Mvc;
using OnePenny.API.Data;
using Microsoft.EntityFrameworkCore;

namespace OnePenny.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CoursesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CoursesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetCourses()
    {
        var courses = await _context.Courses.ToListAsync();
        return Ok(courses);
    }
}