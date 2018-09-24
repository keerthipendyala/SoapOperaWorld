(function () {
    angular
        .module("SoapOperaWorld")
        .controller("picksellerController", picksellerController);

    function picksellerController(userService, showService, $location, $routeParams, checkUser) {
        var vm = this;
        vm.pid = $routeParams['pid'];
        vm.logout = logout;
        vm.addToFav = addToFav;
        vm.removeFav = removeFav;
        vm.confirmpurchase = confirmpurchase;

        if (checkUser)
            vm.uid = checkUser._id;


        function init() {
            userService
                .findUserByUserId(vm.uid)
                .then(function (user) {
                    vm.user = user;
                });

            showService
                .findShowByShowId(vm.pid)
                .then(function (show) {
                    vm.show = show;
                });

            showService
                .findProductById(vm.pid)
                .then(function (product) {
                    vm.product = product;

                });

            showService
                .getSellers(vm.pid)
                .then(function (sellers) {
                    vm.sellers = sellers;
                    vm.sellerinfo = [];
                    for (var i = 0; i < vm.sellers.length; i++) {
                        userService
                            .findUserByUserId(vm.sellers[i])
                            .then(function (sellerin) {
                                for (var j = 0; j < sellerin.shows_forsale.length; j++) {
                                    if (sellerin.shows_forsale[j].showId === vm.pid) {
                                        for (var k = 0; k < vm.user.sellers_favourite.length; k++) {
                                            if (vm.user.sellers_favourite[k] == sellerin._id) {
                                                sellerin.fav = true;
                                            }
                                        }
                                        sellerin.showcount = sellerin.shows_forsale[j].count;
                                    }
                                }
                                vm.sellerinfo.push(sellerin);
                            });
                    }
                }, function (err) {
                    vm.message = "Show is currently Out of Stock , please try again"
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

        function addToFav(sid, index) {
            userService
                .addToFav(vm.uid, sid)
                .then(function (res) {
                    vm.sellerinfo[index].fav = true;
                }, function (err) {
                    vm.error = "Could not update Favourite";
                });
        }

        function removeFav(sid, index) {
            userService
                .removeFav(vm.uid, sid)
                .then(function (res) {
                    vm.sellerinfo[index].fav = false;
                }, function (err) {
                    vm.error = "Could not update Favourite";
                });
        }

        function confirmpurchase(seller) {
            showService
                .purchaseTVShow(vm.uid, seller._id, vm.pid, vm.show)
                .then(function (res) {
                    if (res === true) {
                        vm.outofstock = true;
                        vm.message = false;
                        vm.error = "Sorry the product you are looking for is currently out of stock!." +
                            "However, we will make it available soon";
                    }
                    else

                        vm.message = "Thank you for choosing our store! Your purchase has been made succesfully."
                });
        }
    }
})();