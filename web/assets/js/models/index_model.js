
app.service("indexModel",['$http','Security','Notification',function ($http,Security,Notification) {

    this.verifyLogin = function (data) {
        if(this.isValid(data.Username)) {
            Notification.error({message: 'Por favor ingrese un nombre de usuario válido', title: 'Error', delay: 2000});
        }
        else if (this.isValid(data.Password)) {
            Notification.error({message: 'Por favor ingrese una contraseña válida', title: 'Error', delay: 2000});
        }
        else{
            Notification.success({message: 'Iniciando Sesión', delay: 2000});

            var parameter = JSON.stringify({
                Email: data.Username.toString(),
                Password: data.Password.toString()
            });

            $http.post('https://myconcert1.azurewebsites.net/api/Verify/Login', parameter).success(function (response, status, headers, config) {
                var response = JSON.parse(response);
                if(response.State == 0){
                    Notification.error({message: 'Credenciales Inválidas', title: 'Error', delay: 2000});
                }
                else{
                    Security.initSession(data.Username,response.State);
                }
            }).error(function (data, status, headers, config) {
                console.log(data);
            });
        }
    };

    this.isValid = function(value) {
        return !value
    };

}]);