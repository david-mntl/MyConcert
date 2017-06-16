var app = angular.module('mainModule', ['angular-loading-bar','ui-notification','ngSecurity']);


app.controller('festivalesController',['$scope','$http','Security','Notification',function ($scope,$http,Security,Notification) {
    $scope.idCancelarFestival =0;
    $scope.festivales = [];
    $scope.visibleFestivalModal = false;
    $scope.visibleBandModal = false;
    $scope.visibleHowtoChef = false;

    $scope.userType =  Security.getCurrentUserType();
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

    $scope.userType = Security.getCurrentUserType();

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
                    festival.state = response.spGetAllFestivals[j].state;
                    festival.description = response.spGetAllFestivals[j].description;
                    festival.location = response.spGetAllFestivals[j].location;
                    festival.date = response.spGetAllFestivals[j].date;
                    festival.place = response.spGetAllFestivals[j].place;
                    festival.image = "../assets/"+response.spGetAllFestivals[j].image;
                    $scope.festivales.push(festival);
                }
            }
        });
    };
    $scope.cancelFestivalAux = function (id) {
        $scope.idCancelarFestival =id;
    };
    $scope.cancelFestival = function () {
        console.log("JOJOJ");
        var url = 'https://myconcert1.azurewebsites.net/api/Main/GET/spDeactivateFestival/'+$scope.idCancelarFestival;
        $http.get(url).success(function (data, status, headers, config) {
        }).error(function (data, status, headers, config) {
            console.log("Error cancelando la cartelera...");
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
    $scope.toggleHowToChef = function () { $scope.visibleHowtoChef = !$scope.visibleHowtoChef; };

    Security.verifySession();
    $scope.readFestivalesData();
}]);