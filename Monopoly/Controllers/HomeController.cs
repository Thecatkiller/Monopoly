using Bussines.Service;
using Bussines.Service.Impl;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Monopoly.Controllers
{
    public class HomeController : Controller
    {


        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<string> GetPlayers(string gameName)
        {
            GameService service = new GameServiceImpl();
            var result = await service.GetPlayersByGame(gameName);

            return JsonConvert.SerializeObject(result);
        }

        public async Task<ActionResult> Bank(string gameName)
        {
            GameService service = new GameServiceImpl();

            return View(await service.GetPlayersByGame(gameName));
        }
    }
}