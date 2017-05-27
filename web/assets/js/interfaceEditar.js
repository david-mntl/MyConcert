var app = angular.module('mainModule', ['angular-loading-bar']);




app.controller('mainController',['$scope','$http',function ($scope,$http,Fact) {
    $scope.bandas = [];
    $scope.carteleras = [];
    $scope.festivales = [];
    $scope.categorias = [];

    $scope.selectedEdit = "bandas";
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
    $scope.readCategorias = function () {
        $scope.categorias = [];
        $http.get("../assets/docs/categorias.json").success(function (response) {
            console.log(response);
            if (response.categorias.length > 0) {
                for (j = 0; j < response.categorias.length; j++) {
                    var categoria = new Object();
                    categoria.name = response.categorias[j].name;
                    $scope.categorias.push(categoria);
                }
            }
        });
    };
    $scope.selectEdit = function (selectedItem) {
        $scope.selectedEdit = selectedItem;

        if (selectedItem == "bandas"){
            $scope.readBandas();
        }if(selectedItem == "categorias"){

            $scope.readCategorias();
        }
    };

}]);


