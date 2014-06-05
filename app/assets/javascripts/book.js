BookApp = angular.module("BookApp", [])
 
BookApp.factory("BooksFactory", function() {
  booksFactory = {};
 
  booksFactory.getBooks = function() {
    $http.get("/books.json") //.success(function(data) { $scope.books = data})
  }
 
  return booksFactory
});
 
BookApp.controller("delmer", ["$scope","$http", "BooksFactory",
 function ($scope, $http, BooksFactory) {
  var $scope.books;
  // $http.get("/books.json").success(function(data) { $scope.books = data} );
 
  getBooks();
 
  getBooks = function() {
    BooksFactory.getBooks().success(function(data) { $scope.books = data})
  }
 
  $scope.delete = function() {
    var index = this.$index;
    $http.delete("/books/" + this.book.id + ".json").success(function(data) { $scope.books.splice(index,1)})
  }
 
  $scope.addBook = function() {
    $http.post("/books.json", this.newBook).success(function(data) { $scope.books.push(data)})
  }
 
  $scope.updateBook = function() {
    var _this = this;
    $http.put("/books/" + this.book.id + ".json",this.book).success(function(data) {
      _this.editBook = false
    }
  }
 
}]);
 
BookApp.config(["$httpProvider", function($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);