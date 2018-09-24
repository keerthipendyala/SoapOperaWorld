(function () {
    angular
        .module("SoapOperaWorld")
        .controller("userprofileController", userprofileController);

    function userprofileController(loggedIn, $location, userService) {
        var vm = this;
        if (loggedIn)
            vm.userId = loggedIn._id;

        vm.update = update;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        vm.openNav = openNav;
        vm.closeNav = closeNav;

        function init() {
            userService
                .findUserByUserId(vm.userId)
                .then(renderUser);
        }

        init();

        function logout() {
            userService
                .logout()
                .then(function (response) {
                    $location.url('/userlogin');
                }, function () {
                    $location.url('/userlogin');
                });
        }

        function update(newuser) {
            userService
                .updateUser(vm.userId, newuser)
                .then(function (usr) {
                    if (!usr)
                        vm.error = "unable to update user";
                    else
                        vm.message = "user successfully updated";
                });
        }

        function renderUser(user) {
            vm.user = user;
            if (vm.user.type === "buyer")
                vm.bid = vm.userId;
            if (vm.user.type === "seller")
                vm.sid = vm.userId;
            if (vm.user.type === "admin")
                vm.aid = vm.userId;
        }

        function deleteUser() {
            userService
                .deleteUser(vm.userId)
                .then(function (usr) {
                    if (usr) {
                        vm.error = "Account Deactivated!";
                        $location.url('/userlogin');
                    }
                });
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