var app = angular.module('mainModule', ['spotify','angular-loading-bar']);


app.controller('festivalesController',['$scope','$http','Spotify',function ($scope,$http,Spotify) {
    $scope.festivales = [];

    $scope.readFestivalesData = function() {
        $http.get("../assets/docs/festivales.txt").success(function (response) {

            if (response.festivales.length > 0) {
                for (j = 0; j < response.festivales.length; j++) {
                    var festival = new Object();

                    festival.name = response.festivales[j].name;
                    festival.location = response.festivales[j].location;
                    festival.date = response.festivales[j].date;
                    festival.place = response.festivales[j].place;
                    festival.image = "../assets/"+response.festivales[j].image;
                    $scope.festivales.push(festival);
                }
            }

            console.log(response);
        });
    }

    $scope.readFestivalesData();
}]);