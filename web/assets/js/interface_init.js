var app = angular.module('mainModule', ['angular-loading-bar']);


app.controller('cartelerasController',['$scope','$http','$interval',function ($scope,$http,$interval) {
    $scope.carteleras = [];
    $scope.festivales = [];
    $scope.currentCarteleras = [];
    $scope.currentCarteleraIndex = 0;
    $scope.currentFestivales = [];
    $scope.currentFestivalIndex = 0;

    $scope.state = false;
    
    $scope.showModal = function () {
        $scope.state = !$scope.state;
    };
    
    $scope.readCartelerasData = function() {
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
            $scope.changeCurrentCarteleras(2);
        });
    };

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
            $scope.changeCurrentFestivales(2);
        });
    };



    $scope.changeCurrentCartelerasAuto = function () { $scope.changeCurrentCarteleras(1); };
    $scope.changeCurrentCarteleras = function(mode){

       if($scope.currentCarteleraIndex >= $scope.carteleras.length){
            $scope.currentCarteleraIndex = 0;
       }

       $scope.currentCarteleras[0] = $scope.carteleras[$scope.currentCarteleraIndex];
       if($scope.currentCarteleraIndex+1 < $scope.carteleras.length) {
            $scope.currentCarteleras[1] = $scope.carteleras[$scope.currentCarteleraIndex + 1];
       }
       else{
           $scope.currentCarteleras[1] = $scope.carteleras[0];
       }
       if(mode==1)
           $scope.currentCarteleraIndex += 1;
    };


    $scope.changeCurrentFestivalesAuto = function () { $scope.changeCurrentFestivales(1); };
    $scope.changeCurrentFestivales = function(mode){

        if($scope.currentFestivalIndex >= $scope.festivales.length){
            $scope.currentFestivalIndex = 0;
        }

        $scope.currentFestivales[0] = $scope.festivales[$scope.currentFestivalIndex];
        if($scope.currentFestivalIndex+1 < $scope.festivales.length) {
            $scope.currentFestivales[1] = $scope.festivales[$scope.currentFestivalIndex + 1];
        }
        else{
            $scope.currentFestivales[1] = $scope.festivales[0];
        }
        if(mode==1)
            $scope.currentFestivalIndex += 1;
    };


    $scope.forwardCurrentSelection = function(mode) {
        if(mode==1){
            if($scope.currentCarteleraIndex < $scope.carteleras.length)
                $scope.currentCarteleraIndex += 1;
            else
                $scope.currentCarteleraIndex = 0;
            $scope.changeCurrentCarteleras(2);
        }
        else{
            if($scope.currentFestivalIndex < $scope.festivales.length)
                $scope.currentFestivalIndex += 1;
            else
                $scope.currentFestivalIndex = 0;
            $scope.changeCurrentFestivales(2);
        }
    };
    $scope.backwardCurrentSelection = function(mode) {
        if(mode==1) {
            if ($scope.currentCarteleraIndex > 0)
                $scope.currentCarteleraIndex -= 1;
            else
                $scope.currentCarteleraIndex = $scope.carteleras.length - 1;
            $scope.changeCurrentCarteleras(2);
        }
        else{
            if($scope.currentFestivalIndex > 0)
                $scope.currentFestivalIndex -= 1;
            else
                $scope.currentFestivalIndex = $scope.festivales.length - 1;
            $scope.changeCurrentFestivales(2);
        }
    };



    $interval($scope.changeCurrentCartelerasAuto, 5000);
    $interval($scope.changeCurrentFestivalesAuto, 5000);
    $scope.readCartelerasData();
    $scope.readFestivalesData();
}]);