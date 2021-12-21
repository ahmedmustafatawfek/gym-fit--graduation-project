using Gym.API.DAL;
using Gym.API.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gym.API.BL
{
    public class CategoryManager
    {
        GymContext context = new GymContext();
        public List<Category> GetCategories() 
        {
            return context.Categories.ToList();
        }

        public Category GetCategory(int id)
        {
            return context.Categories.FirstOrDefault(c => c.ID == id);
        }

        public Category GetCategoryByName(string name)
        {
            return context.Categories.FirstOrDefault(c => c.Name.ToLower() == name.ToLower());
        }

        public Category AddCategory(Category category)
        {
            category.CreatedAt = DateTime.Now;
            category.UpdatedAt = DateTime.Now;
            var cat = context.Add(category);
            context.SaveChanges();
            return cat.Entity ;
        }

        public bool UpdateCategory(Category category)
        {
            var cat = context.Categories.FirstOrDefault(c => c.ID == category.ID);
            cat.Name = category.Name;
            cat.Description = category.Description;
            cat.CreatedAt = category.CreatedAt;
            cat.UpdatedAt = DateTime.Now;
            cat.Deleted = category.Deleted;
            return context.SaveChanges() > 0 ? true : false;
        }

        public bool ToggleCategory(int id)
        {
            var cat = context.Categories.FirstOrDefault(c => c.ID == id);
            cat.Deleted = !cat.Deleted;
            return context.SaveChanges() > 0 ? true : false;
        }

    }
}
