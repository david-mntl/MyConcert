using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TinyTwitter;
namespace TinyTwitter
{
    namespace MyConcert.Controllers
    {
        public class twitterController : ApiController
        {
            [System.Web.Http.HttpPost]
            [Route("api/Twitter/postTweet")]
            public void postTweet([FromBody] dynamic info)
            {
                var oauth = new OAuthInfo
                {
                    AccessToken = "859172498277117953-k776EcH3gjeaHZwTth2e7GiIUpxHlqI",
                    AccessSecret = "s9e8dmObtIt9vOOXQ0tqQfEz64ORvcFM4nsvlg5EaR5sA",
                    ConsumerKey = "zNDXWJkUSF5Dkua9TKggKwxzh",
                    ConsumerSecret = "TpQ3wYSEnjLUXogeRHLMphxQHstxcjEexxz2KzaQZtM2ZpCSzy"
                };

                var twitter = new TinyTwitter(oauth);
                twitter.UpdateStatus((string)(info.tweet));
            }
        }
    }
}
