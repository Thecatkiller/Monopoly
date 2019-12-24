using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class PlayerByGame
    {
        public PlayerByGame(Player player, Game game, Guid id, double currentMoney)
        {
            Player = player;
            Game = game;
            Id = id;
            CurrentMoney = currentMoney;
        }

        public Player Player { get; private set; }

        public Game Game { get; private set; }

        public Guid Id { get; private set; }

        public double CurrentMoney { get; private set; }

    }
}
