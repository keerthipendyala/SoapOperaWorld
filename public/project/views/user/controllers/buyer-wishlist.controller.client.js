(function () {
    angular
        .module("SoapOperaWorld")
        .controller("buyerwishlistController", buyerwishlistController);

    function buyerwishlistController(userService, showService, loggedIn) {
        var vm = this;
        vm.openNav = openNav;
        vm.closeNav = closeNav;
        vm.getShowsInfo = getShowsInfo;
        if (loggedIn)
            vm.bid = loggedIn._id;

        function init() {
            userService
                .findUserByUserId(vm.bid)
                .then(function (buyer) {
                    vm.shows_wishlist = buyer.shows_wishlist;
                    if (vm.shows_wishlist.length === 0) {
                        vm.message = "No shows to display"
                    }
                    else {
                        vm.getShowsInfo(vm.shows_wishlist);
                    }
                });
        }

        init();


        function getShowsInfo(shows_wishlist) {
            var shows_info = [];
            for (var i = 0; i < shows_wishlist.length; i++) {
                showService
                    .findProductById(shows_wishlist[i])
                    .then(function (show) {
                        shows_info.push(show);
                    });
            }
            vm.shows_info = shows_info;
        }


        function openNav() {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
        }

        function closeNav() {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
        }

    }
})();