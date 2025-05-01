using System.Text;
using DatingApp.API.Data;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();


builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(
      builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAngularDevClient", policy =>
      policy
        .WithOrigins("http://localhost:4200")   // your Angular dev URL
        .AllowAnyHeader()
        .AllowAnyMethod()
  );
});

builder.Services.AddScoped<IAuthRepository, AuthRepository>();
var key = Encoding.ASCII.GetBytes(builder.Configuration["AppSettings:Token"]);
builder.Services
  .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(options =>
  {
      options.TokenValidationParameters = new TokenValidationParameters
      {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(key),
          ValidateIssuer = false,
          ValidateAudience = false
      };
  });

var app = builder.Build();

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";

        var error = context.Features.Get<IExceptionHandlerFeature>();
        if (error != null)
        {
            context.Response.AddApplicationError(error.Error.Message);
            await context.Response.WriteAsync(error.Error.Message);
        }
    });
});


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.MapOpenApi();
}



app.UseCors("AllowAngularDevClient");

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();


