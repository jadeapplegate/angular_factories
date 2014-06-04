BookApp = angular.module("BookApp", [])

BookApp.controller("delmer", ["$scope","$http", ($scope, $http)->
  $scope.books = []
  $http.get("/books.json").success((data)-> $scope.books = data)
  $scope.hello = "hello world"

  $scope.delete = ->
    console.log @book.title
    index = @$index
    $http.delete("/books/#{@book.id}.json").success((data)-> $scope.books.splice(index,1))

  $scope.addBook = ->
    console.log "button clicked"
    console.log @newBook
    # console.log $scope.newBook
    $http.post("/books.json", @newBook).success((data)-> $scope.books.push(data))

  $scope.updateBook = ->
    $http.put("/books/#{@book.id}.json",@book).success (data)=>
      @editBook = false




])

BookApp.config(["$httpProvider", ($httpProvider)->
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
])