$(function(){

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
});

function loadtodos(){
  $.ajax({
    method: 'GET',
    url: '/',
    success: (data) => rendertodo(data)
  });
};

$('#what-todo-box').on('submit', function (event) {
    event.preventDefault();
    var text = $('##what-todo-box text');

    if(validateForm(text)) {
      $.ajax({
        method: 'POST',
        url:'/',
        data: text.serialize(),
        success: function(){
  
          loadtweets();
          text.val('');
        }
      });
    }
});

function validateForm(text) {
  if ($.trim(text.val()).length === 0) {
    alert ("Can not sumbit an empty item");
    return false;
  }
  else if (text.val().length > 255 ) {
    alert ("Exceeded character limit of 255");
    return false;
  }
  else {
    return true;
  }
}




});