$(function() {
  // 提示窗显示时间
  $.toast.prototype.defaults.duration = 2000
  // 定义接收扫码返回值得字段
  var codeData = null
  // 定义序列号正则表达式
  var serialPattern = /^\d{10}$/
  // 定义机编的正则表达式
  var machinePattern = /^[A-Z0-9]{20}$/
  // 定义查询序列号状态值 默认为0 -1为不存在 1为已测试 2为已经出库
  sessionStorage.setItem('seriesStatus',0)
  // 定义查询机编的状态是 默认为0 -1为不存在 1为已经测试 2为已经出库
  sessionStorage.setItem('machCodeStatus',0)
  // 获取到扫码的置
  if (location.href.indexOf("qrresult=") > -1) {
    // alert(location.href.split("qrresult=")[1])
    //在您的程序中可对此数据进行处理
    codeData = location.href.split("qrresult=")[1]
    // 根据flag进行判断 1 为机编 2为序列号 对数据进行缓存
    if(sessionStorage.getItem("flag") == 2) {
      sessionStorage.setItem("codeData2", codeData)
    }
    if (sessionStorage.getItem("flag") == 1) {
      if (codeData.split('%2C')[1]) {
        sessionStorage.setItem("codeData1", codeData.split('%2C')[1])
      } else {
        sessionStorage.setItem("codeData1", codeData)
      }
      
    }
  }

  //若序列号存在 将序列号填写到序列号输入框
  if (sessionStorage.getItem('codeData2')) {
    $('.serial-number input').val(sessionStorage.getItem('codeData2'))
    if (serialPattern.test(sessionStorage.getItem('codeData2'))) {
      $('.serial-number .error-icon').hide()
      $('.serial-number .success-icon').show()
    } else {
      $('.serial-number .success-icon').hide()
      $('.serial-number .error-icon').show()
    }
  }
  // 若机编存在 将机编填写到机编输入框
  if (sessionStorage.getItem('codeData1')) {
    $('.machine-code input').val(sessionStorage.getItem('codeData1'))
    if (machinePattern.test(sessionStorage.getItem('codeData1'))) {
      $('.machine-code .error-icon').hide()
      $('.machine-code .success-icon').show()
    } else {
      $('.machine-code .success-icon').hide()
      $('.machine-code .error-icon').show()
    }
  }

  // 点击扫描序列号
  $('.add-serNum').click(function() {
    sessionStorage.setItem("flag", 2)
  })
  // 点击机编添加图标调用扫一扫
  $('.add-machCode').click(function() {
    sessionStorage.setItem("flag", 1)
  })

  // 用户自己输入时触发
    // 序列号手动输入 监听序列号的值
  $('.serial-number input').change(function() {
    sessionStorage.setItem("codeData2", $(this).val())
    if (!$.trim($(this).val())) {
      $('.serial-number .error-icon').hide()
      $('.serial-number .success-icon').hide()
      return false
    }
    // 验证序列号
    if (serialPattern.test($(this).val())) {
      $('.serial-number .error-icon').hide()
      $('.serial-number .success-icon').show()
      return false
    } else {
      $('.serial-number .error-icon').show()
      $('.serial-number .success-icon').hide()
    }
  })
  // 机编改变时
  $('.machine-code input').change(function() {
    sessionStorage.setItem("codeData1", $(this).val())
    if (!$.trim($(this).val())) {
      $('.machine-code .error-icon').hide()
      $('.machine-code .success-icon').hide()
      return false
    }
    if (machinePattern.test($(this).val())) {
      $('.machine-code .error-icon').hide()
      $('.machine-code .success-icon').show()
    } else {
      $('.machine-code .success-icon').hide()
      $('.machine-code .error-icon').show()
    }
  })
  // 点击返回按钮操作
  $('body').on('touchstart', '.goback-icon', function() {
    sessionStorage.removeItem("codeData1")
    sessionStorage.removeItem("codeData2")
    window.location.href = "./machine-list.html?t=" + Math.random()
  })
  // 监听返回操作
  window.history.pushState('列表', "./machine-list.html")
  $(window).on('popstate', function() {
    // 清空机编和序列号缓存
    sessionStorage.removeItem("codeData1")
    sessionStorage.removeItem("codeData2")
    window.location.href = './machine-list.html'
  })

  // 点击确定提交按钮
  $('body').on('touchstart','.weui-btn',function () {
    // 获取到序列号和机编
    let sendSerNum = $('.serial-number input').val()
    let sendmachCode = $('.machine-code input').val()
    // 对序列号和机编进行验证
    if ($.trim(sendSerNum)) {
      if (!serialPattern.test(sendSerNum)) {
        $.toast("序列号格式不正确","text")
        return false
      }
    }
    if ($.trim(sendmachCode)) {
      if(!machinePattern.test(sendmachCode)) {
        $.toast("机编格式不正确","text")
        return false
      }
    }
    getSerstatus()    // 判断状态的函数
    // 判断sessionStorage.getItem('seriesStatus')和sessionStorage.getItem('machCodeStatus')的值
    // 两个都未输入
    if (sessionStorage.getItem('seriesStatus') == 0 && sessionStorage.getItem('machCodeStatus')==0 ) {
      $.toast("提交失败,请输入序列号或机编后再提交","text")
      return false
    }
    // 序列号未测试 未输入机编
    if (sessionStorage.getItem('seriesStatus') == -1 && sessionStorage.getItem('machCodeStatus')==0) {  // 未进行测试
      ajaxHttpJsonRequest(testOver,false,{serialCode:sendSerNum},function (res) {
        if(res.success) {
          $.toast("提交测试成功")
          sessionStorage.setItem("clickStatus",2)
          sessionStorage.removeItem("codeData1")
          sessionStorage.removeItem("codeData2") 
          setTimeout(function () {
            window.location.href = "./machine-list.html?t=" + Math.random()
          },2000)
          
        }
      })
    }
    // 序列号已经测试 未输入机编
    if (sessionStorage.getItem('seriesStatus') == 1 && sessionStorage.getItem('machCodeStatus')==0) {  // 已经测试 未出库
      $.toast("当前序列号已经提交,请输入机编后进行提交")
      return false
    }
    // 未输入序列号 机编未提交
    if (sessionStorage.getItem('seriesStatus') == 0 && sessionStorage.getItem('machCodeStatus')==-1) {
      ajaxHttpJsonRequest(testOver,false,{machineCode:sendmachCode},function (res) {
        if(res.success) {
          $.toast("提交测试成功")
          sessionStorage.setItem("clickStatus",2)
          sessionStorage.removeItem("codeData1")
          sessionStorage.removeItem("codeData2") 
          setTimeout(function () {
            window.location.href = "./machine-list.html?t=" + Math.random()
          },2000)
        }
      })
    }
    // 都未进行提交过
    if (sessionStorage.getItem('seriesStatus') == -1 && sessionStorage.getItem('machCodeStatus')==-1) {
        ajaxHttpJsonRequest(outStore,true,{serialCode:sendSerNum,machineCode:sendmachCode},function (res) {
          if (res.success) {
            $.toast("出库成功")
            sessionStorage.setItem("clickStatus",1)
            sessionStorage.removeItem("codeData1")
            sessionStorage.removeItem("codeData2")
            setTimeout(function () {
              window.location.href = "./machine-list.html?t=" + Math.random()
            },2000)
          }
          if (!res.success) {
            $.toast(res.message,"text")
            return false
          }
        })
    }
    // 序列号已经测试 机编未测试
    if (sessionStorage.getItem('seriesStatus') == 1 && sessionStorage.getItem('machCodeStatus')==-1) {
      ajaxHttpJsonRequest(outStore,true,{serialCode:sendSerNum,machineCode:sendmachCode},function (res) {
        if (res.success) {

          $.toast("出库成功")
          sessionStorage.setItem('seriesStatus',0)

          sessionStorage.setItem("clickStatus",1)
          sessionStorage.removeItem("codeData1")
          sessionStorage.removeItem("codeData2")
          setTimeout(function () {
            window.location.href = "./machine-list.html?t=" + Math.random()
          },2000)
        }
        if (!res.success) {
          $.toast(res.message,"text")
          return false
        }
      })
    }
    // 未输入序列号 机编已经提交过
    if (sessionStorage.getItem('seriesStatus') == 0 && sessionStorage.getItem('machCodeStatus')==1) {
      $.toast("当前机编已经提交,请输入序列号后进行提交")
      return false
    }
    // 序列号未测试 机编已经提交过
    if (sessionStorage.getItem('seriesStatus') == -1 && sessionStorage.getItem('machCodeStatus')==1) {
      ajaxHttpJsonRequest(outStore,true,{serialCode:sendSerNum,machineCode:sendmachCode},function (res) {
        if (res.success) {
          $.toast("出库成功")
          sessionStorage.setItem('seriesStatus',0)
          
          sessionStorage.setItem("clickStatus",1)
          sessionStorage.removeItem("codeData1")
          sessionStorage.removeItem("codeData2")
          setTimeout(function () {
            window.location.href = "./machine-list.html?t=" + Math.random()
          },2000)
        }
        if (!res.success) {
          $.toast(res.message,"text")
          return false
        }
      })
    }
    // 都是已经提交的转态
    if (sessionStorage.getItem('seriesStatus') == 1 && sessionStorage.getItem('machCodeStatus')==1) {
      $.toast("序列号和机编都已经录入，不能提交!", "text")
      return false;
    }
    // 已出库的状态
    if (sessionStorage.getItem('seriesStatus') == 2) {   // 已经出库
      $.toast("当前序列号已经出库!", "text")
      return false
    }
    if (sessionStorage.getItem('machCodeStatus')==2) {
      $.toast("当前机编已经出库!", "text")
      return false
    }

    // 清空机编和序列号缓存
    sessionStorage.removeItem("codeData1")
    sessionStorage.removeItem("codeData2")
  })

  // 定义验证序列号状态的方法
  function getSerstatus () {
    // 先获取机编和序列号
    let serNum = $('.serial-number input').val()
    let machCode = $('.machine-code input').val()
    // 验证序列号的状态
    if($.trim(serNum)) {
      ajaxHttpJsonRequest(checkIsTest, false, { serialCode: serNum }, function(res) {
        if (res.status == -1) {  // 数据库中没有 未进行测试
          sessionStorage.setItem('seriesStatus',-1)
        }
        if (res.status == 1) { // 已测试 未出库
          sessionStorage.setItem('seriesStatus',1)
        }
        if (res.status == 2) { // 已经出库
          sessionStorage.setItem('seriesStatus',2)
        }
      })
    } else {
      sessionStorage.setItem('seriesStatus',0)
    }
    // 验证机编的状态
    if ($.trim(machCode)) {
      ajaxHttpJsonRequest(checkIsTest,false, { machineCode: machCode},function (res) {
        console.log(res)
        if (res.status == -1) {  // 数据库中没有 未进行测试
          sessionStorage.setItem('machCodeStatus',-1)
        }
        if (res.status == 1) { // 已测试 未出库
          sessionStorage.setItem('machCodeStatus',1)
        }
        if (res.status == 2) { // 已经出库
          sessionStorage.setItem('machCodeStatus',2)
        }
      })
    } else {
        sessionStorage.setItem('machCodeStatus',0)
    } 
  }

})