
using ClosedXML.Excel;
using ExcelLib;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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

        /********************************************************        
         *                  POST Add Genre to User
        ********************************************************/
        [HttpPost]
        [Route("api/Funcs/AddGenreToUser")]
        public string addGenreToUser([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString; 
                try
                {
                    conn.Open();
                    string dbQuery = "spAddGenreToUser";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@pUserID", (string)pJson.ID);
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

                        return Models.UtilityMethods.diccTOstrinJson(details);
                        
                    }
                }
                catch (Exception e)
                {
                    return e.Message;
                }
            }
        }


        /********************************************************        
         *                  POST Add Festival
        ********************************************************/
        [HttpPost]
        [Route("api/Funcs/AddFestival")]
        public string addFestival([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                   /* string addFestivalBandsUrl = "http://myconcert1.azurewebsites.net/api/Funcs/verifyBandDisponibility";
                    for (int i = 0; i < pJson.categories.Count; i++)
                    {

                        for (int j = 0; j < pJson.categories[i].bands.Count; j++)
                        {
                            Dictionary<string, object> jsonPost = new Dictionary<string, object>();

                            jsonPost.Add("bandID", pJson.categories[i].bands[j].id.ToString());
                            jsonPost.Add("dateStart", pJson.startDate.ToString());
                            jsonPost.Add("dateEnd", pJson.endDate.ToString());

                            string stringJson = Models.UtilityMethods.diccTOstrinJson(jsonPost);
                            string average = Models.UtilityMethods.postMethod(stringJson, addFestivalBandsUrl);
                            JavaScriptSerializer oJS1 = new JavaScriptSerializer();
                            Dictionary<string, object> confirmation = oJS1.Deserialize<Dictionary<string, object>>(average);
                            var msg = confirmation["status"].ToString();

                            if (msg.CompareTo("0")!=0)
                            {
                                return pJson.categories[i].bands[j].id.ToString() +" error la banda ya esta en otra cartelera para estas fechas";
                            }
                        }
                    }*/

                     conn.Open();
                     string dbQuery = "spAddFestival";
                     SqlCommand command = new SqlCommand(); // 

                     command.Connection = conn;
                     command.CommandType = System.Data.CommandType.StoredProcedure;
                     command.CommandText = dbQuery;//  

                     command.Parameters.AddWithValue("@pStartDate", (string)pJson.startDate);
                     command.Parameters.AddWithValue("@pEndDate", (string)pJson.endDate);
                     command.Parameters.AddWithValue("@pUbication", (string)pJson.place);
                     command.Parameters.AddWithValue("@pDescription", (string)pJson.description);
                     command.Parameters.AddWithValue("@pBillboardID", (string)pJson.billboardID);


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
                     }
                     try
                     {
                         string festivalID = details["FestivalID"].ToString();                        
                         dynamic categoriesList = pJson.categories;

                          string addBandUrl = "http://myconcert1.azurewebsites.net/api/Funcs/addBandToFestival";
                          string addCategorieUrl = "http://myconcert1.azurewebsites.net/api/Funcs/addCatToFestival";

                          string response = string.Empty;
                          for (int i = 0; i < categoriesList.Count; i++)
                          {
                              var diccA = new Dictionary<string, object>();
                              diccA.Add("categoryID", categoriesList[i].id.ToString());
                              diccA.Add("festivalID", festivalID);

                              string jsonCategorie = Models.UtilityMethods.diccTOstrinJson(diccA);

                              response = Models.UtilityMethods.postMethod(jsonCategorie, addCategorieUrl);
                             JavaScriptSerializer oJS = new JavaScriptSerializer();                            
                             Dictionary<string,object> diccComments = oJS.Deserialize<Dictionary<string, object>>(response);


                             dynamic bandList = categoriesList[i].bands;

                              for (int j = 0; j < bandList.Count; j++)
                              {
                                  var diccB = new Dictionary<string, object>();
                                  diccB.Add("categoryID", diccComments["ID"].ToString());                                
                                  diccB.Add("bandID", bandList[j].id.ToString());

                                  string jsonBand = Models.UtilityMethods.diccTOstrinJson(diccB);
                                  response = Models.UtilityMethods.postMethod(jsonBand, addBandUrl);
                              }                                                    
                          }

                    return "ok";
                    }
                    catch (Exception e)
                    {
                        return e.Message;
                    }   
                }
                catch (Exception e)
                {
                    return e.Message;
                }
            }
        }

        /********************************************************        
         *                  POST Add Billboard
        ********************************************************/
        [HttpPost]
        [Route("api/Funcs/AddBillboard")]
        public string addBillboard([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spAddBillboard";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@pName", (string)pJson.name);
                    command.Parameters.AddWithValue("@pStartVotingDate", (string)pJson.sVoteDate);
                    command.Parameters.AddWithValue("@pEndVotingDate", (string)pJson.eVoteDate);
                    command.Parameters.AddWithValue("@pPlaceID", (string)pJson.placeID);
                    command.Parameters.AddWithValue("@pDescription", (string)pJson.description);

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

                        try
                        {
                            string addBandUrl = "http://myconcert1.azurewebsites.net/api/Funcs/AddBandToBillboard";
                            string addCategorieUrl = "http://myconcert1.azurewebsites.net/api/Funcs/AddCategoryToBillboard";
                            string tweetBandUrl = "http://myconcert1.azurewebsites.net/api/Twitter/postTweet";

                            dynamic categories = pJson.categories;
                             var response = string.Empty;


                             for (int i = 0; i < categories.Count; i++)
                             {
                                 Dictionary<string, Object> diccA = new Dictionary<string, object>();
                                 string categoryID = categories[i].ID.ToString();
                                 dynamic bands = categories[i].bands;

                                 diccA.Add("billboardID", details["ID"]);
                                 diccA.Add("categoryID", categoryID);

                                 string jsonCategoryToBillboard = Models.UtilityMethods.diccTOstrinJson(diccA);
                                 response = Models.UtilityMethods.postMethod(jsonCategoryToBillboard, addCategorieUrl);
                                for (int j = 0; j < bands.Count; j++)
                                 {
                                     diccA.Add("bandID", bands[i].ID.ToString());
                                     string jsonBandToBillboard = Models.UtilityMethods.diccTOstrinJson(diccA);
                                     response = Models.UtilityMethods.postMethod(jsonBandToBillboard, addBandUrl);

                                    Dictionary<string, object> tweetDicc = new Dictionary<string, object>();
                                    tweetDicc.Add("tweet", "La banda " + bands[i].name.ToString() + " se ha agregado a la  cartelera " + pJson.name.ToString());
                                    string tweetJson = Models.UtilityMethods.diccTOstrinJson(tweetDicc);
                                    Models.UtilityMethods.postMethod(tweetJson, tweetBandUrl);

                                }






                             }                                                                                                                                                 
                                                         
                            return response;//categories[0].bands.ToString();
                        }
                        catch (Exception e)
                        {
                            return e.Message;
                        }   
                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }

        /********************************************************        
         *                  POST Add Comment To Band
        ********************************************************/
        [HttpPost]
        [Route("api/Funcs/AddCommentBand")]
        public string addCommentBand([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spaddCommentToBand";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@BandID", (string)pJson.id);
                    command.Parameters.AddWithValue("@Comment", (string)pJson.comment);
                    command.Parameters.AddWithValue("@Score", (string)pJson.score);
                    command.Parameters.AddWithValue("@UserID", (string)pJson.userId);                    

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

                        return Models.UtilityMethods.diccTOstrinJson(details);

                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }


        /********************************************************        
         *                  POST actulizar Perfil USER
        ********************************************************/
        [HttpPost]
        [Route("api/Funcs/EditPerfil")]
        public string addEditPerfil([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spEditUser";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@pName", (string)pJson.name);
                    command.Parameters.AddWithValue("@pLastname", (string)pJson.lastName);
                    command.Parameters.AddWithValue("@pCountry", (string)pJson.country);
                    command.Parameters.AddWithValue("@pResidence",(string)pJson.residence);
                    command.Parameters.AddWithValue("@pUni_ID", (string)pJson.uniID);
                    command.Parameters.AddWithValue("@pEmail", (string)pJson.email);
                    command.Parameters.AddWithValue("@pPhone", (string)pJson.phone);
                    command.Parameters.AddWithValue("@pPhoto", (string)pJson.photo);
                    command.Parameters.AddWithValue("@pPass", (string)pJson.pass);
                    command.Parameters.AddWithValue("@pDescription", (string)pJson.description);
                    command.Parameters.AddWithValue("@pBirthdate", (string)pJson.birthdate);

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
                        return Models.UtilityMethods.diccTOstrinJson(details);
                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }

        /********************************************************        
         *                  POST Edit Perfil Admin
        ********************************************************/
        [HttpPost]
        [Route("api/Funcs/EditPerfilAdmin")]
        public string addEditPerfilAdmin([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spEditAdmin";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@pName", (string)pJson.name);
                    command.Parameters.AddWithValue("@pLastname", (string)pJson.lastName);
                    command.Parameters.AddWithValue("@pEmail", (string)pJson.email);                                        
                    command.Parameters.AddWithValue("@pPass", (string)pJson.pass);                                        

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
                        
                    }                    
                    return Models.UtilityMethods.diccTOstrinJson(details);
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }

        /********************************************************        
         *                  POST ADD Calification to Comment
        ********************************************************/
        [HttpPost]
        [Route("api/Funcs/addCommentCalification")]
        public string addCommentCalification([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spAddCommentCalification";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@UserID", (string)pJson.userID);
                    command.Parameters.AddWithValue("@Band", (string)pJson.bandID);
                    command.Parameters.AddWithValue("@Points", (string)pJson.points);
                    command.Parameters.AddWithValue("@Comment", (string)pJson.comment);

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
                        return Models.UtilityMethods.diccTOstrinJson(details);
                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }

        /********************************************************        
        *                  POST ADD points to Billboard Band
       ********************************************************/
        [HttpPost]
        [Route("api/Funcs/AddPointsToBand")]
        public string addPointsToBillboardBand([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spAddPointsToBillboardBand";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@Billboard", (string)pJson.billboardID);
                    command.Parameters.AddWithValue("@Category ", (string)pJson.categoryID);
                    command.Parameters.AddWithValue("@BandID ", (string)pJson.bandID);
                    command.Parameters.AddWithValue("@points  ", (string)pJson.points);

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
                        return Models.UtilityMethods.diccTOstrinJson(details);
                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }

        /********************************************************        
       *                  POST User Vote
      ********************************************************/
        [HttpPost]
        [Route("api/Funcs/UserVote")]
        public string addUserVote([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spPostUserVote";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@UserID", (string)pJson.email);
                    command.Parameters.AddWithValue("@BillboardID", (string)pJson.billboardID);

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
                        return Models.UtilityMethods.diccTOstrinJson(details);
                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }

        /********************************************************        
     *                  POST Check User Vote billboard
    ********************************************************/
        [HttpPost]
        [Route("api/Funcs/CheckUserVote")]
        public string checkUserVote([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spCheckUserVoteBillboard";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@UserID", (string)pJson.userID);
                    command.Parameters.AddWithValue("@BillboardID", (string)pJson.billboardID);

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
                        return Models.UtilityMethods.diccTOstrinJson(details);
                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }

        /********************************************************        
     *                  POST Deactivate User
    ********************************************************/
        [HttpPost]
        [Route("api/Funcs/DeactivateUser")]
        public string deactivateUser([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spDeactivateUser";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@ID", (string)pJson.ID);                    

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
                        return Models.UtilityMethods.diccTOstrinJson(details);
                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }

        /********************************************************        
    *                  POST Activate User
   ********************************************************/
        [HttpPost]
        [Route("api/Funcs/ActivateUser")]
        public string activateUser([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spActivateUser";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@ID", (string)pJson.ID);

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
                        return Models.UtilityMethods.diccTOstrinJson(details);
                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }

        /********************************************************        
 *                  POST Verify User State
********************************************************/
        [HttpPost]
        [Route("api/Funcs/VerifyUserState")]
        public string verifyUserState([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spVerifyUserState";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@ID", (string)pJson.ID);

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
                        return Models.UtilityMethods.diccTOstrinJson(details);
                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }


        /**
         * GENERAR REPORTE EXCEL           
         * */

        [System.Web.Http.HttpGet]
        [Route("api/Verify/reporteExcel")]
        public string reporteExcel()
        {
            try
            {

                ExcelHandler doc = new ExcelHandler();

                doc.addReportHeader(); //Crea los títulos del reporte
                doc.addTableHeaders(XLColor.LightGray); //Añade los títulos de la tabla para las bandas
                doc.addReportTitle("Festival Imperial"); //Añade el título del reporte
                doc.addReportInfo("6/6/2017", "fasm22", "1", "Headliners,Locales, Rock"); //Añade info del reporte

                //Aquí se añaden los artistas correspondientes al reporte. Deben estar ordenados por el último parámetro según especificaciones del proyecto. Esto es la calificación promedio obtenida por el algoritmo del chef. 
                //Este proceso se puede realizar mediante un for, teniendo objetos artistas en un arreglo y recorriendolo.                

                doc.addArtistToReport("Cualquier Cosa", "Funk Rock, Funk Metal, Rock Alternativo", "4", "92");
                doc.addArtistToReport("Abraham ", "Rock, Rock Pop, Alternative", "5", "90");

                doc.saveDocument(); //Guarda el documento
                doc.generatePDF();   //Genera el documento PDF. (EN PROCESO, AÚN NO ESTÁ LISTO)

                doc.uploadFileToServer(); //Sube el documento al servidor para que el usuario lo pueda descargar.

                return "ok";
            }
            catch (Exception e)
            {
                return e.Message;
            }

        }

        /********************************************************        
*                  POST Add Category to Festival
********************************************************/
        [HttpPost]
        [Route("api/Funcs/addCatToFestival")]
        public string addCategoryToFestival([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spAddCategoryToFestival";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@pCategoryID", (string)pJson.categoryID);
                    command.Parameters.AddWithValue("@pFestivalID", (string)pJson.festivalID);


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
                        return Models.UtilityMethods.diccTOstrinJson(details);
                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }

        /********************************************************        
*                  POST Verify User State
********************************************************/
        [HttpPost]
        [Route("api/Funcs/addBandToFestival")]
        public string addBandToFestival([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spAddBandToFestival";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@pCategoryID", (string)pJson.categoryID);                    
                    command.Parameters.AddWithValue("@pBandID", (string)pJson.bandID);


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
                        return Models.UtilityMethods.diccTOstrinJson(details);
                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }


        /********************************************************        
 *                  POST Deactivate Billboard
********************************************************/
        [HttpPost]
        [Route("api/Funcs/DeactivateBillboard")]
        public string deactivateBillboard([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spDeactivateBillboard";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@ID", (string)pJson.ID);

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
                        return Models.UtilityMethods.diccTOstrinJson(details);
                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }



        /********************************************************        
 *                  POST Deactivate Festival
********************************************************/
        [HttpPost]
        [Route("api/Funcs/DeactivateFestival")]
        public string deactivateFestival([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spDeactivateFestival";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@ID", (string)pJson.ID);

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
                        return Models.UtilityMethods.diccTOstrinJson(details);
                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }


        /********************************************************        
        *                  POST Add Band To Billboard
        ********************************************************/
        [HttpPost]
        [Route("api/Funcs/AddBandToBillboard")]
        public string addBandToBillboard([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spAddBandToBillboard";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@BillboardCategoryID", (string)pJson.billboardID);
                    command.Parameters.AddWithValue("@CategoryID", (string)pJson.categoryID);
                    command.Parameters.AddWithValue("@BandID ", (string)pJson.bandID);

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
                        return Models.UtilityMethods.diccTOstrinJson(details);
                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }

        /********************************************************        
        *                  POST Add Photo To Billboard
        ********************************************************/
        [HttpPost]
        [Route("api/Funcs/AddPhotoToBillboard")]
        public string addPhotoToBillboard([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spAddBillboardPhoto";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@BillboardID", (string)pJson.billboardID);
                    command.Parameters.AddWithValue("@Photo", (string)pJson.photo);                    

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
                        return Models.UtilityMethods.diccTOstrinJson(details);
                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }

        /********************************************************        
        *                  POST Add Category To Billboard
        ********************************************************/
        [HttpPost]
        [Route("api/Funcs/AddCategoryToBillboard")]
        public string addCategoryToBillboard([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spAddCategoryToBillboard";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@BillboardID", (string)pJson.billboardID);
                    command.Parameters.AddWithValue("@CategoryID", (string)pJson.categoryID);

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
                        return Models.UtilityMethods.diccTOstrinJson(details);
                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }

        /********************************************************        
        *                  POST Add Vote Money To Billboard
        ********************************************************/
        [HttpPost]
        [Route("api/Funcs/AddVoteMoney")]
        public string addVoteMoney([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spAddVote";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@BandID", (string)pJson.bandID);
                    command.Parameters.AddWithValue("@BillboardID", (string)pJson.billboardID);
                    command.Parameters.AddWithValue("@CategoryID", (string)pJson.categoryID);
                    command.Parameters.AddWithValue("@Money", (string)pJson.money);

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
                        return Models.UtilityMethods.diccTOstrinJson(details);
                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }


        /********************************************************        
        *                  POST Add Vote To Billboard
        ********************************************************/
        [HttpPost]
        [Route("api/Funcs/AddVoteToBillboard")]
        public string addVoteToBillboard([FromBody]dynamic pJson)
        {
            try
            {
                    string response = string.Empty;
                    string addVoteUrl = "http://myconcert1.azurewebsites.net/api/Funcs/AddVoteMoney";
                 for (int i = 0; i < pJson.categories.Count; i++)
                 {                           
                     for (int j=0;j<pJson.categories[i].bands.Count;j++)
                     {
                        Dictionary<string, object> details = new Dictionary<string, object>();
                        details.Add("billboardID", pJson.billboardID.ToString());
                        details.Add("categoryID", pJson.categories[i].id.ToString());

                        dynamic band = pJson.categories[i].bands[j];
                        details.Add("bandID", band.id.ToString());
                        details.Add("money", band.money.ToString());

                         string jsonVoteBand = Models.UtilityMethods.diccTOstrinJson(details);
                         response = Models.UtilityMethods.postMethod(jsonVoteBand, addVoteUrl);
                     }
                 }

                 string postVoteUrl = "http://myconcert1.azurewebsites.net/api/Funcs/UserVote";
                 Dictionary<string, object> PostUser = new Dictionary<string, object>();
                 PostUser.Add("email", pJson.email.ToString());
                 PostUser.Add("billboardID", pJson.billboardID.ToString());
                 string jsonPostUser = Models.UtilityMethods.diccTOstrinJson(PostUser);

                response = Models.UtilityMethods.postMethod(jsonPostUser, postVoteUrl);


                return response; 
                }
                catch (Exception e)
                {
                    return e.Message;
                }
            }



        /********************************************************        
 *                  POST Cheff 
       ********************************************************/
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/Funcs/addCheffSugg")]
        public string addCheffSuggestion([FromBody]dynamic pJson)
        {
            try
            {
                double totalBands = 0;
                double totalAverage = 0;
                double averageBand = 0;
                double tempElected = 0;

                string categoriesReport = string.Empty;
                ExcelHandler doc = new ExcelHandler();

                DateTime dateTime = DateTime.UtcNow.Date;

                doc.addReportHeader(); //Crea los títulos del reporte
                doc.addTableHeaders(XLColor.LightGray); //Añade los títulos de la tabla para las bandas
                doc.addReportTitle(pJson.name.ToString()); //Añade el título del reporte
                

                //Aquí se añaden los artistas correspondientes al reporte. Deben estar ordenados por el último parámetro según especificaciones del proyecto. Esto es la calificación promedio obtenida por el algoritmo del chef. 
                //Este proceso se puede realizar mediante un for, teniendo objetos artistas en un arreglo y recorriendolo.                

                

                string try1 = string.Empty;

                string spotifyTOKEN = "http://myconcert1.azurewebsites.net/api/Spotify/main";
                Models.UtilityMethods.getMethod(spotifyTOKEN);

                for (int i = 0; i < pJson.categories.Count; i++)
                {
                    dynamic category = pJson.categories[i];
                    categoriesReport = categoriesReport + ", " + category.name.ToString();

                    for (int j = 0; j < category.bands.Count; j++)
                    {
                        dynamic band = category.bands[j];
                        string bandSpotifyID = band.spotifyID.ToString();

                        if (bandSpotifyID.CompareTo("") == 0)
                        {
                            string commentsUrl = "http://myconcert1.azurewebsites.net/api/Main/GET/spGetCommentsFromBand/1" + band.bandID.ToString();
                            string json = Models.UtilityMethods.getMethod(commentsUrl);

                            var diccComments = new Dictionary<string, object>();
                            JavaScriptSerializer serial = new JavaScriptSerializer();
                            diccComments = serial.Deserialize<Dictionary<string, object>>(json);
                            dynamic comment = diccComments["comments"];

                            totalAverage = totalAverage + comment.Count;
                            totalBands = totalBands + 1;
                        }
                        else
                        {
                            string cheffJson = "http://myconcert1.azurewebsites.net/api/Spotify/getChef/" + bandSpotifyID;
                            string average = Models.UtilityMethods.getMethod(cheffJson);

                            var cheffAverage = new Dictionary<string, object>();
                            JavaScriptSerializer oJS = new JavaScriptSerializer();
                            cheffAverage = oJS.Deserialize<Dictionary<string, object>>(average);

                            string bandAverage = cheffAverage["average"].ToString();
                            double intAverage = Convert.ToDouble(bandAverage);

                            //try1 = intAverage.ToString();
                            totalAverage = totalAverage + intAverage;

                            totalBands = totalBands + 1;
                        }                        
                    }                                            
                }

                averageBand = totalAverage / totalBands;

                string bandsWOBillboardUrl = "http://myconcert1.azurewebsites.net/api/Main/GET/spGetAllBandsWithoutBillboard/" + pJson.billboardID.ToString();
                string bandsJson = Models.UtilityMethods.getMethod(bandsWOBillboardUrl);
                /*JavaScriptSerializer serializar = new JavaScriptSerializer();
                Dictionary <string, object> dictionaryBand = serializar.Deserialize<Dictionary<string,object>>(bandsJson);*/
                //dynamic bands = dictionaryBand["Default"];

                dynamic bands = JObject.Parse(bandsJson);
                bands = bands.Default;
                string bandAverageResult = string.Empty;

                Dictionary<string, object> cheffBand = new Dictionary<string, object>();
                cheffBand.Add("ID", "");
                cheffBand.Add("spotifyID", "");
                cheffBand.Add("name", "");                

                for (int i = 0; i < bands.Count; i++)
                {
                    string spotifyID = bands[i].spotifyID.ToString();

                    if (spotifyID.CompareTo("") == 0)
                    {
                        string commentsUrl = "http://myconcert1.azurewebsites.net/api/Main/GET/spGetCommentsFromBand/1" + bands[i].bandID.ToString();
                        string json = Models.UtilityMethods.getMethod(commentsUrl);

                        var diccComments = new Dictionary<string, object>();
                        JavaScriptSerializer serial = new JavaScriptSerializer();
                        diccComments = serial.Deserialize<Dictionary<string, object>>(json);
                        dynamic comment = diccComments["comments"];

                        if (comment.Count > 5)
                        {
                            totalAverage = totalAverage + 50;
                            totalBands = totalBands + 1;

                            doc.addArtistToReport(bands[i].name.ToString(),"rock", bands[i].rating.ToString(), "50");
                        }
                        else
                        {
                            totalAverage = totalAverage + comment.Count*10;
                            totalBands = totalBands + 1;
                            int times = comment.Count * 10;
                            doc.addArtistToReport(bands[i].name.ToString(), "rock", bands[i].rating.ToString(), (times).ToString());

                        }
                        


                    }
                    else
                    {
                        string cheffJson = "http://myconcert1.azurewebsites.net/api/Spotify/getChef/" + spotifyID;
                        string average = Models.UtilityMethods.getMethod(cheffJson);
                        var cheffAverage = new Dictionary<string, object>();
                        JavaScriptSerializer oJS = new JavaScriptSerializer();
                        cheffAverage = oJS.Deserialize<Dictionary<string, object>>(average);

                        bandAverageResult = cheffAverage["average"].ToString();

                        double result = Convert.ToDouble(bandAverageResult);                        

                        double resultTemp = Math.Abs(result - tempElected);

                        doc.addArtistToReport(bands[i].name.ToString(), "rock", bands[i].rating.ToString(), result.ToString());

                        if (i == 0)
                        {
                            cheffBand["ID"] = bands[i].ID.ToString();
                            cheffBand["spotifyID"] = spotifyID;
                            cheffBand["name"] = bands[i].name.ToString();
                            cheffBand["rating"] = result;
                            tempElected = result;
                        }
                        else if (Math.Abs(averageBand - result) < Math.Abs(averageBand - tempElected))
                        {
                            cheffBand["ID"] = bands[i].ID.ToString();
                            cheffBand["spotifyID"] = spotifyID.ToString();
                            cheffBand["name"] = bands[i].name.ToString();
                            cheffBand["rating"] = result;
                            tempElected = result;
                        }
                        else
                        {
                            continue;
                        }
                    }


                    
                }


                doc.addReportInfo(dateTime.ToString("dd/MM/yyyy"), pJson.user.ToString(), "1", categoriesReport); //Añade info del reporte

                doc.saveDocument(); //Guarda el documento                

                doc.uploadFileToServer(); //Sube el documento al servidor para que el usuario lo pueda descargar.


                return Models.UtilityMethods.diccTOstrinJson(cheffBand);                
            }
            catch (Exception e)
            {
                return e.Message;
            }       
            
        }


        /********************************************************        
       *                  POST verify Band Disponibility
       ********************************************************/
        [HttpPost]
        [Route("api/Funcs/verifyBandDisponibility")]
        public string verifyBandDisponibility([FromBody]dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                //conectionString;
                conn.ConnectionString = _dbConectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spBandAvailable";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@BandID", (string)pJson.bandID);
                    command.Parameters.AddWithValue("@Start", (string)pJson.dateStart);
                    command.Parameters.AddWithValue("@End", (string)pJson.dateEnd);                    

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
                        return Models.UtilityMethods.diccTOstrinJson(details);
                    }
                }
                catch (SqlException e)
                {
                    return e.Message;
                }
            }
        }






































    }
}
