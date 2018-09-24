(function () {
    angular
        .module("SoapOperaWorld")
        .factory('userService', userService);

    function userService($http) {

        var api = {
            "login": login,
            "logout": logout,
            "loggedIn": loggedIn,
            "createUser": createUser,
            "deleteUser": deleteUser,
            "updateUser": updateUser,
            "register": register,
            "liketheshow": liketheshow,
            "undolike": undolike,
            "findUserByCredentials": findUserByCredentials,
            "findUserByUserId": findUserByUserId,
            "findUserByUsername": findUserByUsername,
            "addShow": addShow,
            "addTVShow": addTVShow,
            "addtowishlist": addtowishlist,
            "removefromwishlist": removefromwishlist,
            "findAllUsers": findAllUsers,
            "addToFav": addToFav,
            "removeFav": removeFav,
            "createAdminUser": createAdminUser
        };
        return api;


        function login(User) {
            return $http.post("/api/login", User)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            return $http.post("/api/logout")
                .then(function (response) {
                    return response.data;
                });
        }

        function loggedIn() {
            return $http.get('/api/loggedIn')
                .then(function (response) {
                    return response.data;
                });
        }


        function deleteUser(UserId) {
            return $http.delete('/api/user/' + UserId)
                .then(function (response) {
                    return response.data;
                });
        }


        function createUser(User) {
            return $http.post("/api/user", User)
                .then(function (response) {
                    return response.data;
                });
        }

        function createAdminUser(User) {
            return $http.post("/api/admin/create", User)
                .then(function (response) {
                    return response;
                });
        }

        function register(User) {
            return $http.post("/api/register", User)
                .then(function (response) {
                    return response.data;
                });
        }


        function findUserByUsername(Username) {
            return $http.get("/api/user?username=" + Username)
                .then(function (response) {
                    return response.data;
                });

        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username=" + username + "&password=" + password)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/" + userId, newUser)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUserId(uid) {
            return $http.get("/api/user/" + uid)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers() {
            return $http.get("/api/users/")
                .then(function (response) {
                    return response.data;
                });
        }


        function updateSeller(sellerId, newseller) {
            return $http.put("/api/seller/" + sellerId, newseller)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateShow(showId, newshow) {
            return $http.put("/api/show/" + showId, newshow)
                .then(function (response) {
                    return response.data;
                });
        }


        function getShows(show) {
            var key = "53b51c871dad98d0c04e5b6c841e5240";
            var query = show.showname;
            var urlBase = "https://api.themoviedb.org/3/search/tv?api_key=API_KEY&language=en-US&query=TEXT&page=1";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", query);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function addShow(sid, pid, show) {
            return $http.post("/api/seller/" + sid + "/" + pid, show)
                .then(function (response) {
                    return response.data;
                });
        }

        function addToFav(uid, sid) {
            return $http.post("/api/fav/" + uid + "/" + sid)
                .then(function (response) {
                    return response.data;
                });
        }

        function removeFav(uid, sid) {
            return $http.post("/api/unfav/" + uid + "/" + sid)
                .then(function (response) {
                    return response.data;
                });
        }

        function liketheshow(bid, pid) {
            return $http.post("/api/like/" + bid + "/" + pid)
                .then(function (response) {
                    return response.data;
                });
        }

        function undolike(bid, pid) {
            return $http.post("/api/undolike/" + bid + "/" + pid)
                .then(function (response) {
                    return response.data;
                });
        }


        function addtowishlist(bid, pid) {
            return $http.post("/api/wishlist/" + bid + "/" + pid)
                .then(function (response) {
                    return response.data;
                });
        }

        function removefromwishlist(bid, pid) {
            return $http.post("/api/removewish/" + bid + "/" + pid)
                .then(function (response) {
                    return response.data;
                });
        }

        function addTVShow(pid, sid, show) {
            return $http.post("/api/seller/show/" + sid + "/" + pid, show)
                .then(function (response) {
                    return response.data;
                });
        }

        function addSeller(pid, sid) {
            return $http.post("/api/show/" + sid + "/" + pid)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();