using Entity;
using Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Bussines.Service.Impl
{
    public class GameServiceImpl : GameService
    {
        private GameRepository repository;

        public GameServiceImpl()
        {
            repository = new GameRepository();
        }

        public async Task<Game> CreateGame(string name)
        {
            await repository.addGame(name);

            return await GetGame(name);
        }

        public async Task<Game> GetGame(string name)
        {
            return await repository.getGame(name);
        }

        public async Task<List<PlayerByGame>> GetPlayersByGame(string gameName)
        {
            return await repository.GetPlayerByGame(gameName);
        }
    }
}
