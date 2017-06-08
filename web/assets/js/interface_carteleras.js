var app = angular.module('mainModule', ['720kb.datepicker','spotify','angular-loading-bar','ngSecurity','ui-notification']);


app.controller('cartelerasController',['$scope','$http','Security','$filter',"Notification","cartelerasModel",
                            function ($scope,$http,Security,$filter,Notification,cartelerasModel,$timeout) {
    $scope.prueba = cartelerasModel.getVotos();
    console.log($scope.prueba);
    $scope.currentCategory = -1;
    $scope.carteleras = [];
    $scope.selectedCartelera = [];
    $scope.selectedBands = [];
    $scope.chefBand = [];
    $scope.bandas = [];
    $scope.userType =  Security.getCurrentUserType();
    $scope.listaCategorias = [];
    $scope.categoriasIncluidas = [];
    $scope.regBandas = [];
    $scope.visibleFestivalModal = false;
    $scope.currentCarteleraCategory = -1;
    $scope.currentStep = 1;
    $scope.playingSong = false;
    $scope.audio = new Audio();
    $scope.data = [];
    $scope.songs = [];
    $scope.confirmFestival = false;
    $scope.audio.addEventListener('ended', function(){
        $scope.playingSong = false;
    });

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


        console.log(JSON.stringify($scope.categoriasIncluidas,null,""));
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
            //catTemp.localID = localid;
            catTemp.name = name;
            catTemp.bandas = [];
            $scope.categoriasIncluidas.push(catTemp);
        }
    };

    $scope.readCategorias = function () {
        $scope.listaCategorias = [];
        var url = 'https://myconcert1.azurewebsites.net/api/Main/GET/spGetAllCategories/';
        $http.get(url).success(function (data, status, headers, config) {
            var response = JSON.parse(data);
            for (j = 0; j < response.spGetAllCategories.length; j++) {
                var category = new Object();
                category.name = response.spGetAllCategories[j].Name;
                category.localID  = response.spGetAllCategories[j].PK_ID_CATEGORY;
                $scope.listaCategorias.push(category);
            }
        }).error(function (data, status, headers, config) {
            console.log("Error retrieving data from Spotify...");
        });

    };

    $scope.readCartelerasData = function() {
        $http.get("../assets/docs/carteleras.txt").success(function (response) {
        //$http.get("https://myconcert1.azurewebsites.net/api/Main/GET/spGetAllBillboards/").success(function (response) {
            //response = JSON.parse(response);
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
        });
    };

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
        }).error(function (data, status, headers, config) {
            console.log("Error retrieving data from Spotify...");
        });

    };

    $scope.readCategoriesData = function(pCarteleraID) {
        $http.get("../assets/docs/cartelera_inf.txt").success(function (response) {
            //$http.get("https://myconcert1.azurewebsites.net/api/Main/GET/FestivalInfo/"+pCarteleraID).success(function (responseStr) {

            //var response = JSON.parse(response);

            $scope.selectedCartelera.categories = [];
            if (response.categories.length > 0) {
                for (j = 0; j < response.categories.length; j++) {
                    var category = new Object();
                    var bands = [];

                    category.localID = j;
                    category.name = response.categories[j].name;

                    for(k = 0; k < response.categories[j].bands.length; k++){
                        var band = new Object();
                        band.localID = k;
                        band.id = response.categories[j].bands[k].id;
                        band.name = response.categories[j].bands[k].name;
                        band.image = response.categories[j].bands[k].image;
                        band.votes = response.categories[j].bands[k].votes;
                        band.percentage = response.categories[j].bands[k].percentage;
                        bands.push(band);
                    }
                    category.bands = bands;
                    category.winningNumber = 0;
                    category.done = false;
                    $scope.selectedCartelera.categories.push(category);
                }
            }
        });
    };

    $scope.readChefBandData = function(pCarteleraID) {
        $http.get("../assets/docs/bandd.txt").success(function (response) {
            //$http.get("https://myconcert1.azurewebsites.net/api/Main/GET/FestivalInfo/"+pCarteleraID).success(function (responseStr) {

            //var response = JSON.parse(response);

            $scope.chefBand = [];
            $scope.chefBand.id = response.id;
            $scope.chefBand.name = response.name;
            $scope.chefBand.image = response.image;
            $scope.chefBand.followers = response.followers;
            $scope.chefBand.popularity = response.popularity;
            $scope.chefBand.rating = response.rating;
            $scope.chefBand.members = response.members;
            $scope.chefBand.genres = response.genres;
            $scope.chefBand.songs = response.songs;
        });
    };

    $scope.writeCreateFestival = function () {
        var categories = [];
        for(z=0; z < $scope.selectedCartelera.categories.length; z++){
            var category = new Object();
            category.name = $scope.selectedCartelera.categories[z].name;
            var bands = [];
            for(k=0; k < $scope.selectedCartelera.categories[z].winningNumber; k++){
                var band = new Object();
                band.id = $scope.selectedCartelera.categories[z].bands[k].id;
                band.name = $scope.selectedCartelera.categories[z].bands[k].name;
                band.money = $scope.selectedCartelera.categories[z].bands[k].votes;
                bands.push(band);
            }
            category.bands = bands;
            categories.push(category);
        }

        var chefCategory = new Object();
        chefCategory.name = "Recomendación del Chef";
        var chefBands = [];
        var chefBand = new Object();
        chefBand.id = $scope.chefBand.id;
        chefBand.name = $scope.chefBand.name;
        chefBand.money = 0;
        chefBands.push(chefBand);
        chefCategory.bands = chefBands;
        categories.push(chefCategory);


        var festival = JSON.stringify({
            name: $scope.selectedCartelera.name,
            location: $scope.selectedCartelera.location,
            date: $scope.data.Date,
            place: $scope.data.Place,
            description: $scope.data.Description,
            categories: categories
        });

        console.log(festival);

        /*$http.post('https://myconcert1.azurewebsites.net/api/Verify/Login', parameter).success(function (data, status, headers, config) {
            var response = JSON.parse(data);
            if(response.State == 0){
                $scope.showMessage('error','Error','Credenciales Inválidas',2000);
            }
            else{
                Security.initSession($scope.data.Username.toString(),response.State);
            }
        }).error(function (data, status, headers, config) {
            console.log(data);
        });*/

    };

    $scope.changeCurrentCategory = function (pCurrentCategoryID) {
        $scope.currentCategory = pCurrentCategoryID;
    };

    $scope.closeCreateFestivalModal = function () {
        $scope.playingSong = false;
        $scope.visibleFestivalModal = false;
        $scope.selectedCartelera = [];
        $scope.selectedBands = [];
        $scope.currentCarteleraCategory = -1;
        $scope.currentStep = 1;
        $scope.data=[];
    };

    $scope.showCreateFestivalModal = function (pCarteleraIndex) {
        $scope.audio = new Audio();
        $scope.songs = [];
        $scope.data=[];
        $scope.currentStep = 1;
        $scope.visibleFestivalModal = true;
        $scope.selectedCartelera = $scope.carteleras[pCarteleraIndex];
        $scope.readCategoriesData($scope.selectedCartelera.id);
    };



    $scope.changeCurrentCarteleraCategory = function (pCurrentCategoryID) {
        if(pCurrentCategoryID == $scope.currentCarteleraCategory){
            $scope.currentCarteleraCategory = -1;
            $scope.selectedBands = [];
        }
        else {
            $scope.currentCarteleraCategory = pCurrentCategoryID;
            $scope.selectedBands = $scope.selectedCartelera.categories[pCurrentCategoryID].bands;
        }
    };

    //********* AUX FUNCTIONS ************
    $scope.playSong = function () {
        if($scope.data.SelectedSong != undefined && $scope.data.SelectedSong.url != "") {
            $scope.playingSong = true;
            $scope.audio.src = $scope.data.SelectedSong.url.toString();
            $scope.audio.play();
        }
        else
            Notification.error({message: 'Por favor seleccione una canción',title: 'Error de Reprodución', delay: 2000});
    };

    $scope.pauseSong = function() {
        if ($scope.audio.src) {
            $scope.playingSong = false;
            $scope.audio.pause();
        }
    };

    $scope.nextSong = function () {
        if( parseInt($scope.data.SelectedSong.localIndex)+1 < $scope.chefBand.songs.length){
            $scope.data.SelectedSong = $scope.chefBand.songs[parseInt($scope.data.SelectedSong.localIndex)+1];
            $scope.playSong();
        }
        else{
            $scope.data.SelectedSong = $scope.chefBand.songs[0];
            $scope.playSong();
        }
    };

    $scope.prevSong = function () {
        if(parseInt($scope.data.SelectedSong.localIndex)-1 >= 0){
            $scope.data.SelectedSong = $scope.chefBand.songs[parseInt($scope.data.SelectedSong.localIndex)-1];
            $scope.playSong();
        }
        else{
            $scope.data.SelectedSong = $scope.chefBand.songs[$scope.chefBand.songs.length-1];
            $scope.playSong();
        }
    };

    $scope.xExitSession = function () { Security.exitSession(); };
    $scope.xGotoProfile = function () { Security.gotoProfile(); };

    $scope.getPercentage = function (pSelectedBandIndex) {
        return $scope.selectedBands[pSelectedBandIndex].percentage;
    };
    $scope.isBandEnabled = function (pBandLocalIndex) {
        if(pBandLocalIndex < $scope.selectedCartelera.categories[$scope.currentCarteleraCategory].winningNumber)
            return false;
        else
            return true;
    };

    $scope.changeBandsWinningNumber = function (pAddOrSubstract) {
        var currentCategory = $scope.selectedCartelera.categories[$scope.currentCarteleraCategory];
        if(pAddOrSubstract == 0){
            if(currentCategory.winningNumber + 1  <= currentCategory.bands.length){
                currentCategory.winningNumber+=1;
            }
        }
        else if(pAddOrSubstract == 1){
            if(currentCategory.winningNumber - 1  >= 0){
                currentCategory.winningNumber-=1;
            }
        }
        $scope.checkDoneCategory(currentCategory);
    };
    $scope.changeStep = function (pRightOrLeft) {
        if(pRightOrLeft == 0){
            if($scope.currentStep==1){
                if($scope.checkCategories()){
                    if($scope.currentStep + 1  <= 3) {
                        $scope.currentStep += 1;
                        $scope.readChefBandData();
                    }
                }
            }
            else{
                if($scope.currentStep + 1  <= 3) {
                    $scope.currentStep += 1;
                    $scope.readChefBandData();
                    $scope.pauseSong();
                }
            }
        }
        else if(pRightOrLeft == 1){
            if($scope.currentStep -1  >= 1)
                $scope.currentStep-=1;
        }
    };
    $scope.toggleConfirmFestival = function () {
        $scope.confirmFestival = !$scope.confirmFestival;
    };
    $scope.checkDoneCategory = function (pCategory) {
        if(pCategory.winningNumber != 0)
            pCategory.done = true;
        else
            pCategory.done = false;
    };
    $scope.checkCategories = function () {
        var categories = $scope.selectedCartelera.categories;
        var done = true;
        if($scope.data.Date != undefined && $scope.data.Date != "") {
            if ($scope.data.Place != undefined && $scope.data.Place != "") {
                if ($scope.data.Description != undefined && $scope.data.Description != "") {
                    done = true;
                }
                else {
                    Notification.error({message: 'Ingrese una descripción.',title: 'Información incompleta',delay: 2000});
                    done = false;
                }
            }
            else {
                Notification.error({message: 'Ingrese una lugar para el evento.', title: 'Información incompleta', delay: 2000});
                done = false;
            }
        }
        else{
            Notification.error({message: 'Ingrese una fecha para el evento.',title: 'Información incompleta', delay: 2000});
            done = false;
        }

        for(i=0; i< categories.length; i++){
            if(categories[i].done == false){
                Notification.error({message: 'Categoría '+categories[i].name +' pendiente.',title: 'Información incompleta', delay: 2000});
                done = false;
            }
        }
        return done;
    };

    Security.verifySession();
    $scope.readBandas();
    $scope.readCategorias();
    $scope.readCartelerasData();

    $scope.postArtista = function(){
        console.log("Hola");
        console.log(JSON.stringify($scope.categoriasIncluidas[0].bandas[0]));
    }
}]);