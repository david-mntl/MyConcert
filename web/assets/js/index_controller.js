var app = angular.module('mainModule', ['angular-loading-bar','ngSecurity']);

app.controller('mainController',['$scope','indexModel','Security',function ($scope,indexModel,Security) {

    $scope.data = {};

    $scope.login = function () {
        indexModel.verifyLogin($scope.data);
    };

    Security.verifySessionInHome();

}]);
