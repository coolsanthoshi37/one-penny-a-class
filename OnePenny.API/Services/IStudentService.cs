using OnePenny.API.DTOs;
using OnePenny.API.Models;

namespace OnePenny.API.Services;

public interface IStudentService
{
    List<StudentResponseDto> GetAllStudents();

    StudentResponseDto AddStudent(CreateStudentDto studentDto);

    StudentResponseDto? GetStudentById(int id);

    bool DeleteStudent(int id);

    StudentResponseDto? UpdateStudent(int id, UpdateStudentDto dto);

    List<StudentResponseDto> GetStudentByUsername(string username);
}