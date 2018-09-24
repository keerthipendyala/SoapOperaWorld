(function(){
    angular
        .module("SoapOperaWorld")
        .config(configuration);

    function configuration($routeProvider,$httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
        $routeProvider
            .when("/", {
                templateUrl: "views/show/show-home.view.client.html",
                controller: 'homeController',
                controllerAs: 'model',
                resolve : {checkUser : checkUser}
            })
            .when("/show", {
                templateUrl: "views/show/show-home.view.client.html",
                controller: 'homeController',
                controllerAs: 'model',
                resolve : {checkUser : checkUser}
            })
             .when("/userlogin", {
                 templateUrl: "views/user/templates/user-login.view.client.html",
                 controller: 'userloginController',
                 controllerAs: 'model',
                 resolve : {checkUser : checkUser}
             })
             .when("/userregister", {
                templateUrl: "views/user/templates/user-register.view.client.html",
                 controller: 'userregisterController',
                 controllerAs: 'model',
                 resolve : {checkUser : checkUser}
             })
             .when("/user", {
                 templateUrl: "views/user/templates/user-profile.view.client.html",
                 controller: 'userprofileController',
                 controllerAs: 'model',
                 resolve : {loggedIn : checkLoggedIn}
             })
            .when("/buyer/likes", {
                templateUrl: "views/user/templates/buyer-likes.view.client.html",
                controller: 'buyerlikesController',
                controllerAs: 'model',
                resolve : {loggedIn : checkLoggedIn}
            })
            .when("/buyer/wishlist", {
                templateUrl: "views/user/templates/buyer-wishlist.view.client.html",
                controller: 'buyerwishlistController',
                controllerAs: 'model',
                resolve : {loggedIn : checkLoggedIn}
            })
            .when("/buyer/own", {
                templateUrl: "views/user/templates/buyer-bought.view.client.html",
                controller: 'buyerboughtController',
                controllerAs: 'model',
                resolve : {loggedIn : checkLoggedIn}
            })
            .when("/buyer/trade", {
                templateUrl: "views/user/templates/buyer-trade.view.client.html",
                controller: 'buyertradeController',
                controllerAs: 'model',
                resolve : {loggedIn : checkLoggedIn}
            })
            .when("/buyer/fav", {
                templateUrl: "views/user/templates/buyer-favourites.view.client.html",
                controller: 'buyerfavController',
                controllerAs: 'model',
                resolve : {loggedIn : checkLoggedIn}
            })
            .when("/seller/forsale", {
                templateUrl: "views/user/templates/seller-forsale.view.client.html",
                controller: 'sellerforsaleController',
                controllerAs: 'model',
                resolve : {loggedIn : checkLoggedIn}
            })
            .when("/seller/trade", {
                templateUrl: "views/user/templates/seller-trade.view.client.html",
                controller: 'sellertradeController',
                controllerAs: 'model',
                resolve : {loggedIn : checkLoggedIn}
            })
            .when("/admin/buyers", {
                templateUrl: "views/user/templates/admin-buyers.view.client.html",
                controller: 'adminbuyersController',
                controllerAs: 'model',
                resolve : {loggedIn : checkLoggedIn}
            })
            .when("/admin/trade", {
                templateUrl: "views/user/templates/admin-trade.view.client.html",
                controller: 'admintradeController',
                controllerAs: 'model',
                resolve : {loggedIn : checkLoggedIn}
            })
            .when("/admin/create", {
                templateUrl: "views/user/templates/admin-create.view.client.html",
                controller: 'admincreateController',
                controllerAs: 'model',
                resolve : {loggedIn : checkLoggedIn}
            })
            .when("/admin/edit/:uid", {
                templateUrl: "views/user/templates/admin-edit.view.client.html",
                controller: 'admineditController',
                controllerAs: 'model',
                resolve : {loggedIn : checkLoggedIn}
            })
             .when("/user/search", {
                 templateUrl: "views/show/show-home.view.client.html",
                 controller: 'homeController',
                 controllerAs: 'model',
                 resolve : {checkUser : checkUser}
             })
            .when("/user/search/:pid", {
                templateUrl: "views/user/templates/productdescription.view.client.html",
                controller: 'productdescriptionController',
                controllerAs: 'model',
                resolve : {checkUser : checkUser}
            })
            .when("/user/search/:pid/findstores", {
                templateUrl: "views/user/templates/pickseller.view.client.html",
                controller: 'picksellerController',
                controllerAs: 'model',
                resolve : {checkUser : checkUser}
            })
            .when("/user/search/:pid/findstores/:sid", {
                templateUrl: "views/user/templates/placeorder.view.client.html",
                controller: 'placeorderController',
                controllerAs: 'model',
                resolve : {checkUser : checkUser}
            });

        function checkLoggedIn(userService,$location, $q){
            var deferred = $q.defer();
             userService
                 .loggedIn()
                 .then(function(response)
                 {
                     var user = response;
                     if (user === '0')
                     {
                         deferred.reject();
                         $location.url("/userlogin");
                     }
                     else  {
                         deferred.resolve(user);
                     }
                 },
                  function(err){
                      deferred.reject();
                      $location.url("/userlogin");
                  });
            return deferred.promise;
        }

        function checkUser(userService,$location, $q){
            var deferred = $q.defer();
            userService
                .loggedIn()
                .then(function(response)
                    {
                        var user = response;
                        if (user === '0')
                        {
                            deferred.resolve(null);
                        }
                        else  {
                            deferred.resolve(user);
                        }
                    },
                    function(err){
                        deferred.reject(user);
                    });
            return deferred.promise;
        }
    }
})();