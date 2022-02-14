$(function() {
    // 点击去注册
    $('#link-reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    });
    // 点击去登录
    $('#link-login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    });
    // 表单验证
    var form = layui.form
    form.verify({
            'pwd': [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            'repwd': function(value) {
                var pwd = $('.reg-box [name="password"]').val()
                if (pwd != value) {
                    return "两次输入的密码不一致！"
                }
            }

        }

    );
    // 监听注册表单的提交事件
    var layer = layui.layer
    $('#form-reg').on('submit', function(e) {
        e.preventDefault()
        var data = { username: $('#form-reg [name="username"]').val(), password: $('#form-reg [ name="password"]').val() }
        $.post('/api/reguser', data, function(res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            } else {
                layer.msg('注册成功，请登录！', { time: 2000 }, function() {
                    $('#link-login').click()
                })

            }

        })
    });

    // 监听登录表单的提交事件
    $('#form-login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                } else {
                    layer.msg('登录成功')
                    localStorage.setItem('token', res.token)
                    location.href = './index.html'
                }
            }
        })

    })




})