var app = angular.module('mainModule', ['angular-loading-bar','ui-notification','ngRoute','ngAnimate','ngSecurity']);


app.controller('mainController',['$scope','$http','$window','Notification','$location','$interval','Security',function ($scope,$http,$window,Notification,$location,$interval,Security) {

    $scope.cartelera = [];
    $scope.categories = [];
    $scope.currentCarteleraCategory = -1;

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

    $scope.readURLParams = function () {
        //URL Example: https://myconcert.fun/web/fanatico/vote.html#?IDConcert=5050
        var param = $location.search();
        if(param.IDCartelera != ""){
            $scope.readCategoriesData(param.IDCartelera);
        }
    };


    $scope.readCategoriesData = function(pCarteleraID) {
        //$http.get(pURL).success(function (response) {
        $http.get("../assets/docs/cartelera.txt").success(function (response) {
            $scope.categories = [];
            $scope.currentCarteleraCategory = -1;


            $scope.cartelera.id = response.id;
            $scope.cartelera.name = response.name;
            $scope.cartelera.image = "../assets/"+response.image;
            $scope.cartelera.description = response.description;
            $scope.cartelera.location = response.location;

            if (response.categories.length > 0) {
                for (j = 0; j < response.categories.length; j++) {
                    var category = new Object();
                    var bands = [];

                    category.localID = j;
                    category.name = response.categories[j].name;
                    category.done = false;
                    category.money = 100;

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
                        band.money = 0;
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


    var promise;
    $scope.mouseDown = function (bandLocalID,pType) {
        if(promise){
            $interval.cancel(promise);
        }
        promise = $interval(function () {
            if(pType == 0)
                $scope.addMoneyToCurrentBand(bandLocalID,10);
            else if(pType == 1)
                $scope.subMoneyFromCurrentBand(bandLocalID,10);
        }, 150);
    };
    $scope.mouseUp = function () {
        $interval.cancel(promise);
        promise = null;
    };

    $scope.sendVote = function () {
        var ready = true;
        for(i = 0; i < $scope.categories.length; i++){
            if($scope.categories[i].done == false){
                var pMessage = 'Aún tiene $'+$scope.categories[i].money+' disponibles en la categoría ' + $scope.categories[i].name;
                Notification.error({message: pMessage ,title:'¡Atención!', delay: 2000});
                ready = false;
            }
        }
        if(ready)
            Notification.success({message: 'Enviando voto...' ,title:'¡Completado!', delay: 2000});
    };
    
    $scope.addMoneyToCurrentBand = function (bandLocalID,pQuantity) {
        var category = $scope.categories[$scope.currentCarteleraCategory]
        var band = category.bands[bandLocalID];
        if(category.money > 0){
            if(pQuantity < category.money) {
                band.money += pQuantity;
                category.money -= pQuantity;
            }
            else{
                band.money = band.money + category.money;
                category.money = 0;
            }
        }
        else{
            Notification.warning({message: 'Ya ha utilizado todo el dinero de esta categoría.', title:'¡Atención!', delay: 2000});
        }
        if(category.money == 0)
            category.done = true;
        else
            category.done = false;
    };

    $scope.subMoneyFromCurrentBand = function (bandLocalID,pQuantity) {
        var category = $scope.categories[$scope.currentCarteleraCategory]
        var band = category.bands[bandLocalID];
        if(band.money > 0){
            if(band.money > pQuantity) {
                band.money -= pQuantity;
                category.money += pQuantity;
            }
            else{
                category.money += band.money;
                band.money = 0;
            }
        }
        if(category.money > 0)
            category.done = false;
        else
            category.done = true;
    };

    $scope.getBandImage = function (bandID) {
        Spotify.getArtist(bandID).then(function (data) {
            console.log(data.data.images[0].url);
        });
    };

    $scope.changeCurrentCarteleraCategory = function (pCurrentCategoryID) {
        if(pCurrentCategoryID == $scope.currentCarteleraCategory)
            $scope.currentCarteleraCategory = -1;
        else
            $scope.currentCarteleraCategory = pCurrentCategoryID;
    };


    /******************* *****************/

    $scope.closeHowVoteModal = function () {
        $scope.visibleHowVoteModal = false;
    };

    $scope.showHowVoteModal = function () {
        $scope.visibleHowVoteModal = true;
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

    /********* AUX FUNCTIONS **********/
    $scope.getNumber = function(num) {
        var obj = [];
        for(i = 0; i < num; i++)
            obj.push(i);
        return obj;
    };

    $scope.xExitSession = function () { Security.exitSession(); };
    $scope.xGotoProfile = function () { Security.gotoProfile(); };

    Security.verifySessionInit();
    //$scope.readCategoriesData();
    $scope.readURLParams();
}]);
