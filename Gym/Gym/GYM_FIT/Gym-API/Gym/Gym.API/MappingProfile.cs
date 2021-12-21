using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Gym.API.DAL.Models;
using Gym.API.DTOs;

namespace Gym.API
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Category, CreateCategoryDto>();
            CreateMap<CreateCategoryDto, Category>();
            CreateMap<Category, CategoryViewDto>();
            CreateMap<CategoryViewDto, Category>();

            CreateMap<Product, ProductViewDto>();
            CreateMap<ProductViewDto, Product>();

            CreateMap<Product, ProductCreateDto>();
            CreateMap<ProductCreateDto, Product>();

            CreateMap<User, UserLoginDto>();
            CreateMap<UserLoginDto, User>();

            CreateMap<User, UserRegisterDto>();
            CreateMap<UserRegisterDto, User>();

            CreateMap<DAL.Models.Gym, GymCreateDto>();
            CreateMap<GymCreateDto, DAL.Models.Gym>();

            CreateMap<Nutrition_Program, ProgramCreateDto>();
            CreateMap<ProgramCreateDto, Nutrition_Program>();

            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
            
        }
    }
}
