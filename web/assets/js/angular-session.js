var security = angular.module('ngSecurity',['ngCookies','ui-notification']);


security.factory("Security", function($cookies,Notification){
    /*var exampleVar = ["str1", "str2", "str3"];*/

    var facade = {};

    facade.verifySession = function () {
        var user = $cookies.get('zUserName',{path: '/fanatico/'});

        if(user != undefined && user != "expired"){
            Notification.success({message:"Sesión iniciada como:"+user, title: 'Iniciando sesión...'});
        }
        else{
            Notification.error({message:"No ha iniciado sesión.", title: 'Sesión inválida.'});
            setTimeout(function(){location.href="index.html"} , 10);
        }
    };

    facade.exitSession = function () {
        $cookies.put('zUserName', 'expired',{path: '/fanatico/'});
        $cookies.put('zUserType', 'expired',{path: '/fanatico/'});
        Notification.info({message:"Se ha cerrado la sesión.", title: 'Cerrando sesión...'});
        setTimeout(function(){location.href="../../index.html"} , 1000);
    };


    /*var facade = {
        verifySession: function(){
            facade.verifySession = function () {
                var user = $cookies.get('zUserName');

                if(user != ""){
                    Notification.success({message:"Sesión iniciada como:"+user, title: 'Iniciando sesión...'});
                }
                else{
                    Notification.error({message:"No ha iniciado sesión.", title: 'Html content'});
                    setTimeout(function(){location.href="index.html"} , 10);
                }
            };
        }
    };*/
    return facade;
});