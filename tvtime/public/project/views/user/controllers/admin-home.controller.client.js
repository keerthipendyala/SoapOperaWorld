(function () {
        angular
            .module("OnlineLibrary")
            .controller("adminController", adminController);

        function adminController(userService, $location, $route,$routeParams) {
            var vm = this;
            vm.aid = $routeParams['aid'];
            vm.logout = logout;
            vm.logout = logout;
            vm.openNav = openNav;
            vm.closeNav = closeNav;
            vm.deleteUser = deleteUser;

            function init() {
                userService
                    .findAllUsers()
                    .then(function (users) {
                        vm.allUsers = users
                    });
            }

            init();

            function logout() {
                userService
                    .logout()
                    .then(function (res) {
                        $location.url("/userlogin");
                    });
            }

            function deleteUser(userId) {
                userService
                    .addToBannedList(vm.aid, userId)
                    .then(function (usr) {
                        if (usr) {
                            userService
                                .deleteUser(userId)
                                .then(function (usr) {
                                    if (usr) {
                                        $route.reload();
                                    }
                                });
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
    }

)();