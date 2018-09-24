(function () {
        angular
            .module("OnlineLibrary")
            .controller("inventoryController", inventoryController);

        function inventoryController(bookService, libraryService, userService, $location, $routeParams) {
            var vm = this;
            vm.logout = logout;
            vm.librarianId = $routeParams['uid'];
            vm.libraryId = $routeParams['lid'];
            vm.libBooks = [];
            vm.logout = logout;
            vm.openNav = openNav;
            vm.closeNav = closeNav;

            function init() {
                libraryService
                    .findLibraryById(vm.libraryId)
                    .then(function (res) {
                        vm.booksInfo = res.books;
                        for (var i = 0; i < vm.booksInfo.length; i++)
                            findBookById(vm.booksInfo[i]);
                    });
            }

            init();

            function findBookById(book) {
                bookService.findBookById(book.bookId)
                    .then(function (res) {
                        vm.libBook = res;
                        vm.libBook.count = book.count;
                        vm.libBooks.push(vm.libBook);
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