var app = angular.module('mainModule', ['spotify','angular-loading-bar']);


app.controller('cartelerasController',['$scope','$http','Spotify',function ($scope,$http,Spotify) {
    $scope.carteleras = [];

    $scope.readCartelerasData = function() {
        $http.get("files/carteleras.txt").success(function (response) {
            var data = response.split("\n");

            if (data.length > 0) {
                for (i = 0; i < data.length; i++) {
                    var cartelera = new Object();
                    var carteleraData = data[i].split(":");
                    cartelera.name = carteleraData[0];
                    cartelera.location = carteleraData[1];
                    cartelera.leftTime = carteleraData[2];
                    cartelera.image = carteleraData[3];
                    $scope.carteleras.push(cartelera);
                }
            }
        });
    }

    $scope.readCartelerasData();
}]);