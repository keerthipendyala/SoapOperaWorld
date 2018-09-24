(function () {
    angular
        .module("SoapOperaWorld")
        .controller("placeorderController", placeorderController);

    function placeorderController(userService, $location, showService, $routeParams, checkUser) {
        var vm = this;
        vm.sid = $routeParams['sid'];
        vm.logout = logout;
        if (checkUser)
            vm.bid = checkUser._id;
        vm.pid = $routeParams['pid'];
        vm.confirmpurchase = confirmpurchase;
        vm.outofstock = false;

        function init() {
            userService
                .findUserByUserId(vm.sid)
                .then(function (seller) {
                    vm.seller = seller;
                });
            showService
                .findShowByShowId(vm.pid)
                .then(function (show) {
                    vm.show = show;
                });
        }

        init();

        function logout() {
            userService
                .logout()
                .then(function (res) {
                    $location.url("/user");
                }, function (err) {
                    $location.url("/userlogin");
                });
        }


        function confirmpurchase() {
            showService
                .purchaseTVShow(vm.bid, vm.sid, vm.pid, vm.show)
                .then(function (res) {
                    if (res === true) {
                        vm.outofstock = true;
                        vm.message = false;
                        vm.error = "Sorry the product you are looking for is currently out of stock!." +
                            "However, we will make it available soon";
                    }
                    else
                        vm.message = "TV Show purchased successfully";
                });
        }
    }
})();