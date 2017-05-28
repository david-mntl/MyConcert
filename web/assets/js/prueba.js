var app = angular.module('mainModule', ['spotify','angular-loading-bar']);
//https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF

var twitterKey = 'STORAGE.TWITTER.KEY';
var clientId = 'zNDXWJkUSF5Dkua9TKggKwxzh';
var clientSecret = 'TpQ3wYSEnjLUXogeRHLMphxQHstxcjEexxz2KzaQZtM2ZpCSzy';
var myToken = '859172498277117953-k776EcH3gjeaHZwTth2e7GiIUpxHlqI';


app.controller('mainController',['$scope','$http','Spotify',function ($scope,$http,Spotify) {
    $scope.artists = [];
    $scope.tweet = [];
    $scope.currentArtist = new Object();

    $scope.getArtistInformation = function (pID) {
        Spotify.getArtist(pID).then(function (data) {
            $scope.currentArtist.name = data.data.name;
            $scope.currentArtist.image = data.data.images[0].url;
            $scope.currentArtist.followers = data.data.followers.total;
            $scope.currentArtist.popularity = data.data.popularity;
        });
    };

    $scope.searchArtist = function() {
        var url = 'https://api.spotify.com/v1/search?q='+$scope.artist_name+'&type=artist';
        $scope.artists = [];
        $http.get(url).success(function (data, status, headers, config) {
            for(i = 0; i < data.artists.items.length; i++){
                var artist = new Object();
                artist.name = data.artists.items[i].name;
                artist.id = data.artists.items[i].id;
                $scope.artists.push(artist);
            }


        }).error(function (data, status, headers, config) {
            console.log("Error retrieving data from Spotify...");
        });
    };
}]);
