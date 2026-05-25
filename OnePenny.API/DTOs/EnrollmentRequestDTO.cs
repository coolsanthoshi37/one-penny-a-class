namespace OnePenny.API.DTOs
{
    public class EnrollmentRequestDto
    {
        // to be changed after auth becomes based on id :public int StudentId { get; set; }

        public string Username { get; set; } = string.Empty;
        public List<CourseEnrollmentDto> Courses { get; set; } = new();
    }
}