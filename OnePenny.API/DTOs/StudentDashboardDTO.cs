namespace OnePenny.API.DTOs;

public class StudentDashboardDto
{
    public StudentResponseDto Student { get; set; }

    public List<CourseEnrollmentDto> Courses { get; set; }
}