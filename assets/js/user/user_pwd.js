$(function() {
    var form = layui.form
  
    form.verify({
      pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
      samePwd: function(value) {
        if (value === $('[name=oldPwd]').val()) {
          return '新旧密码不能相同！'
        }
      },
      rePwd: function(value) {
        if (value !== $('[name=newPwd]').val()) {
          return '两次密码不一致！'
        }
      }
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'http://www.liulongbin.top:3007/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新用户信息失败!')
                }
                layer.msg('更新用户信息成功!')
                //调用父元素的方法重新渲染用户昵称
                window.parent.getUserInfo();
            }
        })
    })
  })

  