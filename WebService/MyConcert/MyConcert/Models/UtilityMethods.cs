using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;

namespace MyConcert.Models
{
    public static class UtilityMethods
    {
        public static string diccTOstrinJson(Dictionary<string, object> pDiccionary)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            string jsonDoc = jss.Serialize(pDiccionary);
            return jsonDoc;                       
        }

        public static string postMethod(string pJson, string pUrl)
        {
            var request = (HttpWebRequest)WebRequest.Create(pUrl);

            var data = Encoding.ASCII.GetBytes(pJson);
            request.Method = "POST";
            request.ContentType = "application/json";
            request.ContentLength = data.Length;

            using (var stream = request.GetRequestStream())
            {
                stream.Write(data, 0, data.Length);
            }

            var response = request.GetResponse().ToString();
            return response;
        }



    }
}