(function () {
    angular
        .module("OnlineLibrary")
        .factory('userService', userService);

    function userService($http) {

        var api = {
            "login": login,
            "logout": logout,
            "register": register,
            "findUserByUserId": findUserByUserId,
            "findUserByUsername": findUserByUsername,
            "likethebook": likethebook,
            "addtowishlist": addtowishlist,
            "removefromwishlist": removefromwishlist,
            "undolike": undolike,
            "updateUser": updateUser,
            "findAllUsers": findAllUsers,
            "deleteUser": deleteUser,
            "addToBannedList": addToBannedList

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

        function findUserByUserId(uid) {
            return $http.get("/api/user/" + uid)
                .then(function (response) {
                    return response.data;
                });
        }

        function likethebook(bid, pid) {
            return $http.post("/api/like/" + bid + "/" + pid)
                .then(function (response) {
                    return response.data;
                });
        }

        function addtowishlist(bid, pid) {
            return $http.post("/api/wish/" + bid + "/" + pid)
                .then(function (response) {
                    return response.data;
                });
        }

        function removefromwishlist(bid, pid) {
            return $http.get("/api/removewish/" + bid + "/" + pid)
                .then(function (response) {
                    return response.data;
                });
        }

        function undolike(bid, pid) {
            return $http.get("/api/removelike/" + bid + "/" + pid)
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

        function findAllUsers() {
            return $http.get("/api/users")
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            return $http.delete('/api/user/' + userId)
                .then(function (response) {
                    return response.data;
                });
        }


        function addToBannedList(aid, uid) {
            return $http.get("/api/addToBannedList/" + aid + "/" + uid)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();