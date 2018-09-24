(function () {
    angular
        .module("OnlineLibrary")
        .controller("productdescriptionController", productdescriptionController);

    function productdescriptionController(bookService, libraryService, userService, $location, $routeParams) {
        var vm = this;

        vm.pid = $routeParams['pid'];
        vm.uid = $routeParams['uid'];
        vm.logout = logout;
        vm.addBook = addBook;
        vm.likethebook = likethebook;
        vm.undolike = undolike;
        vm.addtowishlist = addtowishlist;
        vm.removefromwishlist = removefromwishlist;
        vm.checkOrCreateBook = checkOrCreateBook;
        vm.likeOrWishBook = likeOrWishBook;

        function init() {
            bookService
                .getBookById(vm.pid)
                .then(function (product) {
                    vm.product = product;
                });

            if (vm.uid == 9999) {
                vm.gid = 9999
            }

            else {
                bookService
                    .findBookByIsbn(vm.pid)
                    .then(function (response) {
                        if (response) {
                            vm.resId = response._id;
                        }
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

                                    for (var i = 0; i < vm.user.books_liked.length; i++) {
                                        if (vm.user.books_liked[i] === vm.resId)
                                            vm.like = true;
                                    }
                                    for (var i = 0; i < vm.user.books_wished.length; i++) {
                                        if (vm.user.books_wished[i] === vm.resId)
                                            vm.wish = true;
                                    }
                                }
                            });
                    });
            }
        }

        init();

        function addBook(newbook) {
            var cBook = {
                bookIsbn: vm.pid,
                title: vm.product.volumeInfo.title,
                image: vm.product.volumeInfo.imageLinks.smallThumbnail
            };

            bookService
                .findBookByIsbn(vm.pid)
                .then(function (response) {
                    if (!response) {
                        bookService.createBook(cBook)
                            .then(function (res) {
                                libraryService
                                    .addBookToLibrary(newbook.count, res._id, vm.lid, vm.library._id)
                                    .then(function (res) {
                                        vm.message = "Successfully Added to Library!"
                                    });
                            }, function (err) {
                                vm.error = "Please try again"
                            });
                    }
                    else {
                        libraryService
                            .addBookToLibrary(newbook.count, response._id, vm.lid, vm.library._id)
                            .then(function (res) {
                                vm.message = "Successfully Added to Library!"
                            });
                    }
                });


        }

        function likethebook(id) {
            userService
                .likethebook(vm.sid, id)
                .then(function (res) {
                    vm.like = true;
                });
        }

        function undolike() {
            userService
                .undolike(vm.sid, vm.resId)
                .then(function (res) {
                    vm.like = false;
                });
        }

        function addtowishlist(id) {
            userService
                .addtowishlist(vm.sid, id)
                .then(function (res) {
                    vm.wish = true;
                });
        }

        function removefromwishlist() {
            userService
                .removefromwishlist(vm.sid, vm.resId)
                .then(function (res) {
                    vm.wish = false;
                });
        }

        function checkOrCreateBook(action) {
            var cBook = {
                bookIsbn: vm.pid,
                title: vm.product.volumeInfo.title,
                image: vm.product.volumeInfo.imageLinks.smallThumbnail
            };

            bookService
                .findBookByIsbn(vm.pid)
                .then(function (response) {
                    if (!response) {
                        bookService.createBook(cBook)
                            .then(function (res) {
                                vm.likeOrWishBook(res._id, action);
                            });
                    }
                    else {
                        vm.likeOrWishBook(response._id, action);

                    }
                });
        }

        function likeOrWishBook(id, action) {
            vm.dbBookId = id;
            if (action == 'like') {
                vm.likethebook(id);
            }
            if (action == 'wish') {
                vm.addtowishlist(id);
            }
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

    }
})();