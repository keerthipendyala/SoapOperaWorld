(function () {
    angular
        .module("SoapOperaWorld")
        .controller("productdescriptionController", productdescriptionController);

    function productdescriptionController(showService, checkUser, userService, $location, $routeParams, $sce) {
        var vm = this;
        if (checkUser)
            vm.uid = checkUser._id;

        vm.pid = $routeParams['pid'];
        vm.getTrustedURL = getTrustedURL;
        vm.addShow = addShow;
        vm.logout = logout;
        vm.liketheshow = liketheshow;
        vm.undolike = undolike;
        vm.addtowishlist = addtowishlist;
        vm.removefromwishlist = removefromwishlist;

        function init() {
            showService
                .findProductById(vm.pid)
                .then(function (product) {
                    vm.product = product;

                });
            showService
                .getTrailer(vm.pid)
                .then(function (video) {
                    vm.videoresults = video.results;
                    if (vm.videoresults)
                        vm.showTrailerid = vm.videoresults[0].key;
                });

            showService
                .getSimilarShows(vm.pid)
                .then(function (shows_similar) {
                    vm.shows_similar = shows_similar.results;
                });

            showService
                .getCredits(vm.pid)
                .then(function (credits) {
                    vm.cast = credits.cast;
                    // console.log(vm.cast);
                });

            showService
                .findShowByShowId(vm.pid)
                .then(function (show) {
                    vm.show = show;
                });

            if (vm.uid) {
                userService
                    .findUserByUserId(vm.uid)
                    .then(function (user) {
                        vm.like = false;
                        vm.wish = false;
                        vm.user = user;
                        if (vm.user.type === "buyer") {
                            vm.bid = vm.user._id;
                        }
                        if (vm.user.type === "seller") {
                            vm.sid = vm.user._id;
                        }
                        for (i = 0; i < user.shows_liked.length; i++) {
                            if (user.shows_liked[i] === vm.pid)
                                vm.like = true;
                        }
                        for (i = 0; i < user.shows_wishlist.length; i++) {
                            if (user.shows_wishlist[i] === vm.pid)
                                vm.wish = true;
                        }

                    });
            }


        }

        init();


        function getTrustedURL(id) {
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function addShow(newshow) {
            userService
                .addTVShow(vm.pid, vm.sid, newshow)
                .then(function (usr) {
                    if (!usr) {
                        vm.error = 'Could not update show';
                    }
                    else {
                        $location.url("/seller/forsale");
                    }
                });
        }


        function liketheshow() {
            userService
                .liketheshow(vm.bid, vm.pid)
                .then(function (res) {
                    vm.like = true;
                });
        }

        function undolike() {
            userService
                .undolike(vm.bid, vm.pid)
                .then(function (res) {
                    vm.like = false;
                });
        }

        function addtowishlist() {
            userService
                .addtowishlist(vm.bid, vm.pid)
                .then(function (res) {
                    vm.wish = true;
                });
        }

        function removefromwishlist() {
            userService
                .removefromwishlist(vm.bid, vm.pid)
                .then(function (res) {
                    vm.wish = false;
                });
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