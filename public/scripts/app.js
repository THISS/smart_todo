$(function(){

  function renderWhatTodos(data) {
      for(i=0; i < data.length; i++){
        // TODO: handlebars js - 
        $('#todos').append(todo.title[i]);
      }
  }

  function loadWhatTodos(){
    $.ajax({
      method: 'GET',
      url: '/todos',
      success: (data) => renderWhatTodos(data)
    });
  }

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

  // TODO: Make a category flash function that we can call with a category on success of a todo submission
  // If a category is not found then we need to go to pick category page / state

  $('#what-todo-box').on('submit', function (event) {
      event.preventDefault();
      var text = $('#what-todo-box').val();

      if(validateForm(text)) {
        $.ajax({
          method: 'POST',
          url:'/todos',
          data: text.serialize(),
          success: function(){
            loadWhatTodos();
            text.val('');
          }
        });
      }
  });




});