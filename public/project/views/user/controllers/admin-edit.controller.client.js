(function () {
    angular
        .module("SoapOperaWorld")
        .controller("admineditController", admineditController);

    function admineditController(loggedIn, $routeParams, $location, userService) {
        var vm = this;
        if (loggedIn)
            vm.aid = loggedIn._id;

        vm.uid = $routeParams['uid'];
        vm.update = update;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        vm.openNav = openNav;
        vm.closeNav = closeNav;

        function init() {
            userService
                .findUserByUserId(vm.uid)
                .then(function (user) {
                    if (!user) {
                        vm.error = "User not found";
                    }
                    else
                        vm.user = user;
                });
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
                .updateUser(vm.uid, newuser)
                .then(function (usr) {
                    if (!usr)
                        vm.error = "unable to update user";
                    else
                        vm.message = "user successfully updated";
                });
        }

        function deleteUser() {
            userService
                .deleteUser(vm.uid)
                .then(function (usr) {
                    if (usr) {
                        vm.error = "Account Deactivated!";
                        $location.url('/admin/buyers');
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