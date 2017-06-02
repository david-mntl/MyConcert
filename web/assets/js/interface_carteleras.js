var app = angular.module('mainModule', ['angular-loading-bar','ngSecurity']);


app.controller('cartelerasController',['$scope','$http','Security',function ($scope,$http,Security) {
    $scope.carteleras = [];
    $scope.userType = Security.getCurrentUserType();
    $scope.userTypeUse = "Votar";
    if ($scope.userType == 2){
        $scope.userTypeUse = "Votar";
    }
    else if($scope.userType == 1){
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
        });
    };

    /*********** AUX FUNCTIONS *************/
    $scope.xExitSession = function () { Security.exitSession(); };
    $scope.xGotoProfile = function () { Security.gotoProfile(); };

    Security.verifySession();
    $scope.readCartelerasData();
}]);