using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Gym.API.DAL.Models;
using Gym.API.DTOs;
using Gym.API.BL;
using Microsoft.Extensions.Configuration;
using AutoMapper;

namespace Gym.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        AuthManager authManager = new AuthManager();

        public AccountController(IMapper mapper, IConfiguration config)
        {
            _mapper = mapper;
            _config = config;
        }

        [HttpPost("Register")]
        public IActionResult Register(UserRegisterDto register)
        {
            var user = _mapper.Map<User>(register);
            var regUser = authManager.Register(user, register.Password);
            register = _mapper.Map<UserRegisterDto>(regUser);
            return Ok(register);
        }

        [HttpPost("Login")]
        public IActionResult Login(UserLoginDto login)
        {
            var user = authManager.AuthenticateUser(login);
            if (user == null)
                return StatusCode(401, new { Message = "Invalid Email or Password" });
            var key = _config.GetSection("Jwt:Key").Value;
            var token = authManager.GenerateJSONWebToken(user, key);
            
            var ExpirationDate = DateTime.Now.AddMinutes(360);
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(new
            {
                User = userDto,
                Token = token,
                ExpiresIn = ExpirationDate.ToUniversalTime(),
            });
        }

        
    }
}
