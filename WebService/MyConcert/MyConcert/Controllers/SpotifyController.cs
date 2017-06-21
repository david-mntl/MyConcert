using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SpotifyAPI.Web; //Base Namespace
using SpotifyAPI.Web.Auth; //All Authentication-related classes
using SpotifyAPI.Web.Enums; //Enums
using SpotifyAPI.Web.Models; //Models for the JSON-responses
using System.Threading;
using System.Collections;

namespace MyConcert.Controllers
{
    
    public class SpotifyController : ApiController
    {
        public static  SpotifyWebAPI spotify = new SpotifyWebAPI();
        static ClientCredentialsAuth auth;
/**************************************************************************        
*                  Main To create the token                               *
***************************************************************************/
        [HttpGet]
        [Route("api/Spotify/main")]
        public void Token()
        {
            //Create the auth object
            auth = new ClientCredentialsAuth()
            {
                //Your client Id
                ClientId = "022955624f4044df856d09eb1d3445f0",
                //Your client secret UNSECURE!!
                ClientSecret = "3c7a88b0c22b44729aff837ff46c7e96",
                //How many permissions we need?
                Scope = Scope.UserReadPrivate,
            };
            //With this token object, we now can make calls
            Token token = auth.DoAuth();
            spotify.TokenType = token.TokenType;
            spotify.AccessToken = token.AccessToken;
            spotify.UseAuth = true;            
        }
/**************************************************************************        
*                  Search Artist ID with name                             *
***************************************************************************/
        [HttpGet]
        [Route("api/Spotify/getArtistID/{pMethod}")]
        public string getArtistID(string pMethod) {
            //try
            //{
                SearchItem item = spotify.SearchItems(pMethod, SearchType.Artist);
                var idDic = new Dictionary<string, object>();
                idDic.Add("ID", item.Artists.Items[0].Id);
                return (Models.UtilityMethods.diccTOstrinJson(idDic));
           /* }
            catch (Exception e)
            {
                return "{\"ID\":\"\"}";
            }*/ 
            
        }
/**************************************************************************        
*                  Get the top 5 songs with the Artist ID                 *
**************************************************************************/
        [HttpGet]
        [Route("api/Spotify/getSongs/{artistID}")]
        public string getSongs(string artistID){
            SeveralTracks tracks = spotify.GetArtistsTopTracks(artistID, "CR");
            var Songs = new Dictionary<string, object>();
            ArrayList individualData = new ArrayList();
            for (int t = 0; t < 5; t++){
                var diccB = new Dictionary<string, object>();
                diccB.Add("name", tracks.Tracks[t].Name);
                diccB.Add("url", tracks.Tracks[t].PreviewUrl);
                individualData.Add(diccB);
            }
            Songs.Add("songs", individualData);
            return (Models.UtilityMethods.diccTOstrinJson(Songs));
        }
/**************************************************************************        
*                  Get IMAGE from Artist                  *
**************************************************************************/
        [HttpGet]
        [Route("api/Spotify/getImage/{artistID}")]
        public string getImage(string artistID)
        {
            FullArtist artist = spotify.GetArtist(artistID);
            var image = new Dictionary<string, object>();
            image.Add("URL", artist.Images[0].Url);
            return (Models.UtilityMethods.diccTOstrinJson(image));
        }
/**************************************************************************        
*                               Get artist info                           *
**************************************************************************/
        [HttpGet]
        [Route("api/Spotify/getArtistInfo/{artistID}")]
        public string getArtistInfo(string artistID)
        {                       
            FullArtist artist = spotify.GetArtist(artistID);            

            if ((artist.StatusCode().ToString()) == "OK")
            {
                var info = new Dictionary<string, object>();

                info.Add("followers", artist.Followers.Total);
                info.Add("popularity", artist.Popularity);
                info.Add("image", artist.Images[0].Url);
                info.Add("spotifyID", artistID);
                return(Models.UtilityMethods.diccTOstrinJson(info));
                
            }
            else {
                return "{\"followers\":\"\",\"popularity\":\"\",\"image\":\"\",\"spotifyID\":\"\"}";

            }
           /*}             
           catch (Exception e)
           {
               return "{\"followers\":\"\",\"popularity\":\"\",\"image\":\"\",\"spotifyID\":\"\"}";
           }*/

        }

        [HttpGet]
        [Route("api/Spotify/getChef/{artistID}")]
        public string getChef(string artistID)
        {
            var chefAverage = new Dictionary<string, object>();
            SeveralTracks tracks = spotify.GetArtistsTopTracks(artistID, "CR");
            var average = 0.0;
            for (int i = 0; i < 3; i++) {
                var individualValue = 0.0;
                AudioFeatures audio = spotify.GetAudioFeatures(tracks.Tracks[1].Id);
                individualValue = (audio.Speechiness * 20)+ (audio.Instrumentalness * 20)+ (audio.Valence * 20)
                    + (audio.Energy * 20) + (audio.Danceability * 20);
                average += individualValue;
            }

            chefAverage.Add("average", average/3);
            return (Models.UtilityMethods.diccTOstrinJson(chefAverage));
        }










    }
}

