var app = angular.module('mainModule', ['spotify','angular-loading-bar','ngCookies']);


app.controller('cartelerasController',['$scope','$http','$cookies','Spotify',function ($scope,$http,$cookies,Spotify) {
    $scope.carteleras = [];
    $scope.userType = $cookies.get('zUserType');
    $scope.userTypeUse = "Votar";
    if ($scope.userType == "fanatico"){
        $scope.userTypeUse = "Votar";
    }else{
        $scope.userTypeUse = "Crear festival";
    }


    $scope.readCartelerasData = function() {
        $http.get("../assets/docs/carteleras.txt").success(function (response) {
            if (response.carteleras.length > 0) {
                for (j = 0; j < response.carteleras.length; j++) {
                    var cartelera = new Object();

                    cartelera.localIndex = j;
                    cartelera.id = response.carteleras[j].id;
                    cartelera.name = response.carteleras[j].name;
                    cartelera.location = response.carteleras[j].location;
                    cartelera.leftTime = response.carteleras[j].timeLeft;
                    cartelera.image = "../assets/"+response.carteleras[j].image;
                    $scope.carteleras.push(cartelera);
                }
            }
            $scope.changeCurrentCarteleras(2);
        });
    };



    $scope.readCartelerasData();
}]);