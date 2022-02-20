$(function() {
    // 添加验证规则
    var form = layui.form
    form.verify({
        same: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return "新密码和旧密码一致！"
            }
        },
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return "两次输入密码不一致，请重新输入。"
            }
        }

    })

    // 重置密码
    var layer = layui.layer
    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("重置密码失败！")
                } else {
                    layer.msg("重置密码成功！")
                    $('.layui-form')[0].reset()
                }
            }

        })
    })

})