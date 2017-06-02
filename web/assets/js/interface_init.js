var app = angular.module('mainModule', ['spotify','angular-loading-bar','ui-notification','ngSecurity']);

app.controller('cartelerasController',['$scope','$http','$interval','Spotify','Notification','Security',function ($scope,$http,$interval,Spotify,Notification,Security) {
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

    $scope.selectedBand = [];
    $scope.completeStars = [];
    $scope.blankStars = [];
    $scope.cBand = [];
    $scope.currentComment = [];
    $scope.currentComment.rating = 0;
    $scope.currentComment.prevrating = 0;
    $scope.currentComment.data = "";
    $scope.currentComment.title = "";
    var firstInit = true;
    
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
            $scope.changeCurrentCarteleras(2);
        });
    };

    $scope.readFestivalesData = function() {
        $http.get("../assets/docs/festivales.txt").success(function (response) {

            if (response.festivales.length > 0) {
                for (j = 0; j < response.festivales.length; j++) {
                    var festival = new Object();

                    festival.localIndex = j;
                    festival.id = response.festivales[j].id;
                    festival.name = response.festivales[j].name;
                    festival.description = response.festivales[j].description;
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


    $scope.readCategoriesData = function() {
        $http.get("../assets/docs/festival2.txt").success(function (response) {
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
                        band.name = response.categories[j].bands[k].name;
                        band.spotifyID = response.categories[j].bands[k].spotifyID;
                        band.rating = response.categories[j].bands[k].rating;
                        band.members = response.categories[j].bands[k].members;
                        band.genders = response.categories[j].bands[k].genders;
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

    $scope.openVoteWindow = function (IDCartelera) {
        console.log("ID",IDCartelera);
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
        $scope.readCategoriesData();

    };

    $scope.closeBandModal = function () {
        $scope.visibleBandModal = false;
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

        //$scope.selectedFestival = $scope.festivales[pFestivalIndex];
        $scope.visibleBandModal = true;
        //$scope.readCategoriesData();

        $scope.selectedBand = $scope.categories[pCategoryIndex].bands[pBandIndex];

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
                if($scope.currentComment.title) {
                    console.log("Calificación: " + $scope.currentComment.rating);
                    console.log("Titulo: " + $scope.currentComment.title);
                    console.log("Datos: " + $scope.currentComment.data);
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


    if(firstInit) {
        Security.verifySessionInit();
        firstInit = false;
    }

    $interval($scope.changeCurrentCartelerasAuto, 5000);
    $interval($scope.changeCurrentFestivalesAuto, 5000);
    $scope.readCartelerasData();
    $scope.readFestivalesData();

}]);