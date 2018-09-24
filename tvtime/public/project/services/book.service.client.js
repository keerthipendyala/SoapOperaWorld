(function () {
    angular
        .module("OnlineLibrary")
        .factory('bookService', bookService);

    function bookService($http) {

        var api = {
            "getAllBooks": getAllBooks,
            "getBookByIsbn": getBookByIsbn,
            "searchBooks": searchBooks,
            "getBookById": getBookById,
            "createBook": createBook,
            "findBookByIsbn": findBookByIsbn,
            "findBookById": findBookById
        };
        return api;


        function getAllBooks() {
            var url = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json";
            url += '?' + $.param({
                'api-key': "536e4918c59c4c568350cca998156d91"
            });
            return $http.get(url)
                .then(function (response) {
                    return (response.data);
                });
        }

        function getBookByIsbn(isbn) {
            var key = "AIzaSyDFTMvxCHI_czKovlf8xShsdHbxwMFW9LM";
            var urlBase = "https://www.googleapis.com/books/v1/volumes?q=isbn:ISBN&api_key=KEY";
            var url = urlBase.replace("ISBN", isbn);
            url = url.replace("KEY", key);
            return $http.get(url)
                .then(function (response) {
                    return (response.data);
                });
        }

        function searchBooks(title) {
            var key = "AIzaSyDFTMvxCHI_czKovlf8xShsdHbxwMFW9LM";
            var urlBase = "https://www.googleapis.com/books/v1/volumes?q=TEXT&key=KEY";
            var url = urlBase.replace("TEXT", title);
            url = url.replace("KEY", key);
            return $http.get(url)
                .then(function (response) {
                    return (response.data);
                });
        }

        function getBookById(bookid) {
            var key = "AIzaSyDFTMvxCHI_czKovlf8xShsdHbxwMFW9LM";
            var urlBase = "https://www.googleapis.com/books/v1/volumes/ID";
            var url = urlBase.replace("ID", bookid);
            url = url.replace("KEY", key);
            return $http.get(url)
                .then(function (response) {
                    return (response.data);
                });
        }

        function createBook(book) {
            return $http.post("/api/createBook", book)
                .then(function (response) {
                    return response.data;
                });
        }

        function findBookByIsbn(isbn) {
            return $http.get("/api/book?isbn=" + isbn)
                .then(function (response) {
                    return response.data;
                });

        }

        function findBookById(id) {
            return $http.get("/api/book/" + id)
                .then(function (response) {
                    return response.data;
                });

        }
    }
})();