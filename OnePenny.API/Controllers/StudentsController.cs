using Microsoft.AspNetCore.Mvc;
using OnePenny.API.DTOs;
using OnePenny.API.Services;

namespace OnePenny.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly IStudentService _studentService;

    public StudentsController(IStudentService studentService)
    {
        _studentService = studentService;
    }

    // 👑 ADMIN: Get ALL students
    [HttpGet]
    public IActionResult GetAll([FromQuery] string? username)
    {
        if (!string.IsNullOrEmpty(username) &&
       (username.Equals("admin", StringComparison.OrdinalIgnoreCase)))
        {
            var students = _studentService.GetAllStudents();
            return Ok(students);
        }

        if (!string.IsNullOrEmpty(username))
        {
            var student = _studentService.GetStudentByUsername(username);

            if (student == null)
                return NotFound();

            return Ok(student);
        }

        // fallback (optional safety)
        return Ok(_studentService.GetAllStudents());
    }

    [HttpGet("me")]
    public IActionResult GetMyStudent([FromQuery] string username)
    {
        var student = _studentService.GetStudentByUsername(username);

        if (student == null)
            return NotFound();

        return Ok(student);
    }


    [HttpPost]
    public IActionResult Create(CreateStudentDto dto)
    {
        var created = _studentService.AddStudent(dto);

        return Ok(created);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, UpdateStudentDto dto)
    {
        var updated = _studentService.UpdateStudent(id, dto);

        if (updated == null)
            return NotFound();

        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var success = _studentService.DeleteStudent(id);

        if (!success)
            return NotFound();

        return NoContent();
    }
}