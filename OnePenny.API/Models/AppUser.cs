namespace OnePenny.API.Models;

public class AppUser
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string Role { get; set; } // Admin / Student
}