using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gym.API.DAL.Models
{
    public class OrderDetail
    {
        public int ID { get; set; }
        public int OrderID { get; set; }
        public int ProductID { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }

        [ForeignKey(nameof(OrderID))]
        public Order Order { get; set; }
        [ForeignKey(nameof(ProductID))]
        public Product Product { get; set; }

    }
}
