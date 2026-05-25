namespace OnePenny.API.DTOs;

public class StudentResponseDto
{
    public int Id { get; set; }

    public string? FirstName { get; set; } = string.Empty;

    public string? LastName { get; set; } = string.Empty;

    public int Age { get; set; }

    public string? Grade { get; set; } = string.Empty;

    public List<CourseEnrollmentDto> Courses { get; set; } = new();
}