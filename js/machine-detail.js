$(function() {
  // 取数据详情值
  if (sessionStorage.getItem('machineDetailData')) {
    var machineData = JSON.parse(sessionStorage.getItem('machineDetailData'))
    console.log(machineData)
    // 将数据显示到页面上
    var deviceNo = machineData.data.DEVICE_NO
    // 序列号
    $('.code').html(machineData.data.DEVICE_NO)
    // 信号强度
    $('#signal-number').text(machineData.signal)
    // 故障状态
    $('.faultStataus-box .status-val').text(machineData.data.ERROR_MESSAGE == '' ? '无' : machineData.data.ERROR_MESSAGE)
    // ICCID
    $('.iccid-box .status-val').text(machineData.ICCID)
    // 开关机状态
    $('.openStatus-box .status-val').text(machineData.data.DS_POWER == "0" ? "开机" : "关机")
    // 机器时间
    $('.machineTime-box .status-val').text(machineData.datetime)
    // 入水TDS
    $('.inWater .status-val').text(machineData.data.RAW_TDS)
    // 出水tds
    $('.outWater .status-val').text(machineData.data.PURE_TDS)
    // 原水温度
    $('.rawWater-temp .status-val').text(machineData.data.RAW_WATER_TEMPERATURE)
    // 冷水温度 coldWater-temp
    $('.coldWater-temp .status-val').text(machineData.data.COLD_WATER_TEMPERATURE)
    // 热水温度
    $('.hotWater-temp .status-val').text(machineData.data.HOT_WATER_TEMPERATURE)
    // 累计用水量
    $('.useWater-consumption .status-val').text(machineData.wireMachine.waterQuantitySum + 'L')
    // 滤芯
    let htmlStr = ''
    if (machineData.wireFilters[11] != '-1') {
      htmlStr += `
			<p class="first-grade">
        <span class="grade-name">${machineData.wireFilters[1]}</span>
        <span class="grade-number">${machineData.data.FILTER_LEVEL1}%</span>
        <span class="grade-control">滤芯复位</span>
      </p>
			`
    }
    if (machineData.wireFilters[12] != '-1') {
      htmlStr += `
			<p class="second-grade">
        <span class="grade-name">${machineData.wireFilters[2]}</span>
        <span class="grade-number">${machineData.data.FILTER_LEVEL2}%</span>
        <span class="grade-control">滤芯复位</span>
      </p>
			`
    }
    if (machineData.wireFilters[13] != '-1') {
      htmlStr += `
			<p class="third-grade">
        <span class="grade-name">${machineData.wireFilters[3]}</span>
        <span class="grade-number">${machineData.data.FILTER_LEVEL3}%</span>
        <span class="grade-control">滤芯复位</span>
      </p>
			`
    }
    if (machineData.wireFilters[14] != '-1') {
      htmlStr += `
			<p class="four-grade">
        <span class="grade-name">${machineData.wireFilters[4]}</span>
        <span class="grade-number">${machineData.data.FILTER_LEVEL4}%</span>
        <span class="grade-control">滤芯复位</span>
      </p>
			`
    }
    if (machineData.wireFilters[15] != '-1') {
      htmlStr += `
			<p class="five-grade">
        <span class="grade-name">${machineData.wireFilters[5]}</span>
        <span class="grade-number">${machineData.data.FILTER_LEVEL5}%</span>
        <span class="grade-control">滤芯复位</span>
      </p>
			`
    }
    $('#filter-list').html(htmlStr)
  }

  // 点击返回按钮
  $('.icon-box').click(function() {
    history.go(-1)
  })

  // 页面中的一些指令
  // 开机指令
  $('body').on('click', '.startUp', function() {
    // 获取数据
    let instructionData = {
      dispenserNo:deviceNo,  // 序列号
      mission:'on'
    }
    // 发送ajax请求
    ajaHttpRequest(controlInstructions,true,instructionData,function (res) {
      console.log(res)
      if (res) {
        $.toast("执行完成", "text")
      } else {
        $.toast("执行错误,请稍后重试", "text")
      }
    })
  })

  // 加热指令
  $('body').on('click', '.heating', function() {
    // 获取数据
    let instructionData = {
      dispenserNo:deviceNo,  // 序列号
      mission:'hot'
    }
    // 发送ajax请求
    ajaHttpRequest(controlInstructions,true,instructionData,function (res) {
      console.log(res)
      if (res) {
        $.toast("执行完成", "text")
      } else {
        $.toast("执行错误,请稍后重试", "text")
      }
    })
  })

  // 关机指令
  $('body').on('click', '.shutDown', function() {
    // 获取数据
    let instructionData = {
      dispenserNo:deviceNo,  // 序列号
      mission:'off'
    }
    // 发送ajax请求
    ajaHttpRequest(controlInstructions,true,instructionData,function (res) {
      console.log(res)
      if (res) {
        $.toast("执行完成", "text")
      } else {
        $.toast("执行错误,请稍后重试", "text")
      }
    })
  })

  // 冲洗关闭指令
  $('body').on('click', '.offWash', function() {
    // 获取数据
    let instructionData = {
      dispenserNo:deviceNo,  // 序列号
      mission:'washstop'
    }
    // 发送ajax请求
    ajaHttpRequest(controlInstructions,true,instructionData,function (res) {
      console.log(res)
      if (res) {
        $.toast("执行完成", "text")
      } else {
        $.toast("执行错误,请稍后重试", "text")
      }
    })
  })

  // 冲洗指令
  $('body').on('click', '.wash', function() {
    // 获取数据
    let instructionData = {
      dispenserNo:deviceNo,  // 序列号
      mission:'wash'
    }
    // 发送ajax请求
    ajaHttpRequest(controlInstructions,true,instructionData,function (res) {
      console.log(res)
      if (res) {
        $.toast("执行完成", "text")
      } else {
        $.toast("执行错误,请稍后重试", "text")
      }
    })
  })

  // 加热关闭指令
  $('body').on('click', '.offHeating', function() {
    // 获取数据
    let instructionData = {
      dispenserNo:deviceNo,  // 序列号
      mission:'hotstop'
    }
    // 发送ajax请求
    ajaHttpRequest(controlInstructions,true,instructionData,function (res) {
      console.log(res)
      if (res) {
        $.toast("执行完成", "text")
      } else {
        $.toast("执行错误,请稍后重试", "text")
      }
    })
  })

  // 滤芯复位事件
  // 一级滤芯复位
  $('body').on('click', '.first-grade .grade-control', function() {
    let resetFilterData = {
      dispenserNo:deviceNo,
      level:1,
      num:100
    }
    ajaHttpRequest(resetFilter,true,resetFilterData,function(res) {
      if (res) {
        $.toast("重置完成", "text")
        resetData ()
      }
    })
  })
  // 二级滤芯复位
  $('body').on('click', '.second-grade .grade-control', function() {
    let resetFilterData = {
      dispenserNo:deviceNo,
      level:2,
      num:100
    }
    ajaHttpRequest(resetFilter,true,resetFilterData,function(res) {
      if (res) {
        $.toast("重置完成", "text")
        resetData ()
      }
    })
  })

  // 三级滤芯复位
  $('body').on('click', '.third-grade .grade-control', function() {
    let resetFilterData = {
      dispenserNo:deviceNo,
      level:3,
      num:100
    }
    ajaHttpRequest(resetFilter,true,resetFilterData,function(res) {
      if (res) {
        $.toast("重置完成", "text")
        resetData ()
      }
    })
  })
  // 四级滤芯复位
  $('body').on('click', '.four-grade .grade-control', function() {
    let resetFilterData = {
      dispenserNo:deviceNo,
      level:4,
      num:100
    }
    ajaHttpRequest(resetFilter,true,resetFilterData,function(res) {
      if (res) {
        $.toast("重置完成", "text")
        resetData ()
      }
    })
  })
  // 五级滤芯复位
  $('body').on('click', '.five-grade .grade-control', function() {
    let resetFilterData = {
      dispenserNo:deviceNo,
      level:5,
      num:100
    }
    ajaHttpRequest(resetFilter,true,resetFilterData,function(res) {
      if (res) {
        $.toast("重置完成", "text")
        resetData ()
      }
    })
  })

  // 点击通过测试按钮
  $('.submit').click(function() {
    // 提示内容
    $.confirm("您确定通过测试吗?", "网器测试", function() { //确定通过测试的回调函数
      ajaxHttpJsonRequest(testOver, true, { serialCode: machineData.data.DEVICE_NO }, function(res) {
        console.log(res)
        if (res.success) {
          $.toast("提交测试成功")
          setTimeout(function() {
            window.location.href = './machine-list.html'
          }, 1000)
        }
      }, function(res) {
        console.log(res)
      })
      // $.toast("提交测试成功")
      // setTimeout(function () {
      // 	window.location.href='./machine-list.html'
      // }, 1000)
    }, function() {
      return false;
    })
  })
  // 重新查询数据并显示方法
  function resetData () {
    ajaxHttpJsonRequest(checkmachineDetail, false, { serialCode: deviceNo }, function(res) {
    let machineData = res
    console.log(machineData)
    // 将数据显示到页面上
    let deviceNo = machineData.data.DEVICE_NO
    // 序列号
    $('.code').html(deviceNo)
    // 信号强度
    $('#signal-number').text(machineData.signal)
    // 故障状态
    $('.faultStataus-box .status-val').text(machineData.data.ERROR_MESSAGE == '' ? '无' : machineData.data.ERROR_MESSAGE)
    // ICCID
    $('.iccid-box .status-val').text(machineData.ICCID)
    // 开关机状态
    $('.openStatus-box .status-val').text(machineData.data.DS_POWER == "0" ? "开机" : "关机")
    // 机器时间
    $('.machineTime-box .status-val').text(machineData.datetime)
    // 入水TDS
    $('.inWater .status-val').text(machineData.data.RAW_TDS)
    // 出水tds
    $('.outWater .status-val').text(machineData.data.PURE_TDS)
    // 原水温度
    $('.rawWater-temp .status-val').text(machineData.data.RAW_WATER_TEMPERATURE)
    // 冷水温度 coldWater-temp
    $('.coldWater-temp .status-val').text(machineData.data.COLD_WATER_TEMPERATURE)
    // 热水温度
    $('.hotWater-temp .status-val').text(machineData.data.HOT_WATER_TEMPERATURE)
    // 累计用水量
    $('.useWater-consumption .status-val').text(machineData.wireMachine.waterQuantitySum + 'L')
    // 滤芯
    let htmlStr = ''
    if (machineData.wireFilters[11] != '-1') {
      htmlStr += `
      <p class="first-grade">
        <span class="grade-name">${machineData.wireFilters[1]}</span>
        <span class="grade-number">${machineData.data.FILTER_LEVEL1}%</span>
        <span class="grade-control">滤芯复位</span>
      </p>
      `
    }
    if (machineData.wireFilters[12] != '-1') {
      htmlStr += `
      <p class="second-grade">
        <span class="grade-name">${machineData.wireFilters[2]}</span>
        <span class="grade-number">${machineData.data.FILTER_LEVEL2}%</span>
        <span class="grade-control">滤芯复位</span>
      </p>
      `
    }
    if (machineData.wireFilters[13] != '-1') {
      htmlStr += `
      <p class="third-grade">
        <span class="grade-name">${machineData.wireFilters[3]}</span>
        <span class="grade-number">${machineData.data.FILTER_LEVEL3}%</span>
        <span class="grade-control">滤芯复位</span>
      </p>
      `
    }
    if (machineData.wireFilters[14] != '-1') {
      htmlStr += `
      <p class="four-grade">
        <span class="grade-name">${machineData.wireFilters[4]}</span>
        <span class="grade-number">${machineData.data.FILTER_LEVEL4}%</span>
        <span class="grade-control">滤芯复位</span>
      </p>
      `
    }
    if (machineData.wireFilters[15] != '-1') {
      htmlStr += `
      <p class="five-grade">
        <span class="grade-name">${machineData.wireFilters[5]}</span>
        <span class="grade-number">${machineData.data.FILTER_LEVEL5}%</span>
        <span class="grade-control">滤芯复位</span>
      </p>
      `
    }
    $('#filter-list').html(htmlStr)
    })
  }
})