$(function(){
  function buildHTML(message){
    var add_image ="";
    if(message.image){
      add_image = `<p class="lower-meesage__image"><img src="${message.image}"></p>`;
    }
    var html =
    `<div class="message" data-message-id="${message.id}" data-group-id="${message.group_id}">
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user_name}
        </div>
        <div class="upper-message__date">
        ${message.created_at}
        </div>
      </div>
      <div class="lower-message">
        <p class="lower-message__content">${message.content}</p>
        ${add_image}
      </div>
    </div>`;
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this); //フォームに入力した値を取得しています。
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html).animate({scrollTop: $('.messages')[0].scrollHeight }, 500, 'swing');
      $('#new_message')[0].reset(); //resetはidを選択している。form自体を選択しているので、hiddenなど指定する必要はない。idの場合は＃をつけてclassの場合は.をつける
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false); //ここで解除している
    })
    .fail(function(){
      alert("送信したテキストを表示できません。リロードしてください");
    })
    return false;
  });


  var reloadMessages = setInterval(function() {
    if(window.location.pathname.match(/\groups\/\d+\/messages/)) {
    last_message_id = $('.message').last().data('message-id');
    group_id = $('.message').last().data('group-id');
    $.ajax({
      url: '/groups/'+ group_id +'/api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id , group_id: group_id}
    })
    .done(function(messages) {
      messages.forEach(function(message){
        var insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
        $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, 'fast');
        });
    })
    .fail(function() {
      alert("リロードしてください");
    });
  
  
  } else {
    clearInterval(interval);
  }
  },5000);
});