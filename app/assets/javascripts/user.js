$(function() {
  var search_list = $("#user-search-result");
  const chat_user =  $('#chat-group-users');

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${ user.name }</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
      </div>`
    search_list.append(html);
   }

    /* STEP2:チャットメンバーに追加 HTML作成 */
  function addChatUser(add_user) {
    var html = `
      <div class='chat-group-user clearfix js-chat-member' id='${add_user.userId}'>
        <input name='group[user_ids][]' type='hidden' value='${add_user.userId}'>
        <p class='chat-group-user__name'>${ add_user.userName }</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${add_user.userId}" data-user-name="${add_user.userName}">削除</a>
      </div>`;
    $("#chat-group-users").append(html);
   }

    /* STEP3:チャットメンバーから削除 HTML作成 */
    function removeUser(user) {
      var html = `
        <div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${ user.userName }</p>
          <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.userId}" data-user-name="${user.userName}">追加</a>
        </div>`;
      search_list.append(html);
     }

  
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { name: input},
      dataType: 'json'
    })
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        $("#user-search-result").append(`<div class="chat-group-user clearfix">
そのユーザーはいません</div>`);
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
    return false;
  });

    //追加ボタンを押した時の動作
  $("#user-search-result").on("click",
  ".chat-group-user__btn--add" ,function(){
      event.stopPropagation();
      var add_user = $(this).data();
      var count = $(".chat-group-user__btn--remove").data();
      if (add_user.userId !== count.userId){
        addChatUser(add_user);
        $(this).parent().remove();
      }else{
        alert(add_user.userName + " は登録済みのユーザーです");
      }
  });
    //削除ボタンを押した時の動作
  $("#chat-group-users").on("click", ".js-remove-btn", function(){
    event.stopPropagation();
    var remove_user = $(this).data();
    removeUser(remove_user);
    $(this).parent().remove();
  });
  return false;
});