using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Player
    {
        public Player(Guid id, string name, string lastname, string alias)
        {
            Id = id;
            Name = name;
            Lastname = lastname;
            Alias = alias;
        }

        public Player(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; private set; }

        public string Name { get; private set; }

        public string Lastname { get; private set; }

        public string Alias { get; private set; }

    }
}
