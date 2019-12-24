using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Monopoly.App_Start.Startup))]
namespace Monopoly.App_Start
{
    public class Startup
    {

        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}