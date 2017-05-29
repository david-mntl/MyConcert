var app = angular.module('mainModule', ['spotify','angular-loading-bar','ui-notification','ngCookies']);


app.controller('mainController',['$scope','$http','$window','Notification','$cookies','Spotify',function ($scope,$http,$window,Notification,$cookies,Spotify,$timeout) {

    $scope.cartelera = [];
    $scope.categories = [];
    $scope.currentCarteleraCategory = -1;

    $scope.selectedBand = [];
    $scope.completeStars = [];
    $scope.blankStars = [];
    $scope.cBand = [];
    $scope.currentComment = [];
    $scope.currentComment.rating = 0;
    $scope.currentComment.prevrating = 0;
    $scope.currentComment.data = "";
    $scope.currentComment.title = "";

    $scope.readCategoriesData = function() {
        $http.get("../assets/docs/festival.txt").success(function (response) {
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
                        band.name = response.categories[j].bands[k].name;
                        band.spotifyID = response.categories[j].bands[k].spotifyID;
                        band.rating = response.categories[j].bands[k].rating;
                        band.members = response.categories[j].bands[k].members;
                        band.genders = response.categories[j].bands[k].genders;
                        band.image = response.categories[j].bands[k].image;
                        band.comments = response.categories[j].bands[k].comments;
                        band.money = 0;
                        bands.push(band);


                    }
                    category.bands = bands;

                    $scope.categories.push(category);
                }
            }
        });
    };

    $scope.sendVote = function () {
        var ready = true;
        for(i = 0; i < $scope.categories.length; i++){
            if($scope.categories[i].done == false){
                var pMessage = 'Aún tiene dinero disponible en la categoría ' + $scope.categories[i].name;
                Notification.error({message: pMessage ,title:'¡Atención!', delay: 2000});
                ready = false;
            }
        }
        if(ready)
            Notification.success({message: 'Enviando voto...' ,title:'¡Completado!', delay: 2000});
    };
    
    $scope.addMoneyToCurrentBand = function (bandLocalID) {
        var category = $scope.categories[$scope.currentCarteleraCategory]
        var band = category.bands[bandLocalID];
        if(category.money > 0){
            band.money+=10;
            category.money-=10;
        }
        else{
            Notification.warning({message: 'Ya ha utilizado todo el dinero de esta categoría.', title:'¡Atención!', delay: 2000});
        }
        if(category.money == 0)
            category.done = true;
        else
            category.done = false;
    };

    $scope.subMoneyFromCurrentBand = function (bandLocalID) {
        var category = $scope.categories[$scope.currentCarteleraCategory]
        var band = category.bands[bandLocalID];
        if(band.money > 0){
            band.money-=10;
            category.money+=10;
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
        $scope.currentCarteleraCategory = pCurrentCategoryID;
    };


    /******************* *****************/

    $scope.closeHowVoteModal = function () {
        $scope.visibleHowVoteModal = false;
    };

    $scope.showHowVoteModal = function () {
        $scope.visibleHowVoteModal = true;
    };

    $scope.getArtistInformation = function (pID) {
        Spotify.getArtist(pID).then(function (data) {
            $scope.selectedBand.image = data.data.images[0].url;
            $scope.selectedBand.followers = data.data.followers.total;
            $scope.selectedBand.popularity = data.data.popularity;
        });
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
        $scope.selectedBand.image = "";
        $scope.selectedBand.followers = 0;
        $scope.selectedBand.popularity = 0;

        for(i = 0; i< $scope.selectedBand.rating; i++){
            $scope.completeStars.push(i);
        }
        for(i = 0; i< 5-$scope.completeStars.length; i++){
            $scope.blankStars.push(i);
        }
        $scope.getArtistInformation($scope.selectedBand.spotifyID);
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

    $scope.getNumber = function(num) {
        var obj = [];
        for(i = 0; i < num; i++)
            obj.push(i);
        return obj;
    };

    $scope.readCategoriesData();

}]);

