var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,   //first is property, second is param
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    // this.todos[position] = newValue;
    this.todos[position].todoText = todoText;
  }, 
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    //*** NEW WAY: Get number of completed todos. (forEach vs for)
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    
    this.todos.forEach(function(todo) {
      //*** BEST If evertyhing is true, make everything false
      if (completedTodos === totalTodos) {
        todo.completed = false;
        
      //*** BEST otherwise make everything true
      } else {
        todo.completed = true;
      }
    }); 
  }
    
      //   *** NEW WAY If everything is true, make everything false. (forEach vs for)
      // if (completedTodos === totalTodos) {
      //   this.todos.forEach(function(todo) {
      //     todo.completed = false; 
      //   });
    
      //   *** NEW WAY Otherwise, make everything true. (forEach vs for)
      // } else {
      //   this.todos.forEach(function(todo) {
      //     todo.completed = true;
      //   });
      // }
  
  
    //*** OLD WAY: Get number of completed todos
    //for (var i = 0; i < totalTodos; i++) {
    //  if (this.todos[i].completed === true) {
    //    completedTodos++;
    //  }
    // }
    
    //*** OLD WAY If everything is true, make everything false
    //if (completedTodos === totalTodos) {
    //  for (var i = 0; i < totalTodos; i++) {
    //    this.todos[i].completed = false;
    //  }

    //*** OLD WAY Otherwise, make everything true.   
    // } else {
    //  for (var i = 0; i < totalTodos; i++) {
    //    this.todos[i].completed = true;
    //  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  }, 
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  }, 
  toggleCompleted: function() {
    var toggleCompletedTodoPositionInput = document.getElementById('toggleCompletedTodoPositionInput');
    todoList.toggleCompleted(toggleCompletedTodoPositionInput.valueAsNumber);
    toggleCompletedTodoPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
  todoList.toggleAll();
  view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var todoTextWithCompletion = '';
      
      if (todo.completed === true) {
        todoTextWithCompletion = '[x] ' + todo.todoText;
      } else {
        todoTextWithCompletion = '[_] ' + todo.todoText;
      }
      
      todoLi.id = i;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }
  },
  
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className = 'deleteButton';
    return deleteButton;
  }, 
  
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');
    
    todosUl.addEventListener('click', function(event) {
      // Get the element that was clicked on
      var elementClicked = event.target;
      
      // Check if element clicked is a delete button.
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo( parseInt(elementClicked.parentNode.id)); //parseInt turns string to a number
      }
    });
  }
};

view.setUpEventListeners();










