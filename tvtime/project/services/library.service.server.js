module.exports = function (app, model) {
    app.get("/api/library", findLibraryByBookId);
    app.get("/api/library/:libraryId", findLibraryById);
    app.get("/api/libraries", findAllLibraries);
    app.get("/api/addBookToLibrary/:count/:bookId/:lid/:libraryId", addBookToLibrary);
    app.get("/api/reduceInventoryCount/:libraryId/:bookId", reduceInventoryCount);
    app.get("/api/addToInventory/:libraryId/:bookId", addToInventory);

    function findLibraryById(req, res) {
        var libraryId = req.params['libraryId'];
        model.librarymodel
            .findLibraryById(libraryId)
            .then(function (library) {
                res.send(library);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findAllLibraries(req, res) {
        model.librarymodel
            .findAllLibraries()
            .then(function (libraries) {
                res.send(libraries);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function addToInventory(req, res) {
        var bookId = req.params['bookId'];
        var libraryId = req.params['libraryId'];

        model.librarymodel
            .addToInventory(libraryId, bookId)
            .then(function (resul) {
                res.send(resul);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function reduceInventoryCount(req, res) {
        var bookId = req.params['bookId'];
        var libraryId = req.params['libraryId'];

        model.librarymodel
            .reduceInventoryCount(libraryId, bookId)
            .then(function (resul) {
                res.send(resul);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }


    function addBookToLibrary(req, res) {
        var bookId = req.params['bookId'];
        var lid = req.params['lid'];
        var libraryId = req.params['libraryId'];
        var count = req.params['count'];

        model.librarymodel
            .addBookToLibrary(count, bookId, lid, libraryId)
            .then(function (resul) {
                res.send(resul);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }


    function findLibraryByBookId(req, res) {
        var bookId = req.query['bookId'];
        model.librarymodel
            .findLibraryByBookId(bookId)
            .then(function (lib) {
                res.send(lib);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

};