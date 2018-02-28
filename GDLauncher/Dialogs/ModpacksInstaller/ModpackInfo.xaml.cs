using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using GDLauncher.Classes;
using GDLauncher.Models;
using MaterialDesignThemes.Wpf;

namespace GDLauncher.Dialogs.ModpacksInstaller
{
    /// <summary>
    /// Interaction logic for ModpackInfo.xaml
    /// </summary>
    public partial class ModpackInfo : UserControl
    {
        private int id;
        private BitmapImage image;
        public ModpackInfo(int id)
        {
            InitializeComponent();
            this.id = id;
            DialogHostExtensions.SetCloseOnClickAway(this, true);
            Width = 500;
            image = new BitmapImage();
            Height = Window1.singleton.Height - 100;
        }

        private async void UserControl_Loaded(object sender, RoutedEventArgs e)
        {
            var modpackData = await CurseApis.FetchModpackInfo(id);
            Loading.Visibility = Visibility.Collapsed;

            var wClient = new WebClient();
            wClient.DownloadDataCompleted += (ss, ee) =>
            {
                ImageLoading.Visibility = Visibility.Collapsed;
                ModpackIMG.Visibility = Visibility.Visible;
            };

            image.BeginInit();
            image.StreamSource = new MemoryStream(await wClient.DownloadDataTaskAsync(
                new Uri(modpackData.Attachments.Where((p) => p.IsDefault == true).FirstOrDefault().Url)
            ));
            image.EndInit();

            ModpackIMG.Source = image;
            ModpackName.Content = modpackData.Name;
            Summary.Text = modpackData.Summary;
            Authors.Content = modpackData.Authors.Aggregate("Authors: ",
                (str, s) => str += s.Name + ", ",
                str => str.Substring(0, str.Length - 2));
            modpackData.Categories.ForEach((s) =>
            {
                Categories.Children.Add(new Chip
                {
                    Content = s.Name,
                    Icon = s.Name.Substring(0, 1).ToUpper(),
                    Cursor = Cursors.Arrow,
                    Margin = new Thickness(10, 0, 0, 10),
                });
            });
            Downloads.Content = "Downloads: " + modpackData.DownloadCount.Substring(0, modpackData.DownloadCount.Length - 2);
            URL.MouseLeftButtonDown += (sss, eee) =>
            {
                System.Diagnostics.Process.Start(modpackData.webSiteURL);
            };
        }

        private void ScrollViewer_OnScrollChanged(object sender, ScrollChangedEventArgs e)
        {
            var verticalOffset = sv.VerticalOffset;
            var maxVerticalOffset = sv.ScrollableHeight; //sv.ExtentHeight - sv.ViewportHeight;
            if (maxVerticalOffset > 0 &&
                verticalOffset != maxVerticalOffset)
            {
                ModpackIMG.Margin = new Thickness(0, 20, 0, -verticalOffset);

            }

        }
        }
}
