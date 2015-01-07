
$(function() {

  var socket = io.connect('/');
  var editor = ace.edit('editor');
  
  editor.setTheme('ace/theme/xcode');
  editor.getSession().setMode('ace/mode/javascript'); 
  editor.setValue('var sum = 0;\n\nfor(var i=0; i< 10; i++) {\n    sum += i;\n}\nconsole.log(\'Sum is \' + sum)\nsum;');

  var session = editor.getSession();
  session.on('change', function() {
    var value = session.getValue();
    socket.emit('msg', { code : value });
  });

  socket.on('res', function (data) {
    console.log('result: ' + data.result + ', console: ' + data.console);
  });
  
  
});

var app = angular.module('myapp', ['ui.ace']);

/*
angular.module('todoApp', [])
  .controller('TodoController', ['$scope', function($scope) {
    $scope.todos = [
      {text:'learn angular', done:true},
      {text:'build an angular app', done:false}];
    
    $scope.addTodo = function() {
      $scope.todos.push({text:$scope.todoText, done:false});
      $scope.todoText = '';
    };
    
    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
    
    $scope.archive = function() {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) $scope.todos.push(todo);
      });
    };
  }]);


function HelloWorldController($scope) {
  $scope.message = 'Hello World';
}
*/
