
using ClosedXML.Excel;
using ExcelLib;
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
                    conn.Open();
                    string dbQuery = "spAddFestival";
                    SqlCommand command = new SqlCommand(); // 

                    command.Connection = conn;
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = dbQuery;//  

                    command.Parameters.AddWithValue("@pStartDate", (string)pJson.startDate);
                    command.Parameters.AddWithValue("@pEndDate", (string)pJson.endDate);
                    command.Parameters.AddWithValue("@pUbication", (string)pJson.location);
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

                            dynamic bandList = categoriesList[i].bands;

                            for (int j = 0; j < bandList.Count; j++)
                            {
                                var diccB = new Dictionary<string, object>();
                                diccB.Add("categoryID", categoriesList[i].id.ToString());                                
                                diccB.Add("bandID", bandList[i].id.ToString());

                                string jsonBand = Models.UtilityMethods.diccTOstrinJson(diccB);
                                response = Models.UtilityMethods.postMethod(jsonBand, addBandUrl);
                            }                                                    
                        }

                        return response;
                    }
                    catch (Exception e)
                    {
                        return e.Message;
                    }                    
                }
                catch (SqlException e)
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

                    command.Parameters.AddWithValue("@pName", (string)pJson.Name);
                    command.Parameters.AddWithValue("@pStartVotingDate", (string)pJson.SVoteDate);
                    command.Parameters.AddWithValue("@pEndVotingDate", (string)pJson.EVoteDate);
                    command.Parameters.AddWithValue("@pPlaceID", (string)pJson.PlaceID);
                    command.Parameters.AddWithValue("@pState", (string)pJson.State);

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





































    }
}
