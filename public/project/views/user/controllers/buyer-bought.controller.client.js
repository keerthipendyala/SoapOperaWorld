(function () {
    angular
        .module("SoapOperaWorld")
        .controller("buyerboughtController", buyerboughtController);

    function buyerboughtController(userService, showService, loggedIn) {
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
                    vm.shows_bought = buyer.shows_bought;
                    if (vm.shows_bought.length === 0) {
                        vm.message = "No shows to display"
                    }
                    else {
                        vm.getShowsInfo(vm.shows_bought);
                    }
                });
        }

        init();


        function getShowsInfo(shows_bought) {
            var shows_info = [];
            for (var i = 0; i < shows_bought.length; i++) {
                showService
                    .findProductById(shows_bought[i].showId)
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