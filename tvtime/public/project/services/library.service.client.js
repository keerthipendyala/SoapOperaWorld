(function () {
    angular
        .module("OnlineLibrary")
        .factory('libraryService', libraryService);

    function libraryService($http) {

        var api = {
            "findLibraryById": findLibraryById,
            "findAllLibraries": findAllLibraries,
            "addBookToLibrary": addBookToLibrary,
            "findLibraryByBookId": findLibraryByBookId,
            "createBookRequest": createBookRequest,
            "findRequestsById": findRequestsById,
            "findRequestsByLibraryId": findRequestsByLibraryId,
            "removeBookRequest": removeBookRequest,
            "acceptBookRental": acceptBookRental,
            "reduceInventoryCount": reduceInventoryCount,
            "findRentalsById": findRentalsById,
            "findRentalsByLibraryId": findRentalsByLibraryId,
            "returnBook": returnBook,
            "addToInventory": addToInventory
        };
        return api;

        function findLibraryById(libraryId) {
            return $http.get("/api/library/" + libraryId)
                .then(function (response) {
                    return response.data;
                });
        }

        function findLibraryByBookId(bookId) {
            return $http.get("/api/library?bookId=" + bookId)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllLibraries() {
            return $http.get("/api/libraries")
                .then(function (response) {
                    return response.data;
                });
        }

        function addBookToLibrary(count, bookId, lid, libraryId) {
            return $http.get("/api/addBookToLibrary/" + count + "/" + bookId + "/" + lid + "/" + libraryId)
                .then(function (response) {
                    return response.data;
                });
        }

        function createBookRequest(libId, bookId, studentId) {
            return $http.post("/api/createBookRequest/" + libId + "/" + bookId + "/" + studentId)
                .then(function (response) {
                    return response.data;
                });
        }

        function acceptBookRental(libId, librarianId, bookId, studentId) {
            return $http.post("/api/acceptBookRental/" + libId + "/" + librarianId + "/" + bookId + "/" + studentId)
                .then(function (response) {
                    return response.data;
                });
        }

        function findRequestsById(bookId, studentId) {
            return $http.get("/api/findRequestsById/" + bookId + "/" + studentId)
                .then(function (response) {
                    return response.data;
                });
        }

        function findRequestsByLibraryId(libraryId) {
            return $http.get("/api/findRequestsByLibraryId/" + libraryId)
                .then(function (response) {
                    return response.data;
                });
        }

        function removeBookRequest(libId, bookId, studentId) {
            return $http.delete('/api/bookrequest/' + libId + "/" + bookId + "/" + studentId)
                .then(function (response) {
                    return response.data;
                });
        }

        function reduceInventoryCount(libraryId, bookId) {
            return $http.get("/api/reduceInventoryCount/" + libraryId + "/" + bookId)
                .then(function (response) {
                    return response.data;
                });
        }

        function findRentalsById(studentId) {
            return $http.get("/api/findRentalsById/" + studentId)
                .then(function (response) {
                    return response.data;
                });
        }

        function findRentalsByLibraryId(libraryId) {
            return $http.get("/api/findRentalsByLibraryId/" + libraryId)
                .then(function (response) {
                    return response.data;
                });
        }

        function returnBook(rentalId) {
            return $http.get("/api/returnBook/" + rentalId._id)
                .then(function (response) {
                    return response.data;
                });
        }

        function addToInventory(libraryId, bookId) {
            return $http.get("/api/addToInventory/" + libraryId + "/" + bookId)
                .then(function (response) {
                    return response.data;
                });
        }


    }
})();