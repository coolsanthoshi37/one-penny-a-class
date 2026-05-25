using System.ComponentModel.DataAnnotations;

public class UpdateStudentDto
{
    
    public string? FirstName { get; set; }

 
    public string? LastName { get; set; }

   
    public int Age { get; set; }

    public string? Grade { get; set; }
}