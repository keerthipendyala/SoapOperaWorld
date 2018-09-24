(function () {
    angular
        .module("OnlineLibrary")
        .controller("userloginController", userloginController);

    function userloginController(userService, $scope, $location) {
        var vm = this;
        vm.login = login;
        vm.logout = logout;


        function login(user) {
            if ($scope.formLogin.$valid) {
                userService
                    .login(user)
                    .then(function (usr) {
                        if (!usr) {
                            vm.error = 'User not found';
                        }
                        else {
                            if (usr.type == 'admin')
                                $location.url('/admin/AllUsers/'+usr._id);
                            else
                                $location.url('/user/' + usr._id + '/book');
                        }
                    });
            }
            else {
                $scope.formLogin.submitted = true;
                vm.error = "Form incomplete!!";
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