require(['./js/main.js'],function(){
    require(['jquery','flex'],function($){
          $.ajax({
              url:'/api/list',
              dataType:'json',
              success:function(res){
                  if(res.code===1){
                      render(res.msg)
                  }
              }
          })
          function render(data){
              var str='';
              data.map(function(file){
                  str+=` <div class="con">
                  <h2>${file.title}</h2>
                  <img src="${file.img}" alt="">
                  <span>${file.price}</span>
              </div>`
              })
            $('.list').html(str);
          }
    })
})