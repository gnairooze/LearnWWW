using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LearnAPI.Helpers
{
    public class Config
    {
        public static List<string> AllowedOrigins { get; private set; }

        public static void Load(IConfiguration Configuration)
        {
            AllowedOrigins = Configuration.GetSection("allowedOrigins").GetChildren().Select(o => o.Value).ToList();
        }

    }
}
