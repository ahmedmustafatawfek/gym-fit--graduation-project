using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gym.API.DAL;

namespace Gym.API.BL
{
    public class GymManager
    {
        GymContext context = new GymContext();
        public List<DAL.Models.Gym> GetGyms()
        {
            return context.Gyms.ToList();
        }

        public DAL.Models.Gym GetGym(int id)
        {
            return context.Gyms.FirstOrDefault(g => g.ID == id);
        }

        public DAL.Models.Gym AddGym(DAL.Models.Gym gym)
        {
            gym.CreatedAt = DateTime.Now;
            gym.UpdatedAt = DateTime.Now;
            var addedGym = context.Gyms.Add(gym);
            context.SaveChanges();
            return addedGym.Entity;
        }

        public bool UpdateGym(DAL.Models.Gym gym)
        {
            var dbGym = context.Gyms.FirstOrDefault(g => g.ID == gym.ID);
            dbGym.Latitude = gym.Latitude;
            dbGym.Longitude = gym.Longitude;
            dbGym.Mobile = gym.Mobile;
            dbGym.Name = gym.Name;
            dbGym.UpdatedAt = DateTime.Now;
            dbGym.Address = gym.Address;
            var save = context.SaveChanges();

            return save > 0 ? true : false;
        }

        public bool ToggleGym(int id)
        {
            var gym = context.Gyms.FirstOrDefault(g => g.ID == id);
            gym.Deleted = !gym.Deleted;
            return context.SaveChanges() > 0 ? true : false;
        }
    }
}
