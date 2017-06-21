app.service("initModel",['$http','$q','Notification',function ($http,$q,Notification) {

    this.readCartelerasData = function() {

        carteleras = [];

        return $http.get("https://myconcert1.azurewebsites.net/api/Main/GET/spGetAllBillboards/").success(function (response) {
            response = JSON.parse(response);
            if (response.spGetAllBillboards.length > 0) {
                for (j = 0; j < response.spGetAllBillboards.length; j++) {
                    var cartelera = new Object();

                    cartelera.localIndex = j;
                    cartelera.id = response.spGetAllBillboards[j].id;
                    cartelera.name = response.spGetAllBillboards[j].name;
                    cartelera.location = response.spGetAllBillboards[j].location;
                    cartelera.leftTime = response.spGetAllBillboards[j].timeLeft;
                    cartelera.image = "../assets/"+response.spGetAllBillboards[j].image;
                    carteleras.push(cartelera);
                }
            }
            //return {carteleras});
            return {
                title: response.data.title,
                cost:  response.data.price
                };
        });

    };

}]);