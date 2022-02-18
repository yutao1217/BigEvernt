$(function() {
    // 调用调取用户信息函数
    getUserInfo()

    // 给退出系统添加点击事件
    $('#logout').on('click', function() {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1.退出时清空token
            localStorage.removeItem('token');
            // 2.跳转到登录页
            location.href = 'login.html';
            layer.close(index);
        });
    })


})
var layer = layui.layer

//定义调取用户信息的函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg("获取用户失败！")
            }
            // 渲染头像信息
            renderAvanter(res.data)
        }
    })
}

// 定义渲染头像信息
function renderAvanter(user) {
    var name = user.nickname || user.username
    var first = name[0].toUpperCase()
    $('#user_welcome').html('&nbsp欢迎&nbsp' + name)
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.user_icon').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.user_icon').html(first).show()
    }

}