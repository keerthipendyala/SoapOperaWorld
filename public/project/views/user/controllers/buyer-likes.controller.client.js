(function () {
    angular
        .module("SoapOperaWorld")
        .controller("buyerlikesController", buyerlikesController);

    function buyerlikesController(userService, showService, loggedIn) {
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
                    vm.shows_liked = buyer.shows_liked;
                    if (vm.shows_liked.length === 0) {
                        vm.message = "No shows to display"
                    }
                    else {
                        vm.getShowsInfo(vm.shows_liked);
                    }
                });
        }

        init();


        function getShowsInfo(shows_liked) {
            var shows_info = [];
            for (var i = 0; i < shows_liked.length; i++) {
                showService
                    .findProductById(shows_liked[i])
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