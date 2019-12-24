using Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Repository
{
    public class GameRepository : SqlConnector
    {
        public async Task addGame(string name)
        {
            using (SqlConnection con = new SqlConnection(strConnection))
            {
                await con.OpenAsync();

                SqlCommand cmd = new SqlCommand("addGame", con);
                cmd.CommandType = CommandType.StoredProcedure;


                IDataParameter[] Parameters = new SqlParameter[1];
                Parameters[0] = new System.Data.SqlClient.SqlParameter("@name", name);

                cmd.Parameters.AddRange(Parameters);

                await cmd.ExecuteNonQueryAsync();
                con.Close();
            }
        }

        public async Task<List<PlayerByGame>> GetPlayerByGame(string name)
        {
            List<PlayerByGame> lPlayerByGame = null;

            using (SqlConnection con = new SqlConnection(strConnection))
            {
                try
                {
                    await con.OpenAsync();
                    SqlCommand cmd = new SqlCommand("[getPlayersByGame]", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    IDataParameter[] parameters = new SqlParameter[1];
                    parameters[0] = new SqlParameter("@name", name);
                    cmd.Parameters.AddRange(parameters);

                    SqlDataReader drd = await cmd.ExecuteReaderAsync();

                    if (drd != null)
                    {
                        lPlayerByGame = new List<PlayerByGame>();
                        while (await drd.ReadAsync())
                        {
                            if (drd.HasRows)
                            {
                                Player player = new Player(
                                    drd.GetGuid("player_id"),
                                    drd.GetString("player_name"),
                                    drd.GetString("player_lastname"),
                                    drd.GetString("player_alias")
                                    );

                                Game game = new Game(
                                    drd.GetGuid("game_id"),
                                    drd.GetString("game_name"),
                                    drd.GetDateTime("game_begin_date"),
                                    drd.GetDateTime("game_end_date")
                                     );

                                Guid id = drd.GetGuid("id");
                                double currentMoney = (double)drd.GetDecimal("current_money");

                                PlayerByGame playerByGame = new PlayerByGame(player, game, id, currentMoney);

                                lPlayerByGame.Add(playerByGame);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                     return null;
                }
            }

            return lPlayerByGame;
        }

        public async Task<Game> getGame(string name)
        {
            Game game = null;
            using (SqlConnection con = new SqlConnection(strConnection))
            {
                await con.OpenAsync();

                SqlCommand cmd = new SqlCommand("getGame", con);
                cmd.CommandType = CommandType.StoredProcedure;


                IDataParameter[] Parameters = new SqlParameter[1];
                Parameters[0] = new System.Data.SqlClient.SqlParameter("@name", name);

                cmd.Parameters.AddRange(Parameters);

                SqlDataReader drd = await cmd.ExecuteReaderAsync();

                if (drd != null)
                {
                    if (await drd.ReadAsync())
                    {
                        if (drd.HasRows)
                        {
                            game = new Game(
                                drd.GetGuid("id"),
                                drd.GetString("name"),
                                drd.GetDateTime("begin_date"),
                                 drd.GetDateTime("end_date")
                            );
                        }
                    }

                }

                con.Close();
            }

            return game;
        }

    }
}
