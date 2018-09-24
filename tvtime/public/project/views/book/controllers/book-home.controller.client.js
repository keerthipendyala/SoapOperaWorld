(function () {
        angular
            .module("OnlineLibrary")
            .controller("homeController", homeController);

        function homeController(bookService, libraryService, userService, $location, $routeParams) {
            var vm = this;
            vm.logout = logout;
            vm.bookPosters = {};
            vm.searchBooks = searchBooks;
            vm.uid = $routeParams['uid'];
            vm.logout = logout;
            vm.openNav=openNav;
            vm.closeNav=closeNav;

            function init() {
                bookService
                    .getAllBooks()
                    .then(function (bookInfo) {
                        vm.booksInfo = bookInfo.results;
                    });
                if (vm.uid == 9999)
                    vm.gid = 9999;
                else
                    userService
                        .findUserByUserId(vm.uid)
                        .then(function (response) {
                            vm.user = response;
                            if (vm.user.type === 'librarian') {
                                vm.lid = vm.uid;
                                libraryService.findLibraryById(vm.user.libraryId)
                                    .then(function (response) {
                                        vm.library = response;

                                    });
                            }
                            if (vm.user.type === 'student') {
                                vm.sid = vm.uid;
                            }
                        });
            }

            init();

            function searchBooks(title) {
                bookService
                    .searchBooks(title)
                    .then(function (response) {
                        vm.bookTitleResult = response.items;

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