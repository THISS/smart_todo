$(function(){
function addCard(e) {
    var el = e;
    var category = el.parentElement.parentElement.parentElement.parentElement.id;
    var items = el.parentElement.parentElement;
    var count = el.parentElement.parentElement.parentElement.querySelector('.head').querySelector('.count');
    var lastId = items.firstChild.id;
    var id = items.children.length;
    $(count).text(id);
    var tmpl = '<div class="box" id="'+category+'c'+id+'">' +
    '<p class="title">'+ faker.lorem.sentence() +'</p>' +
    '<p class="meta">' +
    '</p>' +
    '</div>';
    $(items).prepend(tmpl);
}

$('#what-todo-box').on('click', function() {
  $('.what-todo-box-bg').addClass('active')
})

$('.todo-close').on('click', function() {
  $('.what-todo-box-bg').removeClass('active')
})

$('.todo-add').on('click', function() {
  $('.what-todo-box-bg').removeClass('active')
})

$('.mic').click(function() {
   $(this).toggleClass("mic-clicked")
  });

});

