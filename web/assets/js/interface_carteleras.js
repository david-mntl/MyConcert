var app = angular.module('mainModule', ['spotify','angular-loading-bar','ngSecurity']);


app.controller('cartelerasController',['$scope','$http','Security','$filter',function ($scope,$http,Security,$filter,$timeout) {
    $scope.currentCategory = -1;
    $scope.carteleras = [];
    $scope.bandas = [];
    $scope.userType =  Security.getCurrentUserType();
    $scope.listaCategorias = [];
    $scope.categoriasIncluidas = [];
    $scope.regBandas = [];

    $scope.addBanda = function (name) {
        var flag = 0;
        if($scope.regBandas.length != 0){
            for(i = 0; i<$scope.regBandas.length; i++){
                if($scope.regBandas[i] == name){
                    flag = 1;
                }
            }

        }if(flag == 0 ){
            $scope.regBandas.push(name);
            var foundItem = $filter('filter')($scope.categoriasIncluidas, { localID: $scope.currentCategory}, true)[0];
            var index = $scope.categoriasIncluidas.indexOf(foundItem );
            $scope.categoriasIncluidas[index].bandas.push(name);
        }
    };

    $scope.borrar = function (name) {
        var foundItem = $filter('filter')($scope.categoriasIncluidas, { localID: $scope.currentCategory}, true)[0];
        var index = $scope.categoriasIncluidas.indexOf(foundItem );

        if ($scope.categoriasIncluidas[index].bandas.indexOf(name) > -1) {
            $scope.categoriasIncluidas[index].bandas.splice($scope.categoriasIncluidas[index].bandas.indexOf(name), 1);
        }
        if ($scope.regBandas.indexOf(name) > -1) {
            $scope.regBandas.splice($scope.regBandas.indexOf(name), 1);
        }


    };

    $scope.addCategoria = function (name,localid) {
        var flag = 0;
        if(typeof $scope.categoriasIncluidas[0] != 'undefined'){

            for ( i = 0;i<$scope.categoriasIncluidas.length; i++){
                if(name == $scope.categoriasIncluidas[i].name){
                    flag=1;
                }
            }
        }if(flag == 0){
            var catTemp = new Object();
            catTemp.localID = localid;
            catTemp.name = name;
            catTemp.bandas = [];
            $scope.categoriasIncluidas.push(catTemp);
        }
    };

    $scope.readCategorias = function () {
        $scope.listaCategorias = [];
        $http.get("../assets/docs/categorias.json").success(function (response) {
            if (response.categorias.length > 0) {
                for (j = 0; j < response.categorias.length; j++) {
                    var categoria = new Object();
                    categoria.name = response.categorias[j].name;
                    categoria.localID = j;
                    $scope.listaCategorias.push(categoria);
                }
            }
        });
    };

    $scope.readCartelerasData = function() {
        //$http.get("../assets/docs/carteleras.txt").success(function (response) {
        $http.get("https://myconcert1.azurewebsites.net/api/Main/GET/spGetAllBillboards/").success(function (response) {
            response = JSON.parse(response);
            if (response.spGetAllBillboards.length > 0) {
                for (j = 0; j < response.spGetAllBillboards.length; j++) {
                    var cartelera = new Object();

                    cartelera.localIndex = j;
                    cartelera.id = response.spGetAllBillboards[j].id;
                    cartelera.name = response.spGetAllBillboards[j].name;
                    cartelera.location = response.spGetAllBillboards[j].location;
                    cartelera.leftTime = response.spGetAllBillboards[j].timeLeft;
                    cartelera.image = "../assets/"+response.spGetAllBillboards[j].image;
                    $scope.carteleras.push(cartelera);
                }
            }
            $scope.changeCurrentCarteleras(2);
        });
    };


    /**
     * Obtiene las bandas de un JSON
     * */
    $scope.readBandas = function () {
        $scope.bandas = [];
        $http.get("../assets/docs/bandas.json").success(function (response) {
            if (response.bandas.length > 0) {
                for (j = 0; j < response.bandas.length; j++) {
                    var banda = new Object();
                    banda.name = response.bandas[j].name;
                    $scope.bandas.push(banda);
                }
            }
        });
    };


    $scope.changeCurrentCategory = function (pCurrentCategoryID) {
        $scope.currentCategory = pCurrentCategoryID;
    };

    //********* AUX FUNCTIONS ************
    $scope.xExitSession = function () { Security.exitSession(); };
    $scope.xGotoProfile = function () { Security.gotoProfile(); };

    Security.verifySession();
    $scope.readBandas();
    $scope.readCategorias();
    $scope.readCartelerasData();
}]);