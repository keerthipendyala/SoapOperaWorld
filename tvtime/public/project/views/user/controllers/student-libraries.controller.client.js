(function () {
        angular
            .module("OnlineLibrary")
            .controller("studentLibrariesController", studentLibrariesController);

        function studentLibrariesController(bookService, libraryService, userService, $location, $route, $routeParams) {
            var vm = this;
            vm.logout = logout;
            vm.uid = $routeParams['uid'];
            vm.pid = $routeParams['pid'];
            vm.logout = logout;
            vm.openNav = openNav;
            vm.closeNav = closeNav;
            vm.createBookRequest = createBookRequest;
            vm.requested=[];
            function init() {
                libraryService.findLibraryByBookId(vm.pid)
                    .then(function (res) {
                        vm.librariesInfo = res;
                        getRequests(vm.librariesInfo);
                    });

                bookService.findBookById(vm.pid)
                    .then(function (res) {
                        vm.libBook = res;
                    });

                userService
                    .findUserByUserId(vm.uid)
                    .then(function (res) {
                        vm.user = res;
                    });
            }

            init();

            function getRequests(libs) {
                libraryService.findRequestsById(vm.pid, vm.uid)
                    .then(function (res) {
                        for(var i = 0 ;i < libs.length; i++)
                        {
                            vm.rexists = false;
                            for(var j=0;j<res.length; j++)
                            {
                                if(libs[i]._id == res[j].libraryId)
                                    vm.rexists = true;
                            }

                            vm.requested.push(vm.rexists);
                        }
                    });
            }


            function logout() {
                userService
                    .logout()
                    .then(function (res) {
                        $location.url("/userlogin");
                    });
            }


            function createBookRequest(libId, bookId) {
                libraryService
                    .createBookRequest(libId, bookId, vm.uid)
                    .then(function (res) {
                        $route.reload();
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