using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using GDLauncher.Models;
using GDLauncher.Properties;
using Newtonsoft.Json;

namespace GDLauncher.Classes
{
    class CurseApis
    {
        public static string defaultURL = "https://cursemeta.dries007.net";

        public static async Task<List<ModpackVersions>> getVersions(int id)
        {
            var list = new List<ModpackVersions>();

            HttpClient client = new HttpClient();

            var response = await client.GetAsync(defaultURL + "/api/v2/direct/GetAllFilesForAddOn/" + id);

            var responseString = await response.Content.ReadAsStringAsync();

            dynamic x = JsonConvert.DeserializeObject(responseString);

            foreach (var y in x)
            {
                list.Add(new ModpackVersions
                {
                    Name = y.FileNameOnDisk,
                    URL = y.DownloadURL,
                    GameVersion = y.GameVersion[0]
                });
            }

            return list;
        }

        public static async Task<string> getDownloadURL(int projectId, int fileId)
        {
            var client = new WebClient();
            try
            {
                
                var response =
                    await client.DownloadStringTaskAsync(defaultURL + "/api/v2/direct/GetAddOnFile/" + projectId + "/" + fileId);
                dynamic x = JsonConvert.DeserializeObject(response);
                return x.downloadURL.ToString();
                /*if (x.dependencies != null || x.dependencies.Length != 0)
                {
                    foreach (var loc in x.dependencies)
                    {
                        list.AddRange(ResolveDependancies(loc.addOnId, x.gameVersion));
                    }
                }*/

            }
            catch (Exception e)
            {
                Console.WriteLine("Could not download " + defaultURL + "/api/addon/" + projectId +
                                  "/files/" + fileId + e.Message);
            }

            return null;
        }

        public static async Task<data> FetchModpackInfo(int id)
        {
            var list = new List<string>();
            var client = new WebClient();
            try
            {

                var response =
                    await client.DownloadStringTaskAsync(defaultURL + "/api/v2/direct/GetAddOn/" + id);
                data x = JsonConvert.DeserializeObject<data>(response);
                return x;

            }
            catch (Exception e)
            {
                Console.WriteLine("Error downloading modpack info");
            }

            return null;
        }

        public static async Task<List<string>> ResolveDependancies(int projectId, string[] versions)
        {
            var list = new List<string>();
            var client = new WebClient();
            try
            {
                var response =
                    await client.DownloadStringTaskAsync(defaultURL + "/api/addon/" + projectId + "/files");
                dynamic x = JsonConvert.DeserializeObject(response);
                foreach (var version in versions)
                {
                    var found = false;
                    foreach (var loc in x)
                    {
                        var pos = Array.FindIndex(loc, version);
                        if (pos != -1)
                        {
                            list.Add(loc[pos].downloadURL);
                            if (loc[pos].dependencies != null || loc[pos].dependencies.Length != 0)
                            {
                                foreach (var loc1 in loc[pos].dependencies)
                                {
                                    list.AddRange(ResolveDependancies(loc1, loc[pos].gameVersion));
                                }
                            }
                            found = true;
                            break;
                        }
                    }
                    if (found)
                        break;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Could not download " + defaultURL + "/api/addon/" + projectId +
                                  "/files");
            }

            return list;
        }
    }
}
