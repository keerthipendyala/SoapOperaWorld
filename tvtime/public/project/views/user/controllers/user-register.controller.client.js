(function () {
    angular
        .module("OnlineLibrary")
        .controller("userregisterController", userregisterController);

    function userregisterController($location, libraryService, userService, $scope) {
        var vm = this;
        vm.register = register;
        vm.createUser = createUser;
        vm.logout = logout;
        vm.changeSelectedLibrary=changeSelectedLibrary;

        function init() {
            libraryService
                .findAllLibraries()
                .then(function (libraries) {
                    vm.libraries = libraries;
                });
        }

        init();

        function register(user) {
            if ($scope.formRegister.$valid) {
                userService
                    .findUserByUsername(user.username)
                    .then(function (usr) {
                        vm.error = null;
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
                if(vm.selectedLib && user.type == 'librarian')
                {
                     user.libraryId = vm.selectedLib._id;
                }
                userService
                    .register(user)
                    .then(function (Newuser) {
                        vm.sucessmessage = "Registration Successful !!"
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

        function changeSelectedLibrary(lib){
           vm.selectedLib = lib;
        }
    }
})();