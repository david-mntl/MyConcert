using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Collections;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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
        public string getMethod(string pMethod)
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

                    command.Parameters.AddWithValue("@ID", (string)pId);

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
                            //details = details2;
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
                            details.Add("Default", data);
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
   *                  POST Add user Info
         ********************************************************/
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/GET/userInfo")]
        public string userInfo([FromBody] dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                conn.ConnectionString = _dbConectionString; //conectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spGetUserInfo";
                    SqlCommand command = new SqlCommand(); // DB Call. dbQuery, conn

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@ID", (string)pJson.Email);

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

                        string pUrl = "http://myconcert1.azurewebsites.net/api/Main/GET/spGetUserCategories/" + details["PK_ID_MCUSER"];
                        string userInfo = Models.UtilityMethods.getMethod(pUrl);
                        var infoObject = new Dictionary<string, object>();

                        JavaScriptSerializer oJS = new JavaScriptSerializer();
                        infoObject = oJS.Deserialize<Dictionary<string, object>>(userInfo);

                        details.Add("genres", infoObject["Default"]);




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
  *                  POST Add Member to Band
        ********************************************************/
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/GET/adminInfo")]
        public string adminInfo([FromBody] dynamic pJson)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                conn.ConnectionString = _dbConectionString; //conectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spGetAdminInfo";
                    SqlCommand command = new SqlCommand(); // DB Call. dbQuery, conn

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@pEmail", (string)pJson.Email);

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
         *                  Get Bands from Category Fest Info
         ********************************************************/
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/GET/bandsFromFestCategory/{IDFest}/{IDCategory}")]
        public string bandsFromFestivalCategory(string IDFest, string IDCategory)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                conn.ConnectionString = _dbConectionString; //conectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spGetBandsFromFestivalCategory";
                    SqlCommand command = new SqlCommand(); // DB Call. dbQuery, conn

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@pIDFestival", IDFest);
                    command.Parameters.AddWithValue("@pIDCategory", IDCategory);

                    
                    ArrayList Bands = new ArrayList();

                    // Create new SqlDataReader object and read data from the command.
                    using (SqlDataReader reader = command.ExecuteReader())
                    {



                        while (reader.HasRows && reader.Read())
                        {
                            var details = new Dictionary<string, object>();
                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                details.Add(reader.GetName(i), reader.IsDBNull(i) ? null : reader.GetValue(i));
                            }

                            string ratingUrl = "http://myconcert1.azurewebsites.net/api/Main/GET/spGetBandRating/" + details["id"].ToString();
                     

                            string membersUrl = "http://myconcert1.azurewebsites.net/api/Main/GET/spGetArtistsFromBand/" + details["id"].ToString();
                            string genresUrl = "http://myconcert1.azurewebsites.net/api/Main/GET/spGetGenresFromBand/" + details["id"].ToString();
                            string commentsUrl = "http://myconcert1.azurewebsites.net/api/Main/GET/spGetCommentsFromBand/" + details["id"].ToString();
                            string mainSpotifyUrl = "http://myconcert1.azurewebsites.net/api/Spotify/main";
                            string spotifyInfoUrl = "http://myconcert1.azurewebsites.net/api/Spotify/getArtistInfo/" + details["spotifyID"].ToString();

                            string members = Models.UtilityMethods.getMethod(membersUrl);
                            string genres = Models.UtilityMethods.getMethod(genresUrl);
                            string comments = Models.UtilityMethods.getMethod(commentsUrl);
                            //Spotify Token
                            Models.UtilityMethods.getMethod(mainSpotifyUrl);
                            string spotifyInfo = Models.UtilityMethods.getMethod(spotifyInfoUrl);                            

                             var membersObject = new Dictionary<string, object>();
                             var genresObject = new Dictionary<string, object>();
                             var spotifyInfoObject = new Dictionary<string, object>();
                             var commentsObject = new Dictionary<string, object>();                            


                             JavaScriptSerializer oJS = new JavaScriptSerializer();                            
                             membersObject = oJS.Deserialize<Dictionary<string, object>>(members);
                             genresObject = oJS.Deserialize<Dictionary<string, object>>(genres);
                             commentsObject = oJS.Deserialize<Dictionary<string, object>>(comments);
                             spotifyInfoObject = oJS.Deserialize<Dictionary<string, object>>(spotifyInfo);


                            string ratingJson = Models.UtilityMethods.getMethod(ratingUrl);
                            Dictionary < string, object> ratingDynamic = oJS.Deserialize<Dictionary<string, object>>(ratingJson);
                            dynamic rating = ratingDynamic["Default"];
                            details.Add("rating", rating[0]);


                            details.Add("members", membersObject["members"]);
                             details.Add("genres", genresObject["Default"]);
                             details.Add("comments", commentsObject["comments"]);
                             details.Add("followers", spotifyInfoObject["followers"]);
                             details.Add("popularity", spotifyInfoObject["popularity"]);
                             details.Add("image", spotifyInfoObject["image"]);
                             //details.Add("spotifyID", spotifyInfoObject["spotifyID"]);

                             Bands.Add(details);                             
                         }
                         var diccA = new Dictionary<string, object>();
                         diccA.Add("bands", Bands);
                         var result = Models.UtilityMethods.diccTOstrinJson(diccA);
                        
                        return result;                        
                    }                    
                }
                catch (Exception e)
                {
                    return e.Message;
                }
            }
        }

        /********************************************************        
   *               Get cartelera Info
         ********************************************************/
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/Main/GET/FestivalInfo/{pId}")]
        public string festivalInfo(string pId)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                conn.ConnectionString = _dbConectionString; //conectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spGetFestivalInfo";
                    SqlCommand command = new SqlCommand(); // DB Call. dbQuery, conn

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@ID", pId);

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
                        var categoriesJson = new Dictionary<string, object>();
                        string url = "http://myconcert1.azurewebsites.net/api/Main/GET/spGetCategoriesFromFest/" + pId ;
                        string json = Models.UtilityMethods.getMethod(url);                        
                        dynamic infoCategories = JsonConvert.DeserializeObject(json);                                                                        
                        var diccCategories = new Dictionary<string, object>();                                                

                        ArrayList categories = new ArrayList();
                        ArrayList catBands = new ArrayList();

                        var oRootObject = new Dictionary<string, object>();
                        
                        for (int i = 0; i < infoCategories.Default.Count; i++)
                        {
                            var catInfo = new Dictionary<string, object>();                                                        
                            string idCategory = (string)(infoCategories.Default[i].PK_ID_CATEGORY);
                            catInfo.Add("id", idCategory);
                            catInfo.Add("name", (string)(infoCategories.Default[i].Name));

                            string pUrl = "http://myconcert1.azurewebsites.net/api/GET/bandsFromFestCategory/" + pId + "/" + idCategory;
                            string bandsJSON = Models.UtilityMethods.getMethod(pUrl);                                                        

                            JavaScriptSerializer oJS = new JavaScriptSerializer();                            
                            oRootObject = oJS.Deserialize<Dictionary<string, object>>(bandsJSON);

                            catInfo.Add("bands", oRootObject["bands"]);                            
                            categories.Add(catInfo);
                        }

                        details.Add("categories", categories);
                        return Models.UtilityMethods.diccTOstrinJson(details);                     
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
   *               Get cartelera Info detallada
         ********************************************************/
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/Main/GET/CarteleraInfoDetailed/{pId}")]
        public string carteleraInfo(string pId)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                conn.ConnectionString = _dbConectionString; //conectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spGetBillboardInfo";
                    SqlCommand command = new SqlCommand(); // DB Call. dbQuery, conn

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@ID", pId);

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
                        var categoriesJson = new Dictionary<string, object>();
                        string url = "http://myconcert1.azurewebsites.net/api/Main/GET/spGetCategoriesFromBillboard/" + pId;
                        string json = Models.UtilityMethods.getMethod(url);
                        dynamic infoCategories = JsonConvert.DeserializeObject(json);
                        var diccCategories = new Dictionary<string, object>();

                        ArrayList categories = new ArrayList();
                        ArrayList catBands = new ArrayList();

                        var oRootObject = new Dictionary<string, object>();

                        for (int i = 0; i < infoCategories.Default.Count; i++)
                        {
                            var catInfo = new Dictionary<string, object>();
                            string idCategory = (string)(infoCategories.Default[i].PK_ID_CATEGORY);
                            catInfo.Add("id", idCategory);
                            catInfo.Add("name", (string)(infoCategories.Default[i].Name));

                            string pUrl = "http://myconcert1.azurewebsites.net/api/GET/bandsFromBillboardCategory/" + pId + "/" + idCategory;
                            string bandsJSON = Models.UtilityMethods.getMethod(pUrl);

                            JavaScriptSerializer oJS = new JavaScriptSerializer();
                            oRootObject = oJS.Deserialize<Dictionary<string, object>>(bandsJSON);

                            catInfo.Add("bands", oRootObject["bands"]);
                            categories.Add(catInfo);
                        }

                        details.Add("categories", categories);
                        return Models.UtilityMethods.diccTOstrinJson(details);
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
   *                  Get Bands from Category Fest Info
         ********************************************************/
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/GET/bandsFromBillboardCategory/{IDBillboard}/{IDCategory}")]
        public string spGetBandsFromBillboardCategory(string IDBillboard, string IDCategory)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                conn.ConnectionString = _dbConectionString; //conectionString;
                try
                {
                    conn.Open();
                    string dbQuery = "spGetBandsFromBillboardCategoryOrderByMoney";
                    SqlCommand command = new SqlCommand(); // DB Call. dbQuery, conn

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@pIDBillboard", IDBillboard);
                    command.Parameters.AddWithValue("@pIDCategory", IDCategory);


                    ArrayList Bands = new ArrayList();

                    // Create new SqlDataReader object and read data from the command.
                    using (SqlDataReader reader = command.ExecuteReader())
                    {



                        while (reader.HasRows && reader.Read())
                        {
                            var details = new Dictionary<string, object>();
                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                details.Add(reader.GetName(i), reader.IsDBNull(i) ? null : reader.GetValue(i));
                            }

                            string membersUrl = "http://myconcert1.azurewebsites.net/api/Main/GET/spGetArtistsFromBand/" + details["id"].ToString();
                            string genresUrl = "http://myconcert1.azurewebsites.net/api/Main/GET/spGetGenresFromBand/" + details["id"].ToString();
                            string commentsUrl = "http://myconcert1.azurewebsites.net/api/Main/GET/spGetCommentsFromBand/" + details["id"].ToString();
                            string mainSpotifyUrl = "http://myconcert1.azurewebsites.net/api/Spotify/main";
                            string spotifyInfoUrl = "http://myconcert1.azurewebsites.net/api/Spotify/getArtistInfo/" + details["spotifyID"].ToString();

                            string members = Models.UtilityMethods.getMethod(membersUrl);
                            string genres = Models.UtilityMethods.getMethod(genresUrl);
                            string comments = Models.UtilityMethods.getMethod(commentsUrl);
                            //Spotify Token
                            Models.UtilityMethods.getMethod(mainSpotifyUrl);
                            string spotifyInfo = Models.UtilityMethods.getMethod(spotifyInfoUrl);

                            var membersObject = new Dictionary<string, object>();
                            var genresObject = new Dictionary<string, object>();
                            var spotifyInfoObject = new Dictionary<string, object>();
                            var commentsObject = new Dictionary<string, object>();


                            JavaScriptSerializer oJS = new JavaScriptSerializer();
                            membersObject = oJS.Deserialize<Dictionary<string, object>>(members);
                            genresObject = oJS.Deserialize<Dictionary<string, object>>(genres);
                            commentsObject = oJS.Deserialize<Dictionary<string, object>>(comments);
                            spotifyInfoObject = oJS.Deserialize<Dictionary<string, object>>(spotifyInfo);


                            details.Add("members", membersObject["members"]);
                            details.Add("genres", genresObject["Default"]);
                            details.Add("comments", commentsObject["comments"]);
                            details.Add("followers", spotifyInfoObject["followers"]);
                            details.Add("popularity", spotifyInfoObject["popularity"]);
                            details.Add("image", spotifyInfoObject["image"]);
                            //details.Add("spotifyID", spotifyInfoObject["spotifyID"]);

                            Bands.Add(details);
                        }
                        var diccA = new Dictionary<string, object>();
                        diccA.Add("bands", Bands);
                        var result = Models.UtilityMethods.diccTOstrinJson(diccA);

                        return result;
                    }
                }
                catch (Exception e)
                {
                    return e.Message;
                }
            }
        }





        /********************************************************        
        *                  Get Band Info
        ********************************************************/
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/GET/bandInfo/{IDBand}/{IDSpotify}")]
        public string bandInfo(string IDBand, string IDSpotify)
        {
            try
            {
                Dictionary<string, object> details = new Dictionary<string, object>();     

                string membersUrl = "http://myconcert1.azurewebsites.net/api/Main/GET/spGetArtistsFromBand/" + IDBand.ToString();
                string genresUrl = "http://myconcert1.azurewebsites.net/api/Main/GET/spGetGenresFromBand/" + IDBand.ToString();
                string commentsUrl = "http://myconcert1.azurewebsites.net/api/Main/GET/spGetCommentsFromBand/" + IDBand.ToString();
                string songsUrl = "http://myconcert1.azurewebsites.net/api/Spotify/getSongs/" + IDSpotify.ToString();
                string mainSpotifyUrl = "http://myconcert1.azurewebsites.net/api/Spotify/main";
                string spotifyInfoUrl = "http://myconcert1.azurewebsites.net/api/Spotify/getArtistInfo/" + IDSpotify.ToString();
                string ratingUrl = "http://myconcert1.azurewebsites.net/api/Main/GET/spGetBandRating/" + IDBand.ToString();


                string members = Models.UtilityMethods.getMethod(membersUrl);
                string genres = Models.UtilityMethods.getMethod(genresUrl);
                string comments = Models.UtilityMethods.getMethod(commentsUrl);
                string rating = Models.UtilityMethods.getMethod(ratingUrl);
                //Spotify Token
                Models.UtilityMethods.getMethod(mainSpotifyUrl);
                string spotifyInfo = Models.UtilityMethods.getMethod(spotifyInfoUrl);
                string songs = Models.UtilityMethods.getMethod(songsUrl);

                var membersObject = new Dictionary<string, object>();
                var genresObject = new Dictionary<string, object>();
                var spotifyInfoObject = new Dictionary<string, object>();
                var commentsObject = new Dictionary<string, object>();
                var ratingObject = new Dictionary<string, object>();
                var songsObject = new Dictionary<string, object>();


                JavaScriptSerializer oJS = new JavaScriptSerializer();
                membersObject = oJS.Deserialize<Dictionary<string, object>>(members);
                genresObject = oJS.Deserialize<Dictionary<string, object>>(genres);
                commentsObject = oJS.Deserialize<Dictionary<string, object>>(comments);
                songsObject = oJS.Deserialize<Dictionary<string, object>>(songs);
                spotifyInfoObject = oJS.Deserialize<Dictionary<string, object>>(spotifyInfo);
                ratingObject = oJS.Deserialize<Dictionary<string, object>>(rating);

                details.Add("bandID", IDBand);
                details.Add("spotifyID", IDSpotify);
                details.Add("members", membersObject["members"]);
                details.Add("genres", genresObject["Default"]);
                details.Add("comments", commentsObject["comments"]);
                details.Add("songs", songsObject["songs"]);
                details.Add("followers", spotifyInfoObject["followers"]);
                details.Add("popularity", spotifyInfoObject["popularity"]);
                details.Add("image", spotifyInfoObject["image"]);
                details.Add("rating", ratingObject["Default"]);                

                //Bands.Add(details);
                /*var diccA = new Dictionary<string, object>();
                diccA.Add("bands", Bands);*/
                var result = Models.UtilityMethods.diccTOstrinJson(details);

                return result;
                    
                }
                catch (Exception e)
                {
                    return e.Message;
                }
            }
        }












    
}
