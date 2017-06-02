var app = angular.module('mainModule', ['angular-loading-bar','angularNotify','ngSecurity']);

app.controller('mainController',['$scope','$http','$window','Security',function ($scope,$http,$window,Security) {
    $scope.data = [];
    $scope.universities = [];
    $scope.genres = [];
    $scope.choosedGenres = [];

    $scope.loading = true;

    $scope.getGenresFromServer = function () {
        $http.get('https://myconcert1.azurewebsites.net/api/Main/GET/spGetGenres').success(function (data, status, headers, config) {
            var response = JSON.parse(data);
            for(i = 0; i < response.spGetGenres.length; i++){
                var genre = {};
                genre.name = response.spGetGenres[i].Name;
                genre.id = response.spGetGenres[i].PK_ID_GENRE;
                $scope.genres.push(genre);
            }

        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    };

    $scope.getUniversitiesFromServer = function () {
        $http.get('https://myconcert1.azurewebsites.net/api/Main/GET/spGetUniversities').success(function (data, status, headers, config) {
            var response = JSON.parse(data);
            for(i = 0; i < response.spGetUniversities.length; i++){
                var university = {};
                university.name = response.spGetUniversities[i].Name;
                university.id = response.spGetUniversities[i].PK_ID_UNIVERSITY;
                $scope.universities.push(university);
            }

        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    };

    $scope.loadUserInfo = function () {
        var parameter = JSON.stringify({
            Email: 'fab@gmail.com'
        });

        $scope.data.University = [];
        $scope.data.Genre = [];
        $http.post('https://myconcert1.azurewebsites.net/api/GET/userInfo', parameter).success(function (data, status, headers, config) {
            var response = JSON.parse(data);
            $scope.data.Name = response.Name;
            $scope.data.LastName = response.LastName;
            $scope.data.Phone = response.Phone;

            //var date = new Date(parseInt(response.Birthdate.split("(")[1].split(")")[0]));

            $scope.data.University.id = response.FK_ID_University;
            //$scope.data.Genre.id = response.FK_ID_University;

            $scope.data.Description = response.PersonalDescription;

            $scope.loading = false;

        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    };

    /********* AUX FUNCTIONS **********/
    $scope.xExitSession = function () { Security.exitSession(); };
    $scope.xGotoProfile = function () { Security.gotoProfile(); };

    Security.verifySession();
    $scope.getGenresFromServer();
    $scope.getUniversitiesFromServer();
    $scope.loadUserInfo();
}]);
