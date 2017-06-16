var app = angular.module('mainModule', ['angular-loading-bar','ui-notification','ngSecurity']);

app.controller('cartelerasController',['$scope','$http','$interval','Notification','Security','initModel',
                            function ($scope,$http,$interval,Notification,Security,initModel){
    $scope.carteleras = [];
    $scope.festivales = [];
    $scope.currentCarteleras = [];
    $scope.currentCarteleraIndex = 0;
    $scope.currentFestivales = [];
    $scope.currentFestivalIndex = 0;

    $scope.visibleFestivalModal = false;
    $scope.visibleBandModal = false;

    $scope.selectedFestival = [];
    $scope.currentFestivalCategory = -1;
    $scope.categories = [];

    $scope.playingSong = false;
    $scope.audio = new Audio();
    $scope.data = [];
    $scope.songs = [];
    $scope.selectedBand = [];
    $scope.completeStars = [];
    $scope.blankStars = [];
    $scope.cBand = [];
    $scope.currentComment = [];
    $scope.currentComment.rating = 0;
    $scope.currentComment.prevrating = 0;
    $scope.currentComment.data = "";
    $scope.currentComment.title = "";
    $scope.audio.addEventListener('ended', function(){
        $scope.playingSong = false;
    });
    
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

    $scope.readFestivalesData = function() {
        $http.get("https://myconcert1.azurewebsites.net/api/Main/GET/spGetAllFestivals/").success(function (response) {
            //$http.get("../assets/docs/festivales.txt").success(function (response) {
            response = JSON.parse(response);

            if (response.spGetAllFestivals.length > 0) {
                for (j = 0; j < response.spGetAllFestivals.length; j++) {
                    var festival = new Object();

                    festival.localIndex = j;
                    festival.id = response.spGetAllFestivals[j].id;
                    festival.name = response.spGetAllFestivals[j].name;
                    festival.description = response.spGetAllFestivals[j].description;
                    festival.location = response.spGetAllFestivals[j].location;
                    festival.date = response.spGetAllFestivals[j].date;
                    festival.place = response.spGetAllFestivals[j].place;
                    festival.image = "../assets/"+response.spGetAllFestivals[j].image;
                    $scope.festivales.push(festival);
                }
            }
            $scope.changeCurrentFestivales(2);
        });
    };

    $scope.readCategoriesData = function(pFestivalID) {
        //$http.get("../assets/docs/festival2.txt").success(function (response) {
        $http.get("https://myconcert1.azurewebsites.net/api/Main/GET/FestivalInfo/"+pFestivalID).success(function (responseStr) {
            var response = JSON.parse(responseStr);

            $scope.categories = [];
            $scope.currentFestivalCategory = -1;
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
                        band.spotifyID = response.categories[j].bands[k].spotifyID;
                        band.rating = response.categories[j].bands[k].rating;
                        band.members = response.categories[j].bands[k].members;
                        band.genders = response.categories[j].bands[k].genres;
                        band.comments = response.categories[j].bands[k].comments;
                        band.image = response.categories[j].bands[k].image;
                        band.followers = response.categories[j].bands[k].followers;
                        band.popularity = response.categories[j].bands[k].popularity;
                        bands.push(band);
                    }
                    category.bands = bands;

                    $scope.categories.push(category);
                }
            }
        });
    };

    $scope.readSongsData = function() {
        $http.get("https://myconcert1.azurewebsites.net/api/Spotify/getSongs/"+$scope.selectedBand.spotifyID).success(function (response) {
            console.log(response);
            var response = JSON.parse(response);

            if (response.songs.length > 0) {
                for (j = 0; j < response.songs.length; j++) {
                    var song = {};

                    song.localIndex = j;
                    song.name = response.songs[j].name;
                    song.url = response.songs[j].url;
                    if(song.url != null)
                        $scope.songs.push(song);
                }
            }
        });
    };


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
        if(($scope.data.SelectedSong.localIndex+1) < $scope.songs.length){
            $scope.data.SelectedSong = $scope.songs[$scope.data.SelectedSong.localIndex+1];
            $scope.playSong();
        }
        else{
            $scope.data.SelectedSong = $scope.songs[0];
            $scope.playSong();
        }
    };

    $scope.prevSong = function () {
        if(($scope.data.SelectedSong.localIndex-1) >= 0){
            $scope.data.SelectedSong = $scope.songs[$scope.data.SelectedSong.localIndex-1];
            $scope.playSong();
        }
        else{
            $scope.data.SelectedSong = $scope.songs[$scope.songs.length-1];
            $scope.playSong();
        }
    };

    $scope.openVoteWindow = function (IDCartelera) {
        window.location = "vote.html#?IDCartelera="+IDCartelera;
    };


    $scope.closeFestivalModal = function () {
        $scope.visibleFestivalModal = false;
        $scope.categories = [];
        $scope.currentFestivalCategory = -1;
    };

    $scope.showFestivalModal = function (pFestivalIndex) {
        $scope.selectedFestival = $scope.festivales[pFestivalIndex];
        $scope.visibleFestivalModal = true;
        $scope.readCategoriesData($scope.selectedFestival.id);

    };

    $scope.closeBandModal = function () {
        $scope.pauseSong();
        $scope.audio = new Audio();
        $scope.visibleBandModal = false;
        $scope.data = [];
        $scope.songs = [];
        $scope.selectedBand = [];
        $scope.completeStars = [];
        $scope.blankStars = [];
        $scope.cBand = [];
        $scope.selectedBand.image = "";
        $scope.currentComment = [];
        $scope.currentComment.rating = 0;
        $scope.currentComment.prevrating = 0;
        $scope.currentComment.data = "";
        $scope.currentComment.title = "";
    };

    $scope.showBandModal = function (pBandIndex,pCategoryIndex) {
        $scope.visibleBandModal = true;

        $scope.selectedBand = $scope.categories[pCategoryIndex].bands[pBandIndex];
        $scope.readSongsData();
        for(i = 0; i< $scope.selectedBand.rating; i++){
            $scope.completeStars.push(i);
        }
        for(i = 0; i< 5-$scope.completeStars.length; i++){
            $scope.blankStars.push(i);
        }
    };


    $scope.sendNewComment = function () {
        if($scope.currentComment.rating != 0){
            if($scope.currentComment.title){
                if($scope.currentComment.data) {

                    var parameter = JSON.stringify({
                        userID: Security.getCurrentUserEmail().toString(),
                        bandID: $scope.selectedBand.id.toString(),
                        points: $scope.currentComment.rating.toString(),
                        comment: $scope.currentComment.title+": "+ $scope.currentComment.data.toString()
                    });

                    $http.post('https://myconcert1.azurewebsites.net/api/Funcs/addCommentCalification', parameter).success(function (response, status, headers, config) {
                        $scope.closeBandModal();
                        $scope.closeFestivalModal();
                    }).error(function (data, status, headers, config) {
                        console.log(data);
                    });



                    $scope.closeBandModal();
                    Notification.success({message: 'Comentario enviado...', delay: 2000});
                }
                else
                    Notification.error({message: 'Ingrese un comentario', delay: 2000});
            }
            else
                Notification.error({message: 'Ingrese un título', delay: 2000});
        }
        else
            Notification.error({message: 'Ingrese una calificación', delay: 2000});
    };

    $scope.changeCurrentFestivalCategory = function (pCurrentCategoryID) {
        $scope.currentFestivalCategory = pCurrentCategoryID;
    };

    $scope.restoreCommentRating = function (pRating) {
        $scope.currentComment.rating = $scope.currentComment.prevrating;
    };
    $scope.updateCommentRating = function (pRating) {
        $scope.currentComment.rating = pRating;
    };
    $scope.selectCommentRating = function (pRating) {
        $scope.currentComment.rating = pRating;
        $scope.currentComment.prevrating = pRating;
    };

    /************** AUX FUNCTIONS ****************/
    $scope.getNumber = function(num) {
        var obj = [];
        for(i = 0; i < num; i++)
            obj.push(i);
        return obj;
    };

    $scope.xExitSession = function () { Security.exitSession(); };
    $scope.xGotoProfile = function () { Security.gotoProfile(); };

    /************************** Festivales/Carteleras Carrousel *********************************/
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

    $scope.exitSession = function () {
        Security.exitSession();
    };


    Security.verifySessionInit(2);

    $interval($scope.changeCurrentCartelerasAuto, 5000);
    $interval($scope.changeCurrentFestivalesAuto, 5000);
    $scope.readCartelerasData();
    $scope.readFestivalesData();

}]);