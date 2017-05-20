var app = angular.module('mainModule', ['spotify','angular-loading-bar']);


app.controller('festivalesController',['$scope','$http','Spotify',function ($scope,$http,Spotify) {
    $scope.months = [];

    $scope.readFestivalesData = function() {
        $http.get("files/festivales.txt").success(function (response) {

            if (response.months.length > 0) {
                for (i = 0; i < response.months.length; i++) {
                    var month = new Object();
                    month.name = response.months[i].name;
                    month.festivales = [];
                    for (j = 0; j < response.months[i].festivales.length; j++) {
                        var festival = new Object();

                        festival.name = response.months[i].festivales[j].name;
                        festival.location = response.months[i].festivales[j].location;
                        festival.date = response.months[i].festivales[j].date;
                        festival.place = response.months[i].festivales[j].place;
                        festival.image = response.months[i].festivales[j].image;
                        month.festivales.push(festival);
                    }
                    $scope.months.push(month);
                }
            }

            console.log(response);
        });
    }

    $scope.readFestivalesData();
}]);