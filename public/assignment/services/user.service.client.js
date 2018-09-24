(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService($http) {

        var api = {
            "createUser": createUser,
            "deleteUser": deleteUser,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername
        };
        return api;


        function deleteUser(userId) {
            return $http.delete('/api/user/'+userId)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            return $http.post("/api/user", user)
            .then(function (response) {
                return response.data;
            });
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username)
                .then(function (response) {
                    return response.data;
                });

        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, newUser) {
             return $http.put("/api/user/"+userId, newUser)
                 .then(function (response) {
                     return response.data;
                 });
        }

        function findUserById(uid) {
            return $http.get("/api/user/"+uid)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();