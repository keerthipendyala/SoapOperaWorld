(function () {
    angular
        .module("SoapOperaWorld")
        .controller("adminbuyersController", adminbuyersController);

    function adminbuyersController(userService, loggedIn) {
        var vm = this;
        vm.openNav = openNav;
        vm.closeNav = closeNav;
        if (loggedIn)
            vm.aid = loggedIn._id;

        function init() {
            userService
                .findAllUsers()
                .then(function (users) {
                    vm.users = users;
                    if (vm.users.length === 1) {
                        vm.message = "No Users to display!";
                    }
                });
        }

        init();


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