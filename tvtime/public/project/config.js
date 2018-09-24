(function () {
    angular
        .module("OnlineLibrary")
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
        $routeProvider
            .when("/", {
                templateUrl: "views/user/templates/user-login.view.client.html",
                controller: 'userloginController',
                controllerAs: 'model'
            })
            .when("/userlogin", {
                templateUrl: "views/user/templates/user-login.view.client.html",
                controller: 'userloginController',
                controllerAs: 'model'
            })
            .when("/userregister", {
                templateUrl: "views/user/templates/user-register.view.client.html",
                controller: 'userregisterController',
                controllerAs: 'model'
            })
            .when("/user/:uid", {
                templateUrl: "views/user/templates/user-profile.view.client.html",
                controller: 'userprofileController',
                controllerAs: 'model'
            })
            .when("/admin/AllUsers/:aid", {
                templateUrl: "views/user/templates/admin-home.view.client.html",
                controller: 'adminController',
                controllerAs: 'model'
            })
            .when("/admin/CreateUser/:aid", {
                templateUrl: "views/user/templates/admin-create.view.client.html",
                controller: 'adminCreateController',
                controllerAs: 'model'
            })
            .when("/admin/:aid/UpdateUser/:uid", {
                templateUrl: "views/user/templates/admin-update.view.client.html",
                controller: 'adminUpdateController',
                controllerAs: 'model'
            })
            .when("/user/:uid/book", {
                templateUrl: "views/book/templates/book-home.view.client.html",
                controller: 'homeController',
                controllerAs: 'model'
            })
            .when("/user/:uid/inventory/:lid", {
                templateUrl: "views/book/templates/inventory.view.client.html",
                controller: 'inventoryController',
                controllerAs: 'model'
            })
            .when("/user/:uid/requests/:lid", {
                templateUrl: "views/book/templates/requests.view.client.html",
                controller: 'requestsController',
                controllerAs: 'model'
            })
            .when("/user/:uid/rentals/:lid", {
                templateUrl: "views/book/templates/rentals.view.client.html",
                controller: 'rentalsController',
                controllerAs: 'model'
            })
            .when("/user/:uid/search/:pid", {
                templateUrl: "views/book/templates/productdescription.view.client.html",
                controller: 'productdescriptionController',
                controllerAs: 'model'
            })
            .when("/user/:uid/booksLiked", {
                templateUrl: "views/user/templates/student-likes.view.client.html",
                controller: 'studentLikesController',
                controllerAs: 'model'
            })
            .when("/user/:uid/booksWishlisted", {
                templateUrl: "views/user/templates/student-wishes.view.client.html",
                controller: 'studentWishesController',
                controllerAs: 'model'
            })
            .when("/user/:uid/studentRentals", {
                templateUrl: "views/user/templates/student-rentals.view.client.html",
                controller: 'studentRentalsController',
                controllerAs: 'model'
            })
            .when("/user/:uid/search/:pid/findLibraries", {
                templateUrl: "views/user/templates/student-libraries.view.client.html",
                controller: 'studentLibrariesController',
                controllerAs: 'model'
            })
    }
})();