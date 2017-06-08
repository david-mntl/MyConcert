var security = angular.module('ngSecurity',['ngCookies','ui-notification']);


security.factory("Security", function($cookies,Notification){
    /*var exampleVar = ["str1", "str2", "str3"];*/

    var facade = {};

    facade.verifySession = function () {
        var user = $cookies.get('zUserName',{path: '/'});
        if(user == undefined || user == "expired"){
            Notification.error({message:"No ha iniciado sesión.", title: 'Sesión inválida.'});
            setTimeout(function(){location.href="../index.html"} , 10);
        };
        /*if(user != undefined && user != "expired"){
            //Notification.success({message:"Sesión iniciada como:"+user, title: 'Iniciando sesión...'});
            //console.log("Iniciando Sesión...");
        }
        else{
            Notification.error({message:"No ha iniciado sesión.", title: 'Sesión inválida.'});
            setTimeout(function(){location.href="../index.html"} , 10);
        }*/
    };

    facade.verifySessionInHome = function () {
        var user = $cookies.get('zUserName',{path: '/'});
        var type = $cookies.get('zUserType',{path: '/'});
        if(user != undefined && user != "expired"){
            Notification.success({message:"Sesión iniciada como:"+user, title: 'Iniciando sesión...'});
            if(type == 1)
                setTimeout(function(){location.href="../../promocion/promo.html"} , 10);
            else if(type == 2)
                setTimeout(function(){location.href="fanatico/init.html"} , 10);
        }
    };


    facade.verifySessionInit = function (pLocation) {
        var user = $cookies.get('zUserName',{path: '/'});
        var type = $cookies.get('zUserType',{path: '/'});
        if(user != undefined && user != "expired"){
            if(type == 1 && pLocation ==2)
                setTimeout(function(){location.href="../../promocion/promo.html"} , 10);
            else if(type == 2 && pLocation ==1)
                setTimeout(function(){location.href="../fanatico/init.html"} , 10);
        }
        else{
            Notification.error({message:"No ha iniciado sesión.", title: 'Sesión inválida.'});
            setTimeout(function(){location.href="../index.html"} , 10);
        }
    };

    facade.exitSession = function () {
        $cookies.put('zUserName', 'expired',{path: '/'});
        $cookies.put('zUserType', 'expired',{path: '/'});
        Notification.info({message:"Se ha cerrado la sesión.", title: 'Cerrando sesión...'});
        setTimeout(function(){location.href="../index.html"} , 1000);
    };

    facade.initSession = function (pUsername,pUserType) {
        $cookies.put('zUserName', pUsername,{path: '/'});
        $cookies.put('zUserType', pUserType,{path: '/'});
        var type = $cookies.get('zUserType',{path: '/'});
        if(type == 1)
            setTimeout(function(){location.href="promocion/promo.html"} , 10);
        else if(type == 2)
            setTimeout(function(){location.href="fanatico/init.html"} , 10);
    };

    facade.getCurrentUserType = function () {
        return $cookies.get('zUserType',{path: '/'});
    };
    facade.getCurrentUserEmail = function () {
        return $cookies.get('zUserName',{path: '/'});
    };

    facade.setTempEmail = function (pEmail) {
        $cookies.put('tempEmail', pEmail,{path: '/'});
    };


    facade.gotoProfile = function () {
        var user = $cookies.get('zUserName',{path: '/'});
        if(user != undefined && user != "expired"){
            setTimeout(function(){location.href="profile.html"} , 10);
        }
        else{
            Notification.error({message:"No ha iniciado sesión.", title: 'Sesión inválida.'});
            setTimeout(function(){location.href="../index.html"} , 10);
        }
    };

    return facade;
});