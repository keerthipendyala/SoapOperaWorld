(function () {
    angular
        .module("SoapOperaWorld")
        .controller("homeController", homeController);

    function homeController(checkUser, showService, userService, $location) {
        var vm = this;
        vm.logout = logout;

        if (checkUser)
            vm.uid = checkUser._id;

        vm.getTVShows = getTVShows;

        function init() {
            showService
                .getAllTVShows()
                .then(function (tvsho) {
                    vm.tvshow = tvsho.results;
                    vm.posters = [];
                    for (var i = 0; i < vm.tvshow.length; i++) {
                        if (vm.tvshow[i].poster_path)
                            vm.posters[i] = "https://image.tmdb.org/t/p/original/" + vm.tvshow[i].poster_path;
                    }
                });

            showService
                .getLatest()
                .then(function (tvsho) {
                    vm.tvshows = tvsho.results;
                    vm.backdrop = [];
                    for (var i = 0; i < vm.tvshows.length; i++) {
                        if (vm.tvshows[i].backdrop_path)
                            vm.backdrop[i] = "https://image.tmdb.org/t/p/original/" + vm.tvshows[i].backdrop_path;
                    }
                });
        }

        init();


        $(function () {
            $('#myCarousel').carousel();
        });

        function getTVShows(show) {
            showService
                .getTVShows(show)
                .then(function (response) {
                    vm.shows = response.results;
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