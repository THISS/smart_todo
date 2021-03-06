let globalRender;
$(function(){
  // Targets
  const errorFlash = $(".error-flash");
  const categories = $(".categories");
  let catSection;
  const whatTodoBox = $('#what-todo-box');
  // Add the categories to this obj for fast lookup for the todos
  const categoryObj = {};

  // Handlebars Joy
  // TODO: update the source html to a jQuery .html() of the script tags on the index
  // const sourceTodoHtml = `<li data-id="{{id}}" data-rank="{{rank}}"><label><input type="checkbox" {{#if completed}}checked {{/if}} >{{title}}</label></li>`;
  // const sourceCatHtml = `<section data-id="{{id}}"><header><h3>{{name}}</h3><h3 class="cat-number"></h3></header><ul class="todo-wrapper"></ul></section>`;
  const sourceTodoHtml = $("#todo-html").html();
  const sourceCatHtml = $("#category-html").html();
  const templateTodo = Handlebars.compile(sourceTodoHtml);
  const templateCat = Handlebars.compile(sourceCatHtml);

/*********************************************************************************/
/*********************** the main todo renderers *********************************/
/*********************************************************************************/

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
      const categoryUl = categoryObj[todo.category_id].find("ul");
      $(todoHtml).appendTo(categoryUl);
    });
    countTodos();
  }

  // make a function that loops over array of categories and sends them to categoryMaker
  function categoryLooper(categoryArr) {
    // sort arrays by category id first if they aren't already 
    $("section.categories").html(categoryArr.map(categoryMaker));
  }

/********************************************************************************/
/*********************** All our Ajax functions *********************************/
/********************************************************************************/

  function getAllTodosAndCategories(errCb, successCb) {
    $.ajax({
      method: 'GET',
      url: '/todos',
      success: successCb,
      fail: errCb
    });
  }

  // get all the todos for the category
  function getTodosForCategory(categoryId, errCb, successCb) {
    $.ajax({
      method: 'GET',
      url: `/todos/category/${categoryId}`,
      success: successCb,
      fail: errCb
    });
  }

  // get a Todo
  function getATodo(todoId, errCb, successCb) {
    $.ajax({
      method: 'GET',
      url: `/todos/${todoId}`,
      success: successCb,
      fail: errCb
    });
  }

  // Delete Todo
  function deleteTodo(todoId, errCb, successCb) {
    $.ajax({
      method: 'DELETE',
      url: `/todos/${todoId}`,
      success: successCb,
      fail: errCb
    });
  }

  // Update the category
  function updateCategory(catId, todoId, errCb, successCb) {
    const updateObj = {category_id: catId};
    $.ajax({
      method: 'PUT',
      url:`/todos/${todoId}/category`,
      data: updateObj,
      success: successCb,
      fail: errCb
    });
  }
  // Update the title
  function updateTitle(title, todoId, errCb, successCb) {
    const updateObj = {title: title};
    $.ajax({
      method: 'PUT',
      url:`/todos/${todoId}/title`,
      data: updateObj,
      success: successCb,
      fail: errCb
    });
  }

  // update the completed
  function updateCompleted(completed , todoId, errCb, successCb) {
    const updateObj = {completed: completed};
    $.ajax({
      method: 'PUT',
      url:`/todos/${todoId}/completed`,
      data: updateObj,
      success: successCb,
      fail: errCb
    });
  }

  // Change the ranks in a category
  // need to pass in an array of objects in the form {id: todoId, rank: newRank}
  function updateRanks(todoRanksObj, errCb, successCb) {
    $.ajax({
      method: 'PUT',
      url: `/todos/rankupdate`,
      data: todoRanksObj,
      success: successCb,
      fail: errCb
    });
  }

  // Insert a new todo
  function insertTodo(title ,errCb, successCb) {
    $.ajax({
      method: 'POST',
      url:'/todos',
      data: {title: title},     
      success: successCb,
      fail: errCb
    });
  }
/******************************************************************************/
/*********************** Set Events to Watch **********************************/
/******************************************************************************/
  function setEventHandlers() {

    initRankSort();

    // When someone submits a todo 
    whatTodoBox.on("keyup", function(event) {
      const key = event.which;
      const wtdBg = whatTodoBox.closest(".what-todo-box-bg");

      if(key === 13) {
        handlerInsertTodo();
        wtdBg.removeClass("active");
      }
      if(key === 27) {
        $(this).val("");
        wtdBg.removeClass("active");
      }
    });

    whatTodoBox.closest(".what-todo-box-bg")
    .on("click", ".todo-add", handlerInsertTodo);

    categories.on("click", ".cat-column", renderCategoryFocusPage);

    const todoWrapper = $(".todo-wrapper");
    // Checkbox completed handler
    todoWrapper.on("click", "input[type=checkbox]", handlerChecked);

    // Delete Button handler
    todoWrapper.on("click", ".trash", handlerDelete);

    // Edit Button handler
    todoWrapper.on("click", ".edit", handlerEdit);

    // Save Edit Button handler
    todoWrapper.on("click", ".save-edit", handlerSaveEdit);

    // Change Category Button handler
    todoWrapper.on("click", ".change-category-edit", handlerChangeCategoryEdit);
  }

/******************************************************************************/
/*********************** Sortable for rank sort *******************************/
/******************************************************************************/

function initRankSort() {
  // create a loop for the categories ul - going to add an id attribute to them
  $("ul").sortable({update: handleRankSorting}).disableSelection();
}
// create a sortable handler for when set is called
function handleRankSorting(event, ui) {
  const arr = $(this).find("li").sortable().toArray();
  const rankObj = {new_ranks: []};
  let count = 1;
  arr.forEach((todo) => {
    rankObj.new_ranks.push({
      id: $(todo).attr("data-id"),
      rank: count++
    });
  });
  updateRanks(rankObj, errorFlasher, ()=>{console.log("new ranks saved")});
}
/******************************************************************************/
/*********************** handlers for updates *********************************/
/******************************************************************************/

  function handlerChangeCategoryEdit(event) {
    event.stopPropagation();
    const todo = {id: $(this).closest("li").attr("data-id")};
    renderSelectCategoryPage(todo);
    const checkLabel = $(this).closest("li").find(".check-the-label");
    const changeSave = $(this).closest("li").find(".change-save");
    changeSave.addClass("hide-me");
    checkLabel.removeClass("hide-me");
  }
  
  function handlerSaveEdit(event) {
    const checkLabel = $(this).closest("li").find(".check-the-label");
    const changeSave = $(this).closest("li").find(".change-save");
    const todoId = $(this).closest("li").attr("data-id");
    const title = changeSave.find("input").val();
    updateTitle(title, todoId, errorFlasher, prependerTodo);
    checkLabel.find("label").text(title);
    changeSave.addClass("hide-me");
    checkLabel.removeClass("hide-me");
  }
  
  function handlerEdit(event) {
    const checkLabel = $(this).closest("li").find(".check-the-label");
    const changeSave = $(this).closest("li").find(".change-save");
    changeSave.find("input").val(checkLabel.find("label").text());
    checkLabel.addClass("hide-me");
    changeSave.removeClass("hide-me");

  }

  function handlerDelete(event) {
    const todo = $(this).closest("li");
    const todoId = todo.attr("data-id");
    const title = todo.find("label").text();
    areYouSure(title,todoId, todo);
  }

  function areYouSure(title, todoId, todo) {
    const deleterFlash = $(".deleter-flash");
    deleterFlash.find("p").text(title);
    deleterFlash.addClass("deleter-active");
    deleterFlash.on("click", ".nobutton", () => {deleterFlash.removeClass("deleter-active")});
    deleterFlash.on("click", ".yesbutton", function(){
      deleteTodo(todoId, errorFlash, () => {
        deleterFlash.removeClass("deleter-active");
        todo.remove();
        countTodos();
      });
    });
  }

  function handlerChecked(event) {
    // Get todo id
    const todoId = $(this).closest("li").attr("data-id");
    if($(this).is(":checked")) {
      // update the todo to be checked
      updateCompleted(true, todoId, errorFlasher, rerenderTodo);
    }else {
      // update the todo to be not checked
      updateCompleted(false, todoId, errorFlasher, rerenderTodo);
    }
  }

  function handlerInsertTodo() {
    if(validateForm(whatTodoBox)) {
      const title = whatTodoBox.val();
      insertTodo(title, errorFlasher, addedTodo);
    }
    else{
      console.log("Validation failed");
    }
  }


/******************************************************************************/
/*********************** Our helper functions *********************************/
/******************************************************************************/

  // On update rerender the todo
  function rerenderTodo(todo) {
    // use jQuery remove before populating again - making a get /todos/:todoId
    const todoItem = categoryObj[todo.category_id].find(`li[data-id="${todo.id}"]`);
    if(todoItem) {
      todoItem.remove();
    }

    categoryObj[todo.category_id].find("ul").append(todoMaker(todo));
    // TODO: This might cause problems
    catSection.find("ul").slideDown();
    countTodos();
  }
  
  function prependerTodo(todo) {
    // use jQuery remove before populating again - making a get /todos/:todoId
    const todoItem = categoryObj[todo.category_id].find(`li[data-id="${todo.id}"]`);
    if(todoItem) {
      todoItem.remove();
    }

    categoryObj[todo.category_id].find("ul").prepend(todoMaker(todo));
    // TODO: This might cause problems
    catSection.find("ul").slideDown();
    countTodos();
  }

  // Display a flash error
  function errorFlasher(err) {
    errorFlash.text(err.error);
  }

  // add jQuery objects of each of the categories for future use to categoryObj
  function populateCategoryObj(categories) {
    categories.forEach((category) => {
      categoryObj[category.id] = $(`.categories section[data-id="${category.id}"]`);
    }); 
  }

  // count the todo elements in each category and change the number at top right to the count
  function countTodos() {
    const catNumber = $(".cat-number");
    catNumber.each(function(){
      let count = $(this).closest("section").find(".todo-wrapper").children().length || 0;
      $(this).text(count);
    });
  }

  function addedTodo(todo) {
    // if todo.conflict is true render the select category page
    if(todo.conflict) {
      renderSelectCategoryPage(todo);
    }else {
      whatTodoBox.val('');
      // change the categories number of todos
      const categoryUl = categoryObj[todo.category_id].find("ul");
      categoryUl.prepend(todoMaker(todo));
    }
    countTodos();
  }

/******************************************************************************/
/*********************** Form submitting todo *********************************/
/******************************************************************************/

  function validateForm(text) {
    const parsed = $.trim(text.val());
    if (parsed.length === 0) {
      // TODO: Change to a pretty flash message
      alert ("Can not sumbit an empty item");
      return false;
    }else if (parsed.length < 3) {
      alert ("Try a little harder at making a todo");
      return false;
    }
    else if (parsed.length > 127 ) {
      // TODO: Change to a pretty flash message
      alert ("Exceeded character limit of 127");
      return false;
    }
    else {
      return true;
    }
  }

/******************************************************************************/
/*********************** Render the dif pages *********************************/
/******************************************************************************/
// catSection is defined up the top
  // This will render the categories as buttons 
  // and the main form as disabled
  function renderSelectCategoryPage(todo) {
    // TODO: This might cause problems
    catSection.find("ul").slideUp();
    catSection.off();
    catSection.on("click", function(event) {
      catSection.off();
      const catId = $(this).find("section[data-id]").attr("data-id");
      updateCategory(catId, todo.id, errorFlasher, rerenderTodo);
      catSection.on("click", renderAllCategories);
      whatTodoBox.val('');
    });
  }

  // This will render a category in focus
  function renderCategoryFocusPage(event) {
    const that = $(this);
    // remove all of the elements with class x
    catSection.each((key, val) => {
      // TODO: take the class and remove it
      // val.removeClass();
    });
    // TODO: add the class here
    // that.addClass();
    $(document).on("click", (event) => {
      if(!$(event.target).closest("cat-column").length) {
        // TODO: need to remove the class
        // that.removeClass();
      }
    });
  }

  // TODO: on form focus the render all categories must be called

  // main category page renderer
  function renderAllCategories(event) {
    // TODO: may cause problems
    $(document).off("click");
    catSection.off();
    getAllTodosAndCategories((err) => {
      errorFlash.text(err.error);
    }, (data) => {
        // TODO: this may cause a flicker
        catSection.find("ul").empty();
        todoLooper(data.todos);
    });
    catSection.on("click", renderCategoryFocusPage);
  }

/******************************************************************************/
/*********************** When ready call this *********************************/
/******************************************************************************/

  // make a function that gets todos and categories and is the controller for the start
  function startController(){
    getAllTodosAndCategories(errorFlasher, (data) => {
        categoryLooper(data.categories);
        populateCategoryObj(data.categories);
        catSection = categories.find(".cat-column");
        renderAllCategories();
        setEventHandlers();
        // TODO: remove class on #what-todo-box
    });
  }
  globalRender = startController;
});