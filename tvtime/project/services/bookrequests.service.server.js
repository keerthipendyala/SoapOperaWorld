module.exports = function (app, model) {
    app.post("/api/createBookRequest/:lid/:bookId/:studentId", createBookRequest);
    app.get("/api/findRequestsById/:bookId/:studentId", findRequestsById);
    app.get("/api/findRequestsByLibraryId/:lid", findRequestsByLibraryId);
    app.delete("/api/bookrequest/:lid/:bookId/:studentId", removeBookRequest);


    function createBookRequest(req, res) {
        var bookId = req.params['bookId'];
        var lid = req.params['lid'];
        var studentId = req.params['studentId'];
        var newRequest = {libraryId: lid, bookId: bookId, studentId: studentId};
        model.bookrequestsmodel
            .createBookRequest(newRequest)
            .then(function (newRequest) {
                res.send(newRequest);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }


    function findRequestsById(req, res) {
        var bookId = req.params['bookId'];
        var studentId = req.params['studentId'];
        model.bookrequestsmodel
            .findRequestsById(bookId, studentId)
            .then(function (newRequest) {
                res.send(newRequest);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findRequestsByLibraryId(req, res) {
        var lid = req.params['lid'];
        model.bookrequestsmodel
            .findRequestsByLibraryId(lid)
            .then(function (newRequest) {
                res.send(newRequest);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function removeBookRequest(req, res) {
        var bookId = req.params['bookId'];
        var lid = req.params['lid'];
        var studentId = req.params['studentId'];
        model.bookrequestsmodel
            .removeBookRequest(lid, bookId, studentId)
            .then(function (newRequest) {
                res.send(newRequest);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }

};