using System.Net;
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
builder.Services.AddScoped<IDatingRepository, DatingRepository>();

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
builder.Services.AddAutoMapper(typeof(DatingRepository).Assembly);

var app = builder.Build();


using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<DataContext>();
        // Apply any pending migrations
        context.Database.Migrate();

        // Run your seeding logic
        Seed.SeedUsers(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred during migration/seeding");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.MapOpenApi();
}
else
{
  app.UseExceptionHandler(errorApp =>
  {
    errorApp.Run(async context =>
    {
      context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
      context.Response.ContentType = "application/json";

      var error = context.Features.Get<IExceptionHandlerFeature>();
      if (error != null)
      {
        context.Response.AddApplicationError(error.Error.Message);
        await context.Response.WriteAsync(error.Error.Message);
      }
    });
  });
}



app.UseCors("AllowAngularDevClient");

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();


