$(function() {
    // 表单验证
    layui.use('form', function() {
        var form = layui.form;
        form.verify({
            nickname: [
                /^[\S]{1,6}$/,
                '用户昵称最长不超过6位'
            ]
        })
    });

    // 调用初始化用户信息
    initUserInfo()

    // 重置表单
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo()
    })

    // 修改用户信息
    $('#form_user').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("修改用户信息失败！")
                } else {
                    layer.msg("修改用户信息成功！")
                    initUserInfo()
                    window.parent.getUserInfo()

                }
            }
        })
    })
})

// 引用layer
var layer = layui.layer
var form = layui.form
    // 定义初始化用户信息函数
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            } else {
                form.val('formUserInfo', res.data)
            }
        }
    })
}