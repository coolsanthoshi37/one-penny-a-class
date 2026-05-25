using OnePenny.API.Data;
using OnePenny.API.DTOs;
using OnePenny.API.Models;

namespace OnePenny.API.Services;

public class StudentService : IStudentService
{
    private readonly AppDbContext _context;

    private readonly ILogger<StudentService> _logger;

    private readonly IStudentService _studentService;

    public StudentService(
    AppDbContext context,
    ILogger<StudentService> logger)
    {
        _context = context;
        _logger = logger;
    }
    public List<StudentResponseDto> GetAllStudents()
    {
        return _context.Students
            .Select(student => new StudentResponseDto
            {
                Id = student.Id,
                FirstName = student.FirstName,
                LastName = student.LastName,
                Age = student.Age,
                Grade = student.Grade
            })
            .ToList();
    }

    public List<StudentResponseDto> GetStudentByUsername(string username)
    {
        return _context.Students
            .Where(x => x.FirstName == username)
            .Select(x => new StudentResponseDto
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Age = x.Age,
                Grade = x.Grade
            })
            .ToList();
    }

    public StudentResponseDto AddStudent(CreateStudentDto studentDto)
    {
        var student = new Student
        {
            FirstName = studentDto.FirstName,
            LastName = studentDto.LastName,
            Age = studentDto.Age,
            Grade = studentDto.Grade
        };

        _context.Students.Add(student);
        _context.SaveChanges();
        _logger.LogInformation(
    "Student created successfully with Id {StudentId}",
    student.Id);

        return new StudentResponseDto
        {
            Id = student.Id,
            FirstName = student.FirstName,
            LastName = student.LastName,
            Age = student.Age,
            Grade = student.Grade
        };
    }

    public StudentResponseDto? GetStudentById(int id)
    {
        var student = _context.Students.FirstOrDefault(s => s.Id == id);

        if (student == null)
        {
            return null;
        }

        return new StudentResponseDto
        {
            Id = student.Id,
            FirstName = student.FirstName,
            LastName = student.LastName,
            Age = student.Age,
            Grade = student.Grade
        };
    }

    public bool DeleteStudent(int id)
    {
        var student = _context.Students.FirstOrDefault(s => s.Id == id);

        if (student == null)
        {
            return false;
        }

        _context.Students.Remove(student);
        _context.SaveChanges();

        return true;
    }

    public StudentResponseDto? UpdateStudent(int id, UpdateStudentDto dto)
    {
        var student = _context.Students.FirstOrDefault(s => s.Id == id);

        if (student == null)
        {
            return null;
        }

        int temp = student.Age;

        student.FirstName = dto.FirstName ?? student.FirstName;
        student.LastName = dto.LastName ?? student.LastName;
        student.Age = ((int)dto.Age!=null) ? (int)dto.Age: temp;
        student.Grade = dto.Grade ?? student.Grade;

        _context.SaveChanges();

        return new StudentResponseDto
        {
            Id = student.Id,
            FirstName = student.FirstName,
            LastName = student.LastName,
            Age = student.Age,
            Grade = student.Grade
        };
    }
}