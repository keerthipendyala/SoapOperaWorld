(function () {
    angular
        .module("SoapOperaWorld")
        .controller("admincreateController", admincreateController);

    function admincreateController($location, userService, $scope) {
        var vm = this;
        vm.register = register;
        vm.createUser = createUser;
        vm.logout = logout;

        function register(user) {
            if ($scope.formRegister.$valid) {
                userService
                    .findUserByUsername(user.username)
                    .then(function (usr) {
                        if (!usr)
                            vm.createUser(user);
                        else
                            vm.message = "Username is taken , Please use a different one";
                    });
            }
            else {
                $scope.formRegister.submitted = true;
                vm.error = "Form Incomplete";
            }
        }

        function createUser(user) {
            if (user.password === user.verifypassword) {
                userService
                    .createAdminUser(user)
                    .then(function (Newuser) {
                        $location.url("/admin/buyers");
                    });
            }
            else
                vm.error = "Passwords don't match, Try Again";
        }

        function logout() {
            userService
                .logout()
                .then(function (res) {
                    $location.url("/user");
                }, function (err) {
                    $location.url("/userlogin");
                });
        }

    }
})();