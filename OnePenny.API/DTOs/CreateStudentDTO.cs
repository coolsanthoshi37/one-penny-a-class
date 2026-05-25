using System.ComponentModel.DataAnnotations;

namespace OnePenny.API.DTOs;

public class CreateStudentDto
{
    [Required]
    [MaxLength(50)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string LastName { get; set; } = string.Empty;

    [Range(5, 100)]
    public int Age { get; set; }

    [Required]
    [MaxLength(5)]
    public string Grade { get; set; } = string.Empty;
}