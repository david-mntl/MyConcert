var app = angular.module('mainModule', ['angular-loading-bar','angularNotify','ngCookies','ngSecurity']);

app.controller('mainController',['$scope','$http','$cookies','$window','Security',function ($scope,$http,$cookies,$window,Security) {

    $scope.data = [];

    //http://myconcert1.azurewebsites.net/api/Country
    $scope.login = function () {
        if($scope.isValid($scope.data.Username)) {
            $scope.showMessage('error','Error','Por favor ingrese un nombre de usuario válido.',2000);
        }
        else if ($scope.isValid($scope.data.Password)) {
            $scope.showMessage('error','Error','Por favor ingrese una contraseña válida.',2000);
        }
        else{
            $scope.showMessage('success','Iniciando sesión...','',2000);

            var parameter = JSON.stringify({
                Email: $scope.data.Username.toString(),
                Password: $scope.data.Password.toString()
            });

            $http.post('https://myconcert1.azurewebsites.net/api/Verify/Login', parameter).success(function (data, status, headers, config) {
                var response = JSON.parse(data);
                if(response.State == 0){
                    $scope.showMessage('error','Error','Credenciales Inválidas',2000);
                }
                else{
                    Security.initSession($scope.data.Username.toString(),response.State);
                }
            }).error(function (data, status, headers, config) {
                console.log(data);
            });
        }
    };




    $scope.isValid = function(value) {
        return !value
    };

    $scope.showMessage = function (pType,pTitle,pMessage,pTimeout) {
        var notify = {
            type: pType,
            title: pTitle,
            content: pMessage,
            timeout: pTimeout //time in ms
        };
        $scope.$emit('notify', notify);
    };

    Security.verifySessionInHome();

}]);
