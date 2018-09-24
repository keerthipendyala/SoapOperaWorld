(function () {
        angular
            .module("OnlineLibrary")
            .controller("studentWishesController", studentWishesController);

        function studentWishesController(bookService, libraryService, userService, $location, $routeParams) {
            var vm = this;
            vm.logout = logout;
            vm.uid = $routeParams['uid'];
            vm.logout = logout;
            vm.openNav = openNav;
            vm.closeNav = closeNav;
            vm.libBooks = [];

            function init() {
                userService
                    .findUserByUserId(vm.uid)
                    .then(function (res) {
                        vm.booksInfo = res.books_wished;
                        for (var i = 0; i < vm.booksInfo.length; i++)
                            findBookById(vm.booksInfo[i]);
                    });
            }

            init();

            function findBookById(bookId) {
                bookService.findBookById(bookId)
                    .then(function (res) {
                        vm.libBooks.push(res);
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