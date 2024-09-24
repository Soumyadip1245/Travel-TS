using BackendApi.Utils;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost5173",
    builder =>
    {
        builder.WithOrigins("http://localhost:5173") 
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// Configure EmailSender
builder.Services.AddTransient<IEmailSender, EmailSender>();

// Add controllers
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure the database context with MySQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 25))));

// Configure HTTP client and health checks
builder.Services.AddHttpClient();
builder.Services.AddHealthChecks();

// Add environment variables to the configuration
builder.Configuration.AddEnvironmentVariables();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseCors("AllowLocalhost5173"); // Ensure this matches the policy you defined
app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/health");
app.Run();
