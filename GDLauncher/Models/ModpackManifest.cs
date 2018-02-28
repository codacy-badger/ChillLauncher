using System.Collections.Generic;

namespace GDLauncher.Models
{
    public class ModpackManifest
    {
        public string author { get; set; }
        public List<Fileino> files { get; set; }
        public string manifestType { get; set; }
        public int manifestVersion { get; set; }
        public Minecraft minecraft { get; set; }
        public string name { get; set; }
        public string overrides { get; set; }
        public int projectID { get; set; }
        public string version { get; set; }
    }
}