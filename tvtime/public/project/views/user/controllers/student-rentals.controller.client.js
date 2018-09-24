(function () {
        angular
            .module("OnlineLibrary")
            .controller("studentRentalsController", studentRentalsController);

        function studentRentalsController(bookService, libraryService, userService, $location, $routeParams, $route) {
            var vm = this;
            vm.logout = logout;
            vm.sid = $routeParams['uid'];
            vm.libBooks = [];
            vm.libUsers = [];
            vm.libs = [];
            vm.logout = logout;
            vm.openNav = openNav;
            vm.closeNav = closeNav;
            vm.returnBook = returnBook;

            function init() {
                libraryService
                    .findRentalsById(vm.sid)
                    .then(function (res) {
                        vm.requestsInfo = res;
                        for (var i = 0; i < vm.requestsInfo.length; i++)
                            findBookById(vm.requestsInfo[i]);
                    });
            }

            init();

            function findBookById(req) {
                bookService.findBookById(req.bookId)
                    .then(function (res) {
                        vm.libBooks.push(res);
                        findUserById(req)
                    });
            }

            function findUserById(req) {
                userService.findUserByUserId(req.librarianId)
                    .then(function (res) {
                        vm.user = res;
                        vm.libUsers.push(vm.user);
                        libraryService
                            .findLibraryById(req.libraryId)
                            .then(function (res) {
                                vm.lib = res;
                                vm.libs.push(vm.lib.name);
                            });
                    });
            }

            function returnBook(returnInfo) {
                libraryService.returnBook(returnInfo)
                    .then(function (res) {
                        libraryService
                            .addToInventory(returnInfo.libraryId,returnInfo.bookId)
                            .then(function (res) {
                                $route.reload();
                            });
                    });

            }

            function logout() {
                userService
                    .logout()
                    .then(function (res) {
                        $location.url("/userlogin");
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