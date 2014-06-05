BookApp = angular.module("BookApp", [])

BookApp.factory("BooksFactory", function($http) {
  var booksFactory = {};

  booksFactory.getBooks = function() {
    return $http.get("/books.json"); //.success(function(data) { $scope.books = data})
  }

  booksFactory.create = function(book) {
    return $http.post("/books.json", book)
  }

  booksFactory.delete = function(book) {
    return $http.delete("/books/"+book.id+".json", book)
  }

  return booksFactory;

});

BookApp.controller("BooksCtrl", ["$scope","$http", "BooksFactory",
 function($scope, $http, BooksFactory)  {
  $scope.books;
  // $http.get("/books.json").success(function(data) { $scope.books = data} );

  var getBooks = function() {
    BooksFactory.getBooks().success(function(data) { $scope.books = data})
  }

  getBooks();

  $scope.delete = function() {
    var index = this.$index
    BooksFactory.delete(this.book).success(function(data){ 
     $scope.books.splice(index,1)
    })
  }

  $scope.addBook = function() {
    BooksFactory.create(this.newBook).success(function(data){
      $scope.books.push(data);
    }); 
    $scope.newBook = {};
    //$http.post("/books.json", this.newBook).success(function(data) { $scope.books.push(data)})
  }

  $scope.updateBook = function() {
    var _this = this;
    $http.put("/books/" + this.book.id + ".json",this.book).success(function(data) {
      _this.editBook = false
    });
  }

}]);

BookApp.config(["$httpProvider", function($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);