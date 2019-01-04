$(function() {
  $('#login-btn').click(function() {
    // 验证用户名
    if (!$.trim($('.userName-box input').val())) {
      $.toast("请输入用户名", "text")
      return false
      // 验证密码
    } else if (!$.trim($('.password-box input').val())) {
      $.toast("请输入密码", "text")
      return false
      // 验证验证码
    } else if ($('.input-code input').val() !== code) {
      $.toast("验证码不正确", "text", function() {
        $('.input-code input').val('')
        return false
      })
      // 所有验证码都通过
    } else {
      var userCode = $.trim($('.userName-box input').val())
      var password = $.trim($('.password-box input').val())
      let sendData = {
        userCode,
        password
      }
      console.log(sendData)
      $.ajax({
        url: loginUrl,
        type: 'post',
        data: JSON.stringify(sendData),
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        // 登录成功的回调
        success(data) {
          console.log(data)
          if (data.loginF) {
            // 保存token
            localStorage.setItem("token", data.token)
            // 保存用户名
            localStorage.setItem("userName", data.userName)
            // 保存登录时间
            localStorage.setItem('loginTime',nowLocalTime())
            // 页面跳转
            location.href = './machine-list.html?t=' + Math.random()
          } else {
            $.toast("用户名或密码错误,请重新登录", "text")
            // 清空表单数据
            $('.userName-box input').val('')
            $('.password-box input').val('')
            $('.input-code input').val('')
          }
        }
      })    
    }
  })
})