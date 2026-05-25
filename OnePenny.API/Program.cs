using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;



using OnePenny.API.Data;
using OnePenny.API.Middleware;
using OnePenny.API.Models;
using OnePenny.API.Services;
using Serilog;
using System.Text;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File(
        "Logs/log-.txt",
        rollingInterval: RollingInterval.Day)
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog();

// Add services to the container
builder.Services.AddControllers();

// Swagger / OpenAPI (Swashbuckle)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

   

//Health Checks
builder.Services.AddHealthChecks();


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy
                .AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins("http://localhost:5173");
        });
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])
        )
    };
});
builder.Services.AddAuthorization();


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (!context.Courses.Any())
    {
        context.Courses.AddRange(
            new Course { Name = "Algebra 1 - monthly", Price = 500 },
            new Course { Name = "Algebra 2 - monthly", Price = 500 },
            new Course { Name = "AP Pre-Calculus - monthly", Price = 600 },
            new Course { Name = "Honors Pre-Calculus - monthly", Price = 500 },
            new Course { Name = "AP Calculus AB - monthly", Price = 600 },
            new Course { Name = "AP Calculus BC - monthly", Price = 500 },
            new Course { Name = "SAT Prep - monthly", Price = 350 },
            new Course { Name = "SAT Practice Test Sessions (12)", Price = 3000 },
            new Course { Name = "Summer Workshop - Algebra", Price = 750 },
            new Course { Name = "Summer Workshop - Geometry", Price = 750 },
            new Course { Name = "Summer Workshop - SAT", Price = 750 },
            new Course { Name = "Summer Workshop - AP Prep", Price = 750 },
            new Course { Name = "Individual Tutoring", Price = 120 },
            new Course { Name = "Geometry - monthly", Price = 500 }
        );

        context.SaveChanges();
    }
}
app.UseCors("AllowReactApp");

app.UseSerilogRequestLogging();

// Configure HTTP pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<ExceptionMiddleware>();



app.MapControllers();

app.MapHealthChecks("/health");

app.Run();