using Gym.API.DAL;
using Gym.API.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gym.API.BL
{
    public class ProgramManager
    {
        GymContext context = new GymContext();

        public List<Nutrition_Program> GetPrograms()
        {
            return context.Nutrition_Programs.ToList();
        }

        public Nutrition_Program GetProgram(int id)
        {
            return context.Nutrition_Programs.FirstOrDefault(p => p.ID == id);
        }

        public Nutrition_Program AddProgram(Nutrition_Program program)
        {
            program.CreatedAt = DateTime.Now;
            program.UpdatedAt = DateTime.Now;
            var pro = context.Nutrition_Programs.Add(program);
            var save = context.SaveChanges();

            return save > 0 ? pro.Entity : null;
        }

        public bool UpdateProgram(Nutrition_Program program)
        {
            var dbProgram = context.Nutrition_Programs.FirstOrDefault(p => p.ID == program.ID);
            dbProgram.MealDescription = program.MealDescription;
            dbProgram.Name = program.Name;
            dbProgram.ExcercisesCount = program.ExcercisesCount;
            dbProgram.Calories = program.Calories;
            dbProgram.CreatedBy = program.CreatedBy;
            dbProgram.UpdatedAt = DateTime.Now;
            var save = context.SaveChanges();
            return save > 0 ? true : false;
        }

        public bool ToggleProgram(int id)
        {
            var pro = context.Nutrition_Programs.FirstOrDefault(p => p.ID == id);
            pro.Deleted = !pro.Deleted;
            var save = context.SaveChanges();

            return save > 0 ? true : false;
        }
    }
}
