(function () {
    angular
        .module("OnlineLibrary")
        .controller("adminCreateController", adminCreateController);

    function adminCreateController($location, libraryService, userService, $scope,$routeParams) {
        var vm = this;
        vm.register = register;
        vm.createUser = createUser;
        vm.logout = logout;
        vm.changeSelectedLibrary = changeSelectedLibrary;
        vm.openNav = openNav;
        vm.closeNav = closeNav;
        vm.aid = $routeParams['aid'];


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
                if (vm.selectedLib && user.type == 'librarian') {
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

        function changeSelectedLibrary(lib) {
            vm.selectedLib = lib;
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