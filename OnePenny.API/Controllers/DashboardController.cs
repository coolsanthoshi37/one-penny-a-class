using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using OnePenny.API.Data;
using OnePenny.API.DTOs;

namespace OnePenny.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{username}")]
    public IActionResult GetDashboard(string username)
    {

        var student = _context.Students
            .FirstOrDefault(x => x.FirstName == username);

        if (student == null)
        {
            return NotFound();
        }

        var enrollments = _context.StudentCourses
            .Include(x => x.Course)
            .Where(x => x.StudentId == student.Id)
            .Select(x => new CourseEnrollmentDto
            {
                CourseId = x.CourseId,
                CourseName = x.Course.Name,
                Quantity = x.Quantity,
                PriceAtPurchase = x.PriceAtPurchase,
                FinalPrice = x.FinalPriceAtPurchase   // 🔥 ADD THIS
            })
            .ToList();

        var dashboard = new StudentDashboardDto
        {
            Student = new StudentResponseDto
            {
                Id = student.Id,
                FirstName = student.FirstName,
                LastName = student.LastName,
                Age = student.Age,
                Grade = student.Grade
            },

            Courses = enrollments
        };

        return Ok(dashboard);
    }
}