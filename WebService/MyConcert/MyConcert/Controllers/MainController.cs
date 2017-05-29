using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Collections;

namespace MyConcert.Controllers
{
    public class MainController : ApiController
    {
        //ConectionString.
        string _dbConectionString = "Server=myconcert.database.windows.net;"   
            + "Database=DBMyConcert; User Id=myconcertroot; Password=!15C24D9D";
       /********************************************************        
       *                  GET In General without specific parameters
       ********************************************************/
        [HttpGet]
        [Route("api/Main/GET/{pMethod}")]
        public string get(string pMethod)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                conn.ConnectionString = _dbConectionString; //conectionString;
                try
                {
                    conn.Open();
                    string dbQuery = pMethod;
                    SqlCommand command = new SqlCommand(); // DB Call. dbQuery, conn

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//                                                              

                    var details = new Dictionary<string, object>();
                    ArrayList data = new ArrayList();
                    

                    // Create new SqlDataReader object and read data from the command.
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        
                        while (reader.HasRows && reader.Read())
                        {
                            var details2 = new Dictionary<string, object>();
                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                details2.Add(reader.GetName(i), reader.IsDBNull(i) ? null : reader.GetValue(i));                                
                            }
                            data.Add(details2);                                                
                        }
                        details.Add(pMethod, data);
                                               
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
      *                  GET In General without specific parameters
      ********************************************************/
        [HttpGet]
        [Route("api/Main/GET/{pMethod}/{pId}")]
        public string getWithArgs(string pMethod, string pId)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                conn.ConnectionString = _dbConectionString; //conectionString;
                try
                {
                    conn.Open();
                    string dbQuery = pMethod;
                    SqlCommand command = new SqlCommand(); // DB Call. dbQuery, conn

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//                                                              

                    command.Parameters.AddWithValue("@pBandID", (string)pId);

                    var details = new Dictionary<string, object>();
                    ArrayList data = new ArrayList();                    

                    // Create new SqlDataReader object and read data from the command.
                    using (SqlDataReader reader = command.ExecuteReader())
                    {

                        while (reader.HasRows && reader.Read())
                        {
                            var details2 = new Dictionary<string, object>();
                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                details2.Add(reader.GetName(i), reader.IsDBNull(i) ? null : reader.GetValue(i));
                            }
                            data.Add(details2);
                        }

                        if (pMethod.CompareTo("spGetCommentsFromBand") == 0)
                        {
                            details.Add("comments", data);
                        }
                        else if (pMethod.CompareTo("spGetGenres") == 0)
                        {
                            details.Add("genres", data);
                        }
                        else if (pMethod.CompareTo("spGetArtistsFromBand") == 0)
                        {
                            details.Add("members", data);
                        }
                        else
                        {
                            details.Add("DEFAULT", data);
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
