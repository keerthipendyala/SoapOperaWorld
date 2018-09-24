(function () {
        angular
            .module("OnlineLibrary")
            .controller("studentLikesController", studentLikesController);

        function studentLikesController(bookService, libraryService, userService, $location, $routeParams) {
            var vm = this;
            vm.logout = logout;
            vm.uid = $routeParams['uid'];
            vm.logout = logout;
            vm.openNav = openNav;
            vm.closeNav = closeNav;
            vm.libBooks = [];
            vm.userslikedInfo = [];


            function init() {
                userService
                    .findUserByUserId(vm.uid)
                    .then(function (res) {
                        vm.booksInfo = res.books_liked;
                        for (var i = 0; i < vm.booksInfo.length; i++)
                            findBookById(vm.booksInfo[i], vm.uid);
                    });
            }

            init();

            function findBookById(bookId, cuid) {
                bookService.findBookById(bookId)
                    .then(function (res) {
                        vm.libBooks.push(res);
                        for (var i = 0; i < res.users_liked.length; i++) {
                            findLikedUsers(res.users_liked[i], cuid, bookId);
                        }
                    });
            }


            function findLikedUsers(userId, cuid, bookId) {
                if (userId != cuid) {
                    userService
                        .findUserByUserId(userId)
                        .then(function (res) {
                            vm.userslikedInfo.push({bookId: bookId, user: res.firstName, contact: res.email});
                        });
                }
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