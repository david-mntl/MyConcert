var app = angular.module('mainModule', ['angular-loading-bar','angularNotify','ngSecurity','ui-notification']);

app.controller('mainController',['$scope','$http','$window','Security','Notification',function ($scope,$http,$window,Security,Notification) {
    $scope.data = [];
    $scope.data.Country = {};
    $scope.universities = [];
    $scope.countries = [];
    $scope.genres = [];
    $scope.choosedGenres = [];

    $scope.editingProfile = false;
    $scope.loading = true;

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
            Email: Security.getCurrentUserEmail()
        });

        $scope.data.University = [];
        $scope.data.Genre = [];
        $http.post('https://myconcert1.azurewebsites.net/api/GET/userInfo', parameter).success(function (data, status, headers, config) {
            var response = JSON.parse(data);

            $scope.choosedGenres = [];
            $scope.data.Name = response.Name;
            $scope.data.LastName = response.LastName;
            $scope.data.Phone = response.Phone;
            $scope.data.Birthdate = response.Birthdate;
            $scope.data.University.id = response.FK_ID_University;
            $scope.data.Country.id = response.FK_ID_Country;

            $scope.data.Email = response.Email;
            $scope.data.Place = response.Residence;
            $scope.data.Description = response.PersonalDescription;
            /*$scope.data.GenresList = "";*/
            if(response.genres.length > 0){
                $scope.data.GenresList = response.genres[0].Name;
                for(i=1; i < response.genres.length; i++){
                    $scope.data.GenresList+= ","+response.genres[i].Name;
                    $scope.choosedGenres.push(response.genres[i].Name);
                }
            }

            $scope.loading = false;

        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    };

    /********* AUX FUNCTIONS **********/
    $scope.xExitSession = function () { Security.exitSession(); };
    $scope.xGotoProfile = function () { Security.gotoProfile(); };
    $scope.changeEditStatus = function () { $scope.editingProfile = !$scope.editingProfile; };

    $scope.addGenre = function() {
        if($scope.data.Genre.name != undefined) {
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


    $scope.sendRegisterForm = function() {
        var userType = Security.getCurrentUserType();

        if (userType == 1) {
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

                            $http.post('https://myconcert1.azurewebsites.net/api/Funcs/EditPerfilAdmin', parameter).success(function (data, status, headers, config) {
                                if (data == "error") {
                                    Notification.error({message: 'Ha ocurrido un error. Por favor inténtelo más tarde.',delay: 2000});
                                }
                                else {
                                    Notification.success({message: 'Información actualizada.', delay: 2000});
                                    $scope.editingProfile = false;
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
                    name: $scope.data.Name.toString(),
                    lastName: $scope.data.LastName.toString(),
                    country: $scope.data.Country.name.toString(),
                    residence: $scope.data.Place.toString(),
                    uniID: $scope.data.University.id.toString(),
                    email: $scope.data.Email.toString(),
                    phone: $scope.data.Phone.toString(),
                    photo: $scope.data.Email.toString(),
                    pass: $scope.data.Password.toString(),
                    description: $scope.data.Description.toString(),
                    //birthdate: $scope.data.BirthDate.toString()
                    birthdate: '01/01/16',
                    Genres: $scope.data.GenresList.toString()
                });

                $http.post('https://myconcert1.azurewebsites.net/api/Funcs/EditPerfil', parameter).success(function (data, status, headers, config) {
                    if (data == "error") {
                        Notification.error({message: 'Ha ocurrido un error. Por favor inténtelo más tarde.', delay: 2000});
                    }
                    else {
                        Notification.success({message: 'Información actualizada.', delay: 2000});
                        $scope.editingProfile = false;
                    }
                }).error(function (data, status, headers, config) {
                    console.log(data);
                });
            }
        }

    };

    $scope.deactivateUser = function () {
        var parameter = JSON.stringify({
            ID: Security.getCurrentUserEmail()
        });

        $http.post('https://myconcert1.azurewebsites.net/api/Funcs/DeactivateUser', parameter).success(function (data, status, headers, config) {
            if (data == "error") {
                Notification.error({message: 'Ha ocurrido un error. Por favor inténtelo más tarde.', delay: 2000});
            }
            else {
                $scope.editingProfile = false;
                Notification.success({message: 'Usuario desactivado. Redirigiendolo a la página principal.',delay: 2000});
                Security.exitSession();
                setTimeout(function () {location.href = "../index.html"}, 2000);
            }
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    };


    /************ AUX FUNCTIONS ****************/
    $scope.verifyForm = function () {
        if(!$scope.isValid($scope.data.Name)){
            if(!$scope.isValid($scope.data.LastName)){
                if(!$scope.isValid($scope.data.Phone) && $scope.isPhoneValid($scope.data.Phone)){
                    if(!$scope.isValid($scope.data.Country)){
                        if(!$scope.isValid($scope.data.Description)){
                            if(!$scope.isValid($scope.data.Email) && $scope.isEmailValid($scope.data.Email)){
                                if(!$scope.isValid($scope.data.Password)){
                                    if(!$scope.isValid($scope.data.GenresList)){
                                        /*if(!$scope.isValid($scope.data.Birthdate)){
                                            return true;
                                        }
                                        else{
                                            Notification.error({message: 'Ingrese una fecha de nacimiento.', delay: 2000});
                                            return false;
                                        }*/ ///NOTAAAAAAAAAAAAAAAAAAA //TODO Cuando la fecha esté buena descomentar.
                                        return true;
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
                            Notification.error({message: 'Ingrese una descripción personal.', delay: 2000});
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

    /************** AUX FUNCTIONS ***********/
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
    Security.verifySession();
    $scope.getCountriesFromServer();
    $scope.getGenresFromServer();
    $scope.getUniversitiesFromServer();
    $scope.loadUserInfo();
}]);

function formatDateTime(input){
    var epoch = new Date(0);
    epoch.setSeconds(parseInt(input));
    var date = epoch.toISOString();
    date = date.replace('T', ' ');
    return date.split('.')[0].split(' ')[0] + ' ' + epoch.toLocaleTimeString().split(' ')[0];
};