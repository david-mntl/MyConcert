var app = angular.module('mainModule', ['spotify']);

/*
app.config(function (SpotifyProvider) {
    //SpotifyProvider.setClientId('<CLIENT_ID>');
    //SpotifyProvider.setRedirectUri('<CALLBACK_URI>');
    //SpotifyProvider.setScope('<SCOPE>');

    SpotifyProvider.setAuthToken('BQDNJqDDSHfY3GtRROcwGtUsXYhUOzLNi19jtaMWt7J4kq2_txVDoBLpEa-02fV8FYHRvUr_xdYqOJYOSzmefQ');
});*/

app.controller('mainController',['$scope','$http','Spotify',function ($scope,$http,Spotify) {

    $scope.data = [];

    $scope.audio = new Audio();

    console.log("Iniciando Controlador");
    //https://api.spotify.com/v1/tracks/3n3Ppam7vgaVa1iaRUc9Lp
    //TOKEN = BQDNJqDDSHfY3GtRROcwGtUsXYhUOzLNi19jtaMWt7J4kq2_txVDoBLpEa-02fV8FYHRvUr_xdYqOJYOSzmefQ

    $scope.playSong = function () {
        console.log("Iniciando Reproducción");
        $scope.audio.src = 'https://p.scdn.co/mp3-preview/ed23bf0d09f3589f4b0de7663f91e05e1eb95f6c?cid=022955624f4044df856d09eb1d3445f0';
        $scope.audio.play();
    };

}]);
