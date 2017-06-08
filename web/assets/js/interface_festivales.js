var app = angular.module('mainModule', ['angular-loading-bar','ngSecurity']);


app.controller('festivalesController',['$scope','$http','Security',function ($scope,$http,Security) {
    $scope.festivales = [];

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

    $scope.readCategoriesData = function(pFestivalID) {
        //$http.get("../assets/docs/festival2.txt").success(function (response) {
        $http.get("https://myconcert1.azurewebsites.net/api/Main/GET/FestivalInfo/"+pFestivalID).success(function (responseStr) {
            var response = JSON.parse(responseStr);
            console.log(response);


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
        $scope.visibleBandModal = true;
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

    Security.verifySession();
    $scope.readFestivalesData();
}]);