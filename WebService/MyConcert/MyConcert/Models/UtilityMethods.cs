using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
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

            string message = string.Empty;
            JsonSerializer _serializer = new JsonSerializer();

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
            using (var json = new JsonTextReader(reader))
            {
                message = _serializer.Deserialize<string>(json);
                return message;
            }
        }

        public static string getMethod(string pUrl)
        {
            var request = (HttpWebRequest)WebRequest.Create(pUrl);
            request.Method = "GET";
            request.ContentType = "application/json";

            string message = string.Empty;
            JsonSerializer _serializer = new JsonSerializer();

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
            using (var json = new JsonTextReader(reader))
            {
                message = _serializer.Deserialize<string>(json);
                return message;
            }
        }
    }
    
}
