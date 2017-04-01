$(function(){
  // Targets
  const errorFlash = $(".error-flash");
  // Add the categories to this obj for fast lookup for the todos
  const categoryObj = {};

  // Handlebars Joy
  // TODO: update the source html to a jQuery .html() of the script tags on the index
  const sourceTodoHtml = `<li data-id="{{id}}" data-rank="{{rank}}"><label><input type="checkbox" checked="{{completed}}">{{title}}</label></li>`;
  const sourceCatHtml = `<section><header><h3>{{name}}</h3><h3 class="cat-number"></h3></header><ul class="todo-wrapper"></ul></section>`;
  const templateTodo = Handlebars.compile(sourceTodoHtml);
  const templateCat = Handlebars.compile(sourceCatHtml);

  // make a function that renders one TODO
  function todoMaker(todo) {
    // use handlebars to render one todo
    const context = {
      id: todo.id,
      rank: todo.rank,
      title: todo.title,
      completed: todo.completed
    };
    return templateTodo(context);
  }

  // make a function that renders one category with an id of #cat_<category_id>
  function categoryMaker(category) {
    // render a category with handlebars
    const context = {
      id: category.id,
      name: category.name
    };
    return templateCat(context);
  }

  // make a function that loops over array of todos and sends them to todoMaker
  function todoLooper(todoArr) {
    todoArr.forEach((todo) => {
      // render a todo
      let todoHtml = todoMaker(todo);
      // append the todo to the category by id #cat_<category_id> use the categoryObj to do it
      console.log(todoHtml);
      console.log($(categoryObj[todo.category_id]).find(".todo-wrapper"));
      // $(categoryObj[todo.category_id]).find(".todo-wrapper").append(todoHtml);
    });
    countTodos();
  }

  // make a function that loops over array of categories and sends them to categoryMaker
  function categoryLooper(categoryArr, todoArr, cb) {
    // sort arrays by category id first if they aren't already 
    $("section.categories").html(categoryArr.map((category) => {
      const catHtml = categoryMaker(category);
      categoryObj[category.id] = catHtml;
      return catHtml;
    }));
    cb(todoArr);
  }

  // make a function that gets todos and categories and is the controller
  function todoController(){
    $.ajax({
      method: 'GET',
      url: '/todos',
      success: function (data){
        categoryLooper(data.categories, data.todos, todoLooper);
      },
      fail: function(err) {
        errorFlash.text(err.error);
      }
    });
  }

/******************************************************************************/
/*********************** Form submitting todo *********************************/
/******************************************************************************/
  function validateForm(text) {
    if ($.trim(text.val()).length === 0) {
      // TODO: Change to a pretty flash message
      alert ("Can not sumbit an empty item");
      return false;
    }
    else if (text.val().length > 127 ) {
      // TODO: Change to a pretty flash message
      alert ("Exceeded character limit of 127");
      return false;
    }
    else {
      return true;
    }
  }

  function countTodos() {
    // count the todo elements in each category and change the number at top right to the count
    const catNumber = $(".cat-number");
    catNumber.each(() => {
      let count = $(this).closest("section").find(".todo-wrapper").children().length;
      $(this).text(count);
    });
  }

  // TODO: make a function that will remove the click handlers to expand to single category mode on all of the categories
  // TODO: and then removes todos from the categories
  // TODO: and then adds a click handler to submit the PUT /todos/:todoId/category
  // TODO: this function will be added to all categories when they are made

  // TODO: make a function that will remove the click handlers to submit PUT /todos/:todoId/category
  // TODO: and then does an ajax call to PUT /todos/:todoId/category passing the category_id in the body which on success will:
  // TODO:  - add the todos to the categories by calling todoLooper()
  // TODO: and then adds a click handler to expand to single category mode on all of the categories

  function addedTodo(todo) {
    // TODO: if todo.conflict is true render the select category page
    // TODO: otherwise:
    // change the categories number of todos
    countTodos();
    // TODO: if there is less than 3 todos render the todo to the category
  }

  var text = $('#what-todo-box');
  $('#what-todo-box').on('submit', function (event) {
      event.preventDefault();

      if(validateForm(text)) {
        $.ajax({
          method: 'POST',
          url:'/todos',
          data: text.val().serialize(),
// TODO: on route we need to send back down a todo obj with a property of .conflict set to either false or true if could not choose cat
          success: function(todo){ 
            addedTodo(todo);
            text.val('');
          }
        });
      }
  });

  // Called at start
  todoController();

});