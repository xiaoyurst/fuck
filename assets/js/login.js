$(function(){
    //登录点击
    $('#dl').on('click', function(){
        $('.login').hide();
        $('.reg').show();
    })
    //注册点击
    $('#zc').on('click', function(){
        $('.login').show();
        $('.reg').hide();
    })
    //正则表达式
    var layer = layui.layer;
    var form  =layui.form;
    form.verify({
        //两次输入是否一致
        test:function(value){
            const pwd = $('#que').val();
            if(value !==pwd){
                return '两次密码输入的不一致，请从新输入';
            }
        },
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
          if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
            return '用户名不能有特殊字符';
          }
          if(/(^\_)|(\__)|(\_+$)/.test(value)){
            return '用户名首尾不能出现下划线\'_\'';
          }
          if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
          }
          
          //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
          if(value === 'xxx'){
            alert('用户名不能为敏感词');
            return true;
          }
        }
        
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] 
      });
      //监听注册表单的提交事件
      $('#form-reg').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault();
        // 2. 发起Ajax的POST请求
        const data = {
          username: $('#form-reg [name=username]').val(),
          password: $('#form-reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
          if (res.status !== 0) {
            return layer.msg(res.message)
          }
       layer.msg('注册成功，请登录！')
          // 模拟人的点击行为
          $('#zc').click()
        })
      });
      //登录事件
      $('#denglu').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                 if(res.status !== 0){
                    return layer.msg('登录失败'); 
                    
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token)
               //跳转到后台主页
               location.href = '/index.html';
            }
        })
      });

})