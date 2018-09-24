(function () {
    angular
        .module("SoapOperaWorld")
        .controller("buyerfavController", buyerfavController);

    function buyerfavController(userService, showService, loggedIn) {
        var vm = this;
        vm.openNav = openNav;
        vm.closeNav = closeNav;
        vm.getSellerInfo = getSellerInfo;
        if (loggedIn)
            vm.bid = loggedIn._id;

        function init() {
            userService
                .findUserByUserId(vm.bid)
                .then(function (buyer) {
                    vm.sellers_favourite = buyer.sellers_favourite;
                    if (vm.sellers_favourite.length === 0) {
                        vm.message = "No favourites yet"
                    }
                    else {
                        vm.getSellerInfo(vm.sellers_favourite);
                    }
                });

        }

        init();


        function getSellerInfo(trades) {
            var seller_info = [];
            for (var i = 0; i < trades.length; i++) {
                userService
                    .findUserByUserId(trades[i])
                    .then(function (user) {
                        var newUser = {
                            name: user.firstName + " " + user.lastName,
                            email: user.email,
                            phone: user.phone
                        };
                        seller_info.push(newUser);
                    });
            }
            vm.seller_info = seller_info;
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