using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnePenny.API.Data;
using OnePenny.API.DTOs;
using OnePenny.API.Models;

namespace OnePenny.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EnrollmentController : ControllerBase
{
    private readonly AppDbContext _context;

    public EnrollmentController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Enroll(EnrollmentRequestDto request)
    {
        var student = await _context.Students
    .FirstOrDefaultAsync(
        s => s.FirstName == request.Username
    );

        if (student == null)
            return NotFound("Student not found");

        foreach (var course in request.Courses)
        {
            var finalPrice = course.FinalPrice ?? course.PriceAtPurchase;
            var enrollment = new StudentCourse
            {
                StudentId = student.Id,
                CourseId = course.CourseId,
                Quantity = course.Quantity,
                PriceAtPurchase = course.PriceAtPurchase,                
                FinalPriceAtPurchase = finalPrice,
                EnrolledAt = DateTime.UtcNow
            };

            _context.StudentCourses.Add(enrollment);
        }

        await _context.SaveChangesAsync();

        return Ok(new { message = "Enrollment successful" });
    }
}