(function () {
    angular
        .module("SoapOperaWorld")
        .controller("userloginController", userloginController);

    function userloginController(userService,$scope, $location) {
        var vm = this;
        vm.login = login;
        vm.logout = logout;


        function login(user) {
            if ($scope.formLogin.$valid) {
                userService
                    .login(user)
                    .then(function (usr) {
                        $location.url('/user');
                    }, function (err) {
                        vm.error = 'User not found';
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