using System.Configuration;

namespace Repository
{
    public class SqlConnector
    {
        protected static readonly string strConnection;

        static SqlConnector()
        {          
            strConnection = ConfigurationManager.ConnectionStrings["dbMonopoly"].ConnectionString;
        }

    }
}
