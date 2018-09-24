(function () {
    angular
        .module("SoapOperaWorld")
        .controller("sellerforsaleController", sellerforsaleController);

    function sellerforsaleController(userService, showService, loggedIn) {
        var vm = this;
        vm.openNav = openNav;
        vm.closeNav = closeNav;
        vm.getShowsInfo = getShowsInfo;
        if (loggedIn)
            vm.sid = loggedIn._id;

        function init() {
            userService
                .findUserByUserId(vm.sid)
                .then(function (seller) {
                    vm.shows_forsale = seller.shows_forsale;
                    if (vm.shows_forsale.length === 0) {
                        vm.message = "No shows to display"
                    }
                    else {
                        vm.getShowsInfo(vm.shows_forsale);
                    }
                });
        }

        init();


        function getShowsInfo(shows_forsale) {
            var shows_info = [];
            for (var i = 0; i < shows_forsale.length; i++) {
                showService
                    .findProductById(shows_forsale[i].showId)
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