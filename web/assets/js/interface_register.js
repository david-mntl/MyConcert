var app = angular.module('mainModule', ['720kb.datepicker','angular-loading-bar','angularFileUpload','ui-notification','ngSecurity']);


app.controller('mainController',['$scope','$http','$window','Notification','Security',function ($scope,$http,$window,Notification,Security) {
    $scope.profiles = [{id: '2',name: 'Fanático'}, {id: '1',name: 'Promoción'}];
    $scope.universities = [];
    $scope.countries = [];
    $scope.genres = [];
    $scope.choosedGenres = [];
    $scope.data = [];


    $scope.getGenresFromServer = function () {
        $http.get('https://myconcert1.azurewebsites.net/api/Main/GET/spGetGenres').success(function (data, status, headers, config) {
            var response = JSON.parse(data);
            for(i = 0; i < response.spGetGenres.length; i++){
                var genre = {};
                genre.name = response.spGetGenres[i].name;
                genre.id = response.spGetGenres[i].id;
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

    $scope.getCountriesFromServer = function () {
        $http.get('https://myconcert1.azurewebsites.net/api/Main/GET/spGetCountries').success(function (data, status, headers, config) {
            var response = JSON.parse(data);
            for(i = 0; i < response.spGetCountries.length; i++){
                var country = {};
                country.name = response.spGetCountries[i].Name;
                country.id = response.spGetCountries[i].PK_ID_COUNTRY;
                $scope.countries.push(country);
            }

        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    };

    $scope.sendRegisterForm = function() {
        if($scope.data.ProfileType != undefined) {

            var parameter = JSON.stringify({
                Email: $scope.data.Email.toString()
            });
            $http.post('https://myconcert1.azurewebsites.net/api/Verify/User', parameter).success(function (data, status, headers, config) {
                var response = JSON.parse(data);

                if(response.State == 0){
                    if ($scope.data.ProfileType.id == 1) {
                        if (!$scope.isValid($scope.data.Name)) {
                            if (!$scope.isValid($scope.data.LastName)) {
                                if (!$scope.isValid($scope.data.Email)) {
                                    if (!$scope.isValid($scope.data.Password)) {
                                        var parameter = JSON.stringify({
                                            Name: $scope.data.Name.toString(),
                                            Lastname: $scope.data.LastName.toString(),
                                            Email: $scope.data.Email.toString(),
                                            Password: $scope.data.Password.toString()
                                        });

                                         $http.post('https://myconcert1.azurewebsites.net/api/Verify/RegisterAdmin', parameter).success(function (data, status, headers, config) {
                                            if (data == "error") {
                                                Notification.error({message: 'Ha ocurrido un error. Por favor inténtelo más tarde.',delay: 2000});
                                            }
                                            else {
                                                Notification.success({message: 'Usuario registrado. Redirigiendolo a la página principal.',delay: 2000});
                                                setTimeout(function () {location.href = "../index.html"}, 2000);
                                            }
                                         }).error(function (data, status, headers, config) {
                                             console.log(data);
                                         });
                                    }
                                    else {
                                        Notification.error({message: 'Ingrese una contraseña.', delay: 2000});
                                    }
                                }
                                else {
                                    Notification.error({message: 'Ingrese un correo electróncio.', delay: 2000});
                                }
                            }
                            else {
                                Notification.error({message: 'Ingrese un apellido.', delay: 2000});
                            }
                        }
                        else {
                            Notification.error({message: 'Ingrese un nombre.', delay: 2000});
                        }
                    }
                    else {
                        if ($scope.verifyForm()) {
                            if ($scope.data.Place == undefined)
                                $scope.data.Place = "";
                            if ($scope.data.University == undefined)
                                $scope.data.University = {id: '1', name: 'null'};

                            var parameter = JSON.stringify({
                                Name: $scope.data.Name.toString(),
                                Lastname: $scope.data.LastName.toString(),
                                Country: $scope.data.Country.name.toString(),
                                Residence: $scope.data.Place.toString(),
                                ID_Uni: $scope.data.University.id.toString(),
                                Email: $scope.data.Email.toString(),
                                Phone: $scope.data.Phone.toString(),
                                Photo: $scope.data.Email.toString(),
                                Pass: $scope.data.Password.toString(),
                                Description: $scope.data.Description.toString(),
                                Birthdate: $scope.data.BirthDate.toString(),
                                Genres: $scope.data.GenresList.toString()
                            });

                             $http.post('https://myconcert1.azurewebsites.net/api/Verify/RegisterUser', parameter).success(function (data, status, headers, config) {
                                if (data == "error") {
                                    Notification.error({message: 'Ha ocurrido un error. Por favor inténtelo más tarde.', delay: 2000});
                                }
                                else {
                                    Notification.success({message: 'Usuario registrado. Redirigiendolo a la página principal.', delay: 2000});
                                    setTimeout(function(){location.href="../index.html"} , 2000);
                                }
                             }).error(function (data, status, headers, config) {
                                console.log(data);
                             });
                        }
                    }
                }
                else if(response.State == 1){
                    Notification.error({message: 'El correo electrónico ya fue registrado.', delay: 2000});
                }
            }).error(function (data, status, headers, config) {
                Notification.error({message: 'Error de comunicación con el servidor. Inténtelo más tarde.', delay: 2000});
            });


        }
        else{
            Notification.error({message: 'Por favor ingrese un tipo de usuario.', delay: 2000});
        }

    };

    $scope.addGenre = function() {
        if($scope.data.Genre != undefined) {
            if ($scope.data.Genre.name != "" && $scope.choosedGenres.indexOf($scope.data.Genre.name) == -1) {
                if ($scope.data.GenresList == undefined || $scope.data.GenresList == "") {
                    $scope.data.GenresList = $scope.data.Genre.name;
                    $scope.choosedGenres.push($scope.data.Genre.name);
                }
                else {
                    $scope.data.GenresList = $scope.data.GenresList + "," + $scope.data.Genre.name;
                    $scope.choosedGenres.push($scope.data.Genre.name);
                }
            }
        }
    };
    $scope.removeGenre = function() {
        $scope.choosedGenres.splice(-1,1);
        $scope.data.GenresList = [];
        for(i = 0; i < $scope.choosedGenres.length; i++){
            if(i==0)
                $scope.data.GenresList = $scope.choosedGenres[i];
            else
                $scope.data.GenresList = $scope.data.GenresList + "," +$scope.choosedGenres[i];
        }

    };

    $scope.getCountriesFromServer();
    $scope.getGenresFromServer();
    $scope.getUniversitiesFromServer();

    $scope.verifyForm = function () {
        if(!$scope.isValid($scope.data.Name)){
            if(!$scope.isValid($scope.data.LastName)){
                if(!$scope.isValid($scope.data.Phone) && $scope.isPhoneValid($scope.data.Phone)){
                    if(!$scope.isValid($scope.data.Country)){
                        if(!$scope.isValid($scope.data.BirthDate)){
                            if(!$scope.isValid($scope.data.ProfileType)){
                                if(!$scope.isValid($scope.data.Email) && $scope.isEmailValid($scope.data.Email)){
                                    if(!$scope.isValid($scope.data.Password)){
                                        if(!$scope.isValid($scope.data.GenresList)){
                                            if(!$scope.isValid($scope.data.Description)){
                                                return true;
                                            }
                                            else{
                                                Notification.error({message: 'Ingrese una descripción personal.', delay: 2000});
                                                return false;
                                            }
                                        }
                                        else{
                                            Notification.error({message: 'Ingrese al menos un género.', delay: 2000});
                                            return false;
                                        }
                                    }
                                    else{
                                        Notification.error({message: 'Ingrese una contraseña.', delay: 2000});
                                        return false;
                                    }
                                }
                                else{
                                    Notification.error({message: 'Ingrese un correo electrónico válido.', delay: 2000});
                                    return false;
                                }
                            }
                            else{
                                Notification.error({message: 'Ingrese un tipo de perfil.', delay: 2000});
                                return false;
                            }
                        }
                        else{
                            Notification.error({message: 'Ingrese una fecha de nacimiento.', delay: 2000});
                            return false;
                        }
                    }
                    else{
                        Notification.error({message: 'Ingrese un país.', delay: 2000});
                        return false;
                    }
                }
                else{
                    Notification.error({message: 'Ingrese un teléfono válido. Utilice formato XXXX-XXXX.', delay: 2000});
                    return false;
                }
            }
            else{
                Notification.error({message: 'Ingrese un apellido.', delay: 2000});
                return false;
            }
        }
        else{
            Notification.error({message: 'Ingrese un nombre.', delay: 2000});
            return false;
        }

    };


    /****************** Aux Functions ************************/

    $scope.openUploadWindow = function(files) {
        if($scope.verifyForm()){
            if(!$scope.verifyIfUserExists()){
                Security.setTempEmail($scope.data.Email.toString());
                PopupCenter('upload/files.html','Subir Imagen','800','200');
            }
            else
                Notification.warning({message: 'El correo electrónico ya ha sido registrado.<br><center><img src="../assets/imgs/mail.png"><img src="../assets/imgs/mail.png"></center>', title: '¡Atención!'});
        }
        else{
            Notification.error({message: 'Por favor, complete el formulario antes de añadir una foto de perfil.', delay: 2000});
        }
    };

    $scope.verifyIfUserExists = function () {
        var parameter = JSON.stringify({
            Email: $scope.data.Email.toString()
        });
        $http.post('https://myconcert1.azurewebsites.net/api/Verify/User', parameter).success(function (data, status, headers, config) {
            var response = JSON.parse(data);
            console.log(data);
            return !response.State;

        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    };


    $scope.isValid = function(value) {
        return !value
    };
    $scope.isPhoneValid = function (value) {
        var pattern = new RegExp("[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]");
        return pattern.test(value);
    };
    $scope.isEmailValid = function (value) {
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value));
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