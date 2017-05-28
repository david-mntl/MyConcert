var app = angular.module('mainModule', ['spotify','angular-loading-bar','ngCookies']);


app.controller('cartelerasController',['$scope','$http','$cookies','Spotify',function ($scope,$http,$cookies,Spotify) {
    $scope.carteleras = [];
    console.log($cookies.get('zUserType'))
    $scope.userType = $cookies.get('zUserType');
    $scope.userTypeUse = "Votar";
    if ($scope.userType == "fanatico"){
        $scope.userTypeUse = "Votar";
    }else{
        $scope.userTypeUse = "Crear festival";
    }


    $scope.readCartelerasData = function() {
        console.log($scope.userType);
        $http.get("../assets/docs/carteleras.txt").success(function (response) {
            var data = response.split("\n");

            if (data.length > 0) {
                for (i = 0; i < data.length; i++) {
                    var cartelera = new Object();
                    var carteleraData = data[i].split(":");
                    cartelera.name = carteleraData[0];
                    cartelera.location = carteleraData[1];
                    cartelera.leftTime = carteleraData[2];
                    cartelera.image = "../assets/"+carteleraData[3];
                    $scope.carteleras.push(cartelera);
                }
            }
        });
    };



    $scope.readCartelerasData();
}]);