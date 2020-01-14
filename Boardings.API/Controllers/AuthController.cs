using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Boardings.API.Data;
using Boardings.API.Dtos;
using Boardings.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Boardings.API.Controllers{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase{
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }

        [HttpPost("register")]
        public async Task <IActionResult> Register (UserForRegisterDto userForRegisterDto){
            if(!ModelState.IsValid)
            return BadRequest(ModelState);
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if(await _repo.UserExists(userForRegisterDto.Username))
            return BadRequest("Username Already exist!");

            var userToCreate = new User{
              Username =userForRegisterDto.Username
            };
            var CreatedUser = await _repo.Register(userToCreate, userForRegisterDto.Password);
            return StatusCode(201);
        }
        [HttpPost("login")]


        public async Task <IActionResult> Login (UserForLoginDto userForLoginDto){
            var userFromRepo = await _repo.Login(userForLoginDto.Username, userForLoginDto.Password);
            if(userFromRepo == null)
            return Unauthorized();

            var claims = new []
            {
                    new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                    new Claim(ClaimTypes.Name, userFromRepo.Username)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                Expires= DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });
            
        }
    }
}