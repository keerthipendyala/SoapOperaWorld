(function () {
        angular
            .module("OnlineLibrary")
            .controller("requestsController", requestsController);

        function requestsController(bookService, libraryService, userService, $location, $routeParams, $route) {
            var vm = this;
            vm.logout = logout;
            vm.librarianId = $routeParams['uid'];
            vm.libraryId = $routeParams['lid'];
            vm.libBooks = [];
            vm.libUsers = [];
            vm.logout = logout;
            vm.openNav = openNav;
            vm.closeNav = closeNav;
            vm.acceptBookRental = acceptBookRental;

            function init() {
                libraryService
                    .findRequestsByLibraryId(vm.libraryId)
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
                        findUserById(req.studentId);
                    });
            }

            function findUserById(studentId) {
                userService.findUserByUserId(studentId)
                    .then(function (res) {
                        vm.user = res;
                        vm.libUsers.push(vm.user);
                    });
            }

            function acceptBookRental(libId, librarianId, bookId, studentId) {
                libraryService
                    .removeBookRequest(libId, bookId, studentId)
                    .then(function (res) {
                        libraryService
                            .acceptBookRental(libId, librarianId, bookId, studentId)
                            .then(function (res) {
                                libraryService
                                    .reduceInventoryCount(libId, bookId)
                                    .then(function (res) {
                                        $route.reload();
                                    });
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