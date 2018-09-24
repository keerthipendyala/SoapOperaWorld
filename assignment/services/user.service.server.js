module.exports = function (app,model) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);

    function findUserByUserId(req, res) {
        var userId = req.params['userId'];
        model.userModel
            .findUserByUserId(userId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }


    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
         model.userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model.userModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createUser(req, res) {
            model.userModel
                .createUser(req.body)
                .then(function (user){
                    res.send(user);
                }, function(err) {
                    res.sendStatus(500).send(err);
        });
    }

    function deleteUser(req, res) {
        model.userModel
            .deleteUser(req.params.userId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }


    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser = req.body;
        model.userModel
            .updateUser(req.params.userId,newUser)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};