using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Parameter
    {
        public Parameter(string key, string value, string description)
        {
            Key = key;
            Value = value;
            Description = description;
        }

        public Guid Id { get; private set; }

        public string Key { get; private set; }

        public string Value { get; private set; }

        public string Description { get; private set; }
    }
}
