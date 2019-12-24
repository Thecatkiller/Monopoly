using Entity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Bussines.Service
{
    public interface GameService
    {
        Task<Game> CreateGame(string name);
        Task<Game> GetGame(string name);

        Task<List<PlayerByGame>> GetPlayersByGame(string gameName);
    }
}
