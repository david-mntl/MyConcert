
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace MyConcert.Controllers
{
    public class FuncsController : ApiController
    {
        string _dbConectionString = "Server=myconcert.database.windows.net;"   //conectionString;
            + "Database=DBMyConcert; User Id=myconcertroot; Password=!15C24D9D";
        /********************************************************        
     *                  POST Add Members to Band
     ********************************************************/
        [HttpPost]
        [Route("api/Funcs/AddMemberToBand")]
        public string addMemberToBand([FromBody] dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                conn.ConnectionString = _dbConectionString; //conectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spAddMemberToBand";
                    SqlCommand command = new SqlCommand(); // DB Call. dbQuery, conn

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@pBandID", (string)pJson.ID);
                    command.Parameters.AddWithValue("@pMember", (string)pJson.Member);

                    var details = new Dictionary<string, object>();

                    // Create new SqlDataReader object and read data from the command.
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.HasRows && reader.Read())
                        {
                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                details.Add(reader.GetName(i), reader.IsDBNull(i) ? null : reader.GetValue(i));
                            }
                        }

                        JavaScriptSerializer jss = new JavaScriptSerializer();
                        string jsonDoc = jss.Serialize(details);
                        return jsonDoc;
                    }
                }
                catch (Exception e)
                {
                    return e.Message;
                }
            }
        }

        /********************************************************        
        *                  POST Add Genre to Band
         ********************************************************/
        [HttpPost]
        [Route("api/Funcs/AddGenreToBand")]
        public string addGenreToBand([FromBody] dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                conn.ConnectionString = _dbConectionString; //conectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spAddGenreToBand";
                    SqlCommand command = new SqlCommand(); // DB Call. dbQuery, conn

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@pBandID", (string)pJson.ID);
                    command.Parameters.AddWithValue("@pGenre", (string)pJson.Genre);

                    var details = new Dictionary<string, object>();

                    // Create new SqlDataReader object and read data from the command.
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.HasRows && reader.Read())
                        {
                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                details.Add(reader.GetName(i), reader.IsDBNull(i) ? null : reader.GetValue(i));
                            }
                        }

                        JavaScriptSerializer jss = new JavaScriptSerializer();
                        string jsonDoc = jss.Serialize(details);
                        return jsonDoc;
                    }
                }
                catch (Exception e)
                {
                    return e.Message;
                }
            }
        }

        /********************************************************        
         *                  POST Add Song to Band
        ********************************************************/
        [HttpPost]
        [Route("api/Funcs/AddSongToBand")]
        public string addSongToBand([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                conn.ConnectionString = _dbConectionString; //conectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spAddSongToBand";
                    SqlCommand command = new SqlCommand(); // DB Call. dbQuery, conn

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@pBandID", (string)pJson.ID);
                    command.Parameters.AddWithValue("@pSong", (string)pJson.Song);

                    var details = new Dictionary<string, object>();

                    // Create new SqlDataReader object and read data from the command.
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.HasRows && reader.Read())
                        {
                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                details.Add(reader.GetName(i), reader.IsDBNull(i) ? null : reader.GetValue(i));
                            }
                        }
                        JavaScriptSerializer jss = new JavaScriptSerializer();
                        string jsonDoc = jss.Serialize(details);
                        return jsonDoc;
                    }
                }
                catch (Exception e)
                {
                    return e.Message;
                }
            }
        }





















    }
}
