$(function(){
    var layer = layui.layer;
    var $image = $('#image');
     // 1.2 配置选项
     const options = {
       // 纵横比
       aspectRatio: 1,
       // 指定预览区域
       preview: '.img-preview'
     };
     // 1.3 创建裁剪区域
     $image.cropper(options);
$('#btn').on('click',function(){
    $('#file').click();
})
$('#file').on('change',function(e){
    var filelist = e.target.files;
    if(filelist.length === 0){
        return layer.msg('请选择照片')
    }
    //拿到用户选中的图片
    var file =e.target.files[0];
    //将文件转换成路径
    var imgURL = URL.createObjectURL(file);
    //重新初始化裁剪区域
    $image
    .cropper('destroy')//销毁原来的
    .attr('src',imgURL)//重新设置路径
    .cropper(options)//重新初始化裁剪区域

})
//确定按钮点击事件
$('#changebtn').on('click',function(){
    //拿到用户裁剪后的图片
    var dataURL = $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')
      $.ajax({
        method:'POST',
        url:'/my/update/avatar',
        data:{
            avatar:dataURL 
        },
        success:function(res){
            if(res.status !==0){
                return layer.msg('修改头像失败')
            }
            layer.msg('修改头像成功')
            //调用父元素的方法重新渲染头像
            window.parent.getUserInfo();
        }
      })
})
})