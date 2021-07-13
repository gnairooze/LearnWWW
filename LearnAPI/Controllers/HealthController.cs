using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Dynamic;

namespace LearnAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthController : Controller
    {
        [HttpGet]
        public Dictionary<string, List<string>> Index()
        {
            var data = new Dictionary<string, List<string>>();

            data.Add("AllowedOrigins", Helpers.Config.AllowedOrigins);

            return data; 
        }
    }
}
