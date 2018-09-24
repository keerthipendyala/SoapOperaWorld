    (function(){
        angular
            .module("WebAppMaker")
            .controller("loginController", loginController);

        function loginController(UserService, $location) {
            var vm = this;
            vm.login = login;

            function login(user) {
                UserService
                    .findUserByCredentials(user.username, user.password)
                    .then(function(usr){
                        if(!usr) {
                            vm.error='User not found';
                        }
                        else
                            $location.url('/user/' + usr._id);
                    });
            }
        }
    })();