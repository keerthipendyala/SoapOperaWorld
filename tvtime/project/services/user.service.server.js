module.exports = function (app, model) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.post("/api/register", register);
    app.post("/api/login", login);
    app.post("/api/logout", logout);
    app.post("/api/like/:userId/:pid", likethebook);
    app.post("/api/wish/:userId/:pid", addtowishlist);
    app.get("/api/removewish/:userId/:pid", removefromwishlist);
    app.get("/api/removelike/:userId/:pid", undolike);
    app.get("/api/users", findAllUsers);
    app.delete("/api/user/:uid", deleteUser);
    app.get("/api/addToBannedList/:adminId/:userId", addToBannedList);


    function login(req, res) {
        var user = req.body;
        model.usermodel
            .findUserByCredentials(user.username, user.password)
            .then(
                function (user) {
                    res.send(user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function logout(req, res) {
        res.sendStatus(200);
    }

    function addToBannedList(req, res) {
        var adminId = req.params['adminId'];
        var userId = req.params['userId'];
        model.usermodel
            .addToBannedList(adminId, userId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserByUserId(req, res) {
        var userId = req.params['userId'];
        model.usermodel
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
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        model.usermodel
            .findUserByUsername(username)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function likethebook(req, res) {
        var userId = req.params.userId;
        var bookId = req.params.pid;
        model.usermodel
            .likethebook(userId, bookId)
            .then(function (book) {
                model.bookmodel
                    .likethebook(userId, bookId)
                    .then(function (book) {
                        res.send(book);
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function addtowishlist(req, res) {
        var userId = req.params.userId;
        var bookId = req.params.pid;
        model.usermodel
            .addtowishlist(userId, bookId)
            .then(function (book) {
                model.bookmodel
                    .addtowishlist(userId, bookId)
                    .then(function (book) {
                        res.send(book);
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function removefromwishlist(req, res) {
        var userId = req.params.userId;
        var bookId = req.params.pid;
        model.usermodel
            .removefromwishlist(userId, bookId)
            .then(function (user) {
                model.bookmodel
                    .removefromwishlist(userId, bookId)
                    .then(function (book) {
                        res.send(book);
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function undolike(req, res) {
        var userId = req.params.userId;
        var bookId = req.params.pid;
        model.usermodel
            .undolike(userId, bookId)
            .then(function (book) {
                model.bookmodel
                    .undolike(userId, bookId)
                    .then(function (book) {
                        res.send(book);
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function register(req, res) {
        var user = req.body;
        model.usermodel
            .createUser(user)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser = req.body;
        model.usermodel
            .updateUser(userId, newUser)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findAllUsers(req, res) {
        model.usermodel
            .findAllUsers()
            .then(function (users) {
                res.send(users);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params['uid'];
        model.usermodel
            .deleteUser(userId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

};