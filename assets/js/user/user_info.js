$(function(){
    var form = layui.form;
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度必须在1到6位之间!';
            }
        }
    })
    init();
    //初始化用户信息
    function init(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status !==0){
                    return layer.msg('获取用户信息失败!')
                }
                form.val('info',res.data)
            }
        })
    }
    //表单重置按钮点击事件
    $('#btnchange').on('click',function(e){
       //阻止重置按钮点击就清空的默认行为
        e.preventDefault();
        //再次调用init把用户数据填充到页面中
        init();
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
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