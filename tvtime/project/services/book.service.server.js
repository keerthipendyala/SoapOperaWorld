module.exports = function (app, model) {
    app.post("/api/createBook", createBook);
    app.get("/api/book", findBookByIsbn);
    app.get("/api/book/:bid", findBookById);




    function createBook(req, res) {
        var book = req.body;
        model.bookmodel
            .createBook(book)
            .then(function (book) {
                        res.send(book);
                        }, function(err) {
                res.sendStatus(500).send(err);
            });

    }

    function findBookByIsbn(req, res) {
        var isbn = req.query['isbn'];
        model.bookmodel
            .findBookByIsbn(isbn)
            .then(function (book) {
                res.send(book);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }


    function findBookById(req, res) {
        var bookId = req.params['bid'];
        model.bookmodel
            .findBookById(bookId)
            .then(function (book) {
                res.send(book);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};