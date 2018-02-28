using System.Collections.Generic;
using GDLauncher.Models;

namespace GDLauncher.Models
{
    public class Minecraft
    {
        public List<ModLoader> modLoaders { get; set; }
        public string version { get; set; }
    }
}