    (function () {
        angular
            .module("WebAppMaker")
            .controller("profileController", profileController);

        function profileController($routeParams, UserService) {
            var vm = this;
            vm.userId = $routeParams['uid'];
            vm.update = update;
            vm.deleteUser = deleteUser;

            function init() {
                UserService
                    .findUserById(vm.userId)
                    .then(renderUser);
            }
            init();

            function update(newUser) {
                UserService
                    .updateUser(vm.userId, newUser)
                    .then(function (usr) {
                        if(!usr)
                            vm.error = "unable to update user";
                        else
                            vm.message = "user successfully updated";
                    });
            };

            function renderUser(user) {
                vm.user = user;
            }

            function deleteUser() {
                UserService
                    .deleteUser(vm.userId)
                    .then(function (usr) {
                        if(usr)
                          vm.error = "Account Deactivated!";
                });
            };

        }
    })();