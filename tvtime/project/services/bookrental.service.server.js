module.exports = function (app, model) {
    app.post("/api/acceptBookRental/:lid/:librarianId/:bookId/:studentId", acceptBookRental);
    app.get("/api/findRentalsById/:studentId", findRentalsById);
    app.get("/api/findRentalsByLibraryId/:lid", findRentalsByLibraryId);
    app.get("/api/returnBook/:rentalId", returnBook);


    function acceptBookRental(req, res) {
        var bookId = req.params['bookId'];
        var librarianId = req.params['librarianId'];
        var lid = req.params['lid'];
        var studentId = req.params['studentId'];
        var dateIssued = new Date();
        var newRequest = {
            dateIssued: dateIssued,
            libraryId: lid,
            librarianId: librarianId,
            bookId: bookId,
            studentId: studentId
        };
        model.bookrentalsmodel
            .acceptBookRental(newRequest)
            .then(function (newRequest) {
                res.send(newRequest);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }

    function findRentalsById(req, res) {
        var studentId = req.params['studentId'];
        model.bookrentalsmodel
            .findRentalsById(studentId)
            .then(function (newRequest) {
                res.send(newRequest);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function returnBook(req, res) {
        var rentalId = req.params['rentalId'];
        var dateReturned = new Date();
        model.bookrentalsmodel
            .returnBook(rentalId, dateReturned)
            .then(function (newRequest) {
                res.send(newRequest);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findRentalsByLibraryId(req, res) {
        var lid = req.params['lid'];
        model.bookrentalsmodel
            .findRentalsByLibraryId(lid)
            .then(function (newRequest) {
                res.send(newRequest);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};