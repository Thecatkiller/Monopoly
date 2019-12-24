using System;

namespace Entity
{
    public class Game
    {
        public Game(Guid id, string name, DateTime beginDate, DateTime endDate)
        {
            Id = id;
            Name = name;
            BeginDate = beginDate;
            EndDate = endDate;
        }

        public Game(Guid id)
        {
            Id = id;
        }
        public Guid Id { get; private set; }

        public string Name { get; private set; }

        public DateTime BeginDate { get; private set; }

        public DateTime EndDate { get; private set; }
    }
}
