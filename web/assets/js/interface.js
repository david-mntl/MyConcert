var app = angular.module('mainModule', ['angular-loading-bar','angularNotify']);

app.controller('mainController',['$scope','$http',function ($scope,$http) {

    $scope.data = [];

    //http://myconcert1.azurewebsites.net/api/Country
    $scope.login = function () {
        console.log($scope.data.Username);
        console.log($scope.data.Password);

        if($scope.isValid($scope.data.Username)) {
            $scope.showMessage('error','Error','Por favor ingrese un nombre de usuario válido.',2000);
        }
        else if ($scope.isValid($scope.data.Password)) {
            $scope.showMessage('error','Error','Por favor ingrese una contraseña válida.',2000);
        }
        else{
            $scope.showMessage('success','Iniciando sesión...','',2000);
        }


        /*$http.get('http://myconcert1.azurewebsites.net/api/Country').
        success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available

            console.log("status " + status);
            console.log("config " + data);

        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(data);
            console.log(status);
        });*/
    };

    $scope.isValid = function(value) {
        return !value
    }

    $scope.showMessage = function (pType,pTitle,pMessage,pTimeout) {
        var notify = {
            type: pType,
            title: pTitle,
            content: pMessage,
            timeout: pTimeout //time in ms
        };
        $scope.$emit('notify', notify);
    }

}]);
