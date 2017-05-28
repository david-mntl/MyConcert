var app = angular.module('mainModule', ['spotify','angular-loading-bar']);




app.controller('mainController',['$scope','$http','Spotify',function ($scope,$http,Spotify,$timeout) {
    $scope.selectedWindow="Artista";
    $scope.artists = [];
    $scope.currentArtist = new Object();
    $scope.bandas = [];
    $scope.categorias = [];
    $scope.selectedEdit = "bandas";
    $scope.selectedBanda = "";
    $scope.selectedCategory = "";
    $scope.artists = [];
    $scope.flag = 0;
    $scope.getArtistInformation = function (pID) {
        Spotify.getArtist(pID).then(function (data) {
            $scope.currentArtist.image = data.data.images[0].url;
        });
    };
    $scope.searchArtist = function(nameArtist) {
        var url = 'https://api.spotify.com/v1/search?q='+nameArtist+'&type=artist';
        $http.get(url).success(function (data, status, headers, config) {
            var artist = new Object();
            artist.name = data.artists.items[0].name;
            artist.id = data.artists.items[0].id;
            $scope.artists.push(artist);
            console.log($scope.artists);
        }).error(function (data, status, headers, config) {
            console.log("Error retrieving data from Spotify...");
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
    /**
     * Obtiene las categorias de un JSON
     * */
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
    /** inicia con las bandas disponibles**/
    $scope.readBandas();
    /**
     * Selecciona si muestra Categorias o Bandas
     * */
    $scope.selectEdit = function (selectedItem) {
        $scope.selectedEdit = selectedItem;

        if (selectedItem == "bandas"){
            $scope.selectedWindow="Artista";
            $scope.readBandas();
        }if(selectedItem == "categorias"){
            $scope.selectedWindow="Categoría";
            $scope.readCategorias();
        }
    };

    $scope.selectBanda = function (nameBanda){
        $scope.selectedBanda =nameBanda;

        $scope.searchArtist(nameBanda);
        $scope.currentArtist = new Object();
        $scope.artists = [];
        setTimeout(function () {
            $scope.$apply(function(){
                console.log($scope.artists[0].id);
                $scope.getArtistInformation($scope.artists[0].id);

            });
        }, 400);
    }

    $scope.getCategoria = function () {
        console.log($scope.inputVal);

    }
    $scope.selectCategoria = function (nameCategory) {
        $scope.selectedCategory = nameCategory;


    }


}]);


