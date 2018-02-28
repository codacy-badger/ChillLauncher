using System.Collections.Generic;

namespace GDLauncher.Models
{
    public class data
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public CategorySection CategorySection { get; set; }
        public Attachments[] Attachments { get; set; }
        public Authors[] Authors { get; set; }
        public string PrimaryCategoryAvatarUrl { get; set; }
        public string PrimaryCategoryName { get; set; }
        public List<Categories> Categories { get; set; }

        public string DownloadCount { get; set; }
        public int IsFeatured { get; set; }
        public double PopularityScore { get; set; }
        public string Summary { get; set; }
        public string webSiteURL { get; set; }
    }
}