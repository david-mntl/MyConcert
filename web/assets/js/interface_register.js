var app = angular.module('mainModule', ['720kb.datepicker','angular-loading-bar','angularFileUpload']);


app.controller('mainController',['$scope','$http','$window',function ($scope,$http,$window) {
    $scope.profiles = [{value: 'prof_1',label: 'Fanático'}, {value: 'prof_2',label: 'Promoción'}];
    $scope.universities = [{value: 'uni_1',label: 'Tecnológico de Costa Rica'}, {value: 'uni_2',label: 'Universidad de Costa Rica'},
                           {value: 'uni_3',label: 'Universidad Nacional de Costa Rica'}, {value: 'uni_4',label: 'Universidad Técnica Nacional'}];
    $scope.genres = [{value: 'gen_1',label: 'Rock'}, {value: 'gen_2',label: 'Pop'},
                    {value: 'gen_3',label: 'Reggae'}, {value: 'gen_4',label: 'Blues'}];
    $scope.choosedGenres = [];

    $scope.sendRegisterForm = function() {
        console.log("Name " + $scope.data.Name);
        console.log("LastName " + $scope.data.LastName);
        console.log("Phone " + $scope.data.Phone);
        /*console.log("Country " + $scope.data.Country);*/
        console.log("BirthDate " + $scope.data.BirthDate);

        console.log("NEW " + $scope.data.nn);
        console.log("NEW222 " + $scope.selectedItem.label);
    };
    $scope.addGenre = function() {
        if($scope.data.Genre.label != "" && $scope.choosedGenres.indexOf($scope.data.Genre.label) == -1){
            if($scope.data.GenresList == undefined) {
                $scope.data.GenresList = $scope.data.Genre.label;
                $scope.choosedGenres.push($scope.data.Genre.label);
            }
            else {
                $scope.data.GenresList = $scope.data.GenresList + "," + $scope.data.Genre.label;
                $scope.choosedGenres.push($scope.data.Genre.label);
            }
        }
    };


    $scope.openUploadWindow = function(files) {
        /*$window.open('upload/docs.html', "_blank",'width=600, height=200, resize=none');*/
        PopupCenter('upload/docs.html','Subir Imagen','600','200');
    };

}]);

function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}