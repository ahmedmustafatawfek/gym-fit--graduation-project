using Gym.API.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Gym.API.DAL.Models;
using Gym.API.DTOs;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace Gym.API.BL
{
    public class AuthManager
    {
        GymContext context = new GymContext();
        public User Register(User user, string password)
        {
            byte[] passwordSalt;
            user.PasswordHash = HashPassword(password,out passwordSalt);
            user.PasswordSalt = passwordSalt;
            user.Active = true;
            var cust = context.Users.Add(user);
            context.SaveChanges();
            return cust.Entity;
        }

        public byte[] HashPassword(string password,out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return passwordHash;
            }
        }
        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                        return false;
                }
                return true;
            }
        }

        public User AuthenticateUser(UserLoginDto login)
        {
            var user = context.Users.Where(u => u.Email == login.Email).Include(s => s.Role).FirstOrDefault();
            if (user == null)
                return null;

            var verified = VerifyPasswordHash(login.Password, user.PasswordHash, user.PasswordSalt);
            if (!verified)
                return null;
            return user;
        }

        public string GenerateJSONWebToken(User user, string JwtKey)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()),
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Role, user.Role.RoleName)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(120),
                SigningCredentials = credentials
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var encodeToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(encodeToken);
            return token;
        }
    }
}
