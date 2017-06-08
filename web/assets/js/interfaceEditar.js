var app = angular.module('mainModule', ['spotify','angular-loading-bar','ngSecurity']);




app.controller('mainController',['$scope','$http','Spotify','Security',function ($scope,$http,Spotify,Security,$timeout) {
    var url1 = 'https://myconcert1.azurewebsites.net/api/Spotify/main/';
    $http.get(url1).success(function (data, status, headers, config) {
    }).error(function (data, status, headers, config) {
        console.log("Error retrieving data from Spotify...");
    });




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

    /*
    *
    * */
    $scope.getArtistInformation = function (pID) {
        var image = new Object();
        var url = 'https://myconcert1.azurewebsites.net/api/Spotify/getImage/'+pID;
        $http.get(url).success(function (data, status, headers, config) {
            var response = JSON.parse(data);
            image.url3 = response.URL;
            $scope.currentArtist.image = image.url3;
        }).error(function (data, status, headers, config) {
            console.log("Error retrieving data from Spotify...");
        });

    };
    /* **********************************creo que no se utiliza m[as************************************/
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
        var url = 'https://myconcert1.azurewebsites.net/api/Main/GET/spGetAllBands/';
        $http.get(url).success(function (data, status, headers, config) {
            var response = JSON.parse(data);
            for (j = 0; j < response.spGetAllBands.length; j++) {
                var bands = new Object();
                bands.name = response.spGetAllBands[j].Name;
                bands.id  = response.spGetAllBands[j].ID_Spotify;
                bands.idBand  = response.spGetAllBands[j].PK_ID_BAND;
                bands.status = response.spGetAllBands[j].BandState;
                $scope.bandas.push(bands);
            }
            //bands.id = data.artists.items[0].id;

            //console.log($scope.artists);
        }).error(function (data, status, headers, config) {
            console.log("Error retrieving data from Spotify...");
        });
    };
    /**
     * Obtiene las categorias de un JSON
     * */
    $scope.readCategorias = function () {

        $scope.categorias = [];
        var url = 'https://myconcert1.azurewebsites.net/api/Main/GET/spGetAllCategories/';
        $http.get(url).success(function (data, status, headers, config) {
            var response = JSON.parse(data);
            for (j = 0; j < response.spGetAllCategories.length; j++) {
                var category = new Object();
                category.name = response.spGetAllCategories[j].Name;
                category.id  = response.spGetAllCategories[j].PK_ID_CATEGORY;
                $scope.categorias.push(category);
            }
        }).error(function (data, status, headers, config) {
            console.log("Error retrieving data from Spotify...");
        });


    };
    /**
     * Agrega una nueva categoria
     * */
    $scope.postCategorias = function () {
        var parameter = JSON.stringify({Name:$scope.inputCategory});
        $http.post('https://myconcert1.azurewebsites.net/api/Verify/RegisterCategory', parameter).success(function (data, status, headers, config) {
            console.log(data);
        }).error(function (data, status, headers, config) {
            console.log(data);
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
        $scope.selectedBanda = nameBanda;

        //$scope.searchArtist(nameBanda);
        $scope.currentArtist = new Object();
        $scope.currentArtist.name = nameBanda;
        $scope.artists = [];
        setTimeout(function () {
            $scope.$apply(function(){
                for(i = 0; i < $scope.bandas.length;i++){
                    if($scope.bandas[i].name == nameBanda){
                        console.log($scope.bandas[i].status);
                            $scope.currentArtist.status = $scope.bandas[i].status;
                        $scope.getArtistInformation($scope.bandas[i].id);
                    }

                }


            });
        }, 400);
    };

    $scope.getCategoria = function () {
        console.log(JSON.stringify({name:$scope.inputVal},null,"    "));
    };
    $scope.postArtista = function () {
        var miembros = $scope.inputMiembros.split("\n");
        var miembro = []
        var canciones = $scope.inputCanciones.split("\n");
        var cancion = []
        var generos = $scope.inputGeneros.split("\n");
        var genero = []
        for(i = 0; i< miembros.length; i++){
            var miem = new Object();
            miem.name = miembros[i];
            miembro.push(miem);
        }
        for(i = 0; i< canciones.length; i++){
            var canc = new Object();
            canc.name = canciones[i];
            cancion.push(canc);
        }
        for(i = 0; i< generos.length; i++){
            var gene = new Object();
            gene.name = generos[i];
            genero.push(gene);
        }

        var parameter = JSON.stringify({name:$scope.inputName,members:miembro,songs:cancion,genres:genero});
        console.log(parameter);
        $http.post('https://myconcert1.azurewebsites.net/api/Verify/RegisterBand', parameter).success(function (data, status, headers, config) {
            console.log(data);
        }).error(function (data, status, headers, config) {
            console.log(data);
        });

        $scope.readBandas();


    };
    $scope.postEditArtista = function () {
        console.log(JSON.stringify({name:$scope.inputEditName,miembros:$scope.inputEditMiembros,canciones:$scope.inputEditCanciones,generos:$scope.inputEditGeneros},null,"    "));
    };
    $scope.selectCategoria = function (nameCategory) {
        $scope.selectedCategory = nameCategory;
    };


    Security.verifySessionInit(1);
    /*********** AUX FUNCTIONS **************/
    $scope.xExitSession = function () { Security.exitSession(); };

    $scope.actionBand = function (dato,id) {
        console.log(dato)
        if(dato == 1){
            var url = 'https://myconcert1.azurewebsites.net/api/Main/GET/spActivateBand/'+id;
            $http.get(url).success(function (data, status, headers, config) {
            }).error(function (data, status, headers, config) {
                console.log("Error retrieving data from Spotify...");
            });
        }else{
            var url = 'https://myconcert1.azurewebsites.net/api/Main/GET/spDeactivateBand/'+id;
            $http.get(url).success(function (data, status, headers, config) {
            }).error(function (data, status, headers, config) {
                console.log("Error retrieving data from Spotify...");
            });

        }


    }

}]);


