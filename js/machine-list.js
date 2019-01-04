// 修改提示窗显示时间
$.toast.prototype.defaults.duration = 1000
// 先判断进入哪个tab页
if (sessionStorage.getItem('tabFlag') == 'test') {
  $('.pageTab-box').hide()
  $('title').text('网器测试')
  $('.test-btn').addClass('active').siblings().removeClass('active')
  $('.header-test').removeClass('hid')
  $('.header-list').addClass('hid')
  $('.test-box').removeClass('hid').siblings().addClass('hid')
}
$(function() {
  // 接收扫一扫信息
  if (location.href.indexOf("qrresult=") > -1) {
    // alert(location.href.split("qrresult=")[1]) 扫码返回的数据
    let codeData = location.href.split("qrresult=")[1].split('%2C')[1]
    // 将扫描返回的数据显示到页面上
    $('.search-input').val(codeData)
  }
  // 定义页面请求的信息
  var pageStatus = 0 // 当前显示的tab 

  var pageTotal = 1 //所有数据总量
  var pageTotal1 = 1 //已测试数据总量
  var pageTotal2 = 1 //已出库数据总量

  var pagesize = 3 // 每页数据容量
  var pageindex = 1 // 当前的页面

  // var isOk = true  // 定义防暴力点击选项

  // 发送ajax请求获得所有数据列表
  getData(1, '', '#tab1', '.total-count')
  getData(1, 1, '#tab2', '.out-count')
  getData(1, 2, '#tab3', '.notOut-count')

  // 点击所有设备按钮
  $('#tab1-1').click(function() {
    pageStatus = 0
    pageindex = 1
    getData(1, '', '#tab1', '.total-count')
    $('.page-next').removeClass('disabled-btn')
    $('.page-prve').addClass('disabled-btn')
    // alert(pageTotal)
    if (sessionStorage.getItem('pageTotal')<=1) {
      $('.page-next').addClass('disabled-btn')
    }
  })

  // 点击已测试按钮
  $('#tab2-2').click(function() {
    pageStatus = 1
    pageindex = 1
    getData(1, 1, '#tab2', '.out-count')
    $('.page-next').removeClass('disabled-btn')
    $('.page-prve').addClass('disabled-btn')
    if (sessionStorage.getItem('pageTotal1') <= 1) {
      $('.page-next').addClass('disabled-btn')
    }
  })

  // 点击已出库按钮 
  $('#tab3-3').click(function() {
    pageStatus = 2
    pageindex = 1
    getData(1, 2, '#tab3', '.notOut-count')
    $('.page-next').removeClass('disabled-btn')
    $('.page-prve').addClass('disabled-btn')
    if (sessionStorage.getItem('pageTotal2') <= 1) {
      $('.page-next').addClass('disabled-btn')
    }
  })

  // 点击继续录码的按钮
  $('body').on('click','.comeCode',function () {
    // alert($(this).attr('data-serialCode'))
    console.log($(this).attr('data-machineCode'))
    if($(this).attr('data-serialCode')) {
      sessionStorage.setItem('codeData2',$(this).attr('data-serialCode'))
      sessionStorage.removeItem('codeData1')
    } else {
      sessionStorage.setItem('codeData1',$(this).attr('data-machineCode'))
      sessionStorage.removeItem('codeData2')
    }
    window.location.href="./recording-code.html?t=" + Math.random()
  })

  // 点击上一页按钮
  $('.page-prve').click(function() {
    if ($(this).hasClass('disabled-btn')) { return false }
    pageindex--
    if (pageStatus == 0) {
      if (pageindex <= 1) {
        $('.page-next').removeClass('disabled-btn')
        $('.page-prve').addClass('disabled-btn')
      }
      getData(pageindex, '', '#tab1', '.total-count')
    } else if (pageStatus == 1) {
      if (pageindex <= 1) {
        $('.page-next').removeClass('disabled-btn')
        $('.page-prve').addClass('disabled-btn')
      }
      getData(pageindex, 1, '#tab2', '.out-count')
    } else if (pageStatus == 2) {
      if (pageindex <= 1) {
        $('.page-next').removeClass('disabled-btn')
        $('.page-prve').addClass('disabled-btn')
      }
      getData(pageindex, 2, '#tab3', '.notOut-count')
    }
  })

  // 点击下一页按钮
  $('.page-next').click(function() {
    if ($(this).hasClass('disabled-btn')) { return false }
    pageindex++
    if (pageStatus == 0) {
      if (pageindex >= sessionStorage.getItem('pageTotal')) {
        $('.page-next').addClass('disabled-btn')
        $('.page-prve').removeClass('disabled-btn')
      }
      getData(pageindex, '', '#tab1', '.total-count')
    } else if (pageStatus == 1) {
      if (pageindex >= sessionStorage.getItem('pageTotal1')) {
        $('.page-next').addClass('disabled-btn')
        $('.page-prve').removeClass('disabled-btn')
      }
      getData(pageindex, 1, '#tab2', '.out-count')
    } else if (pageStatus == 2) {
      if (pageindex >= sessionStorage.getItem('pageTotal2')) {
        $('.page-next').addClass('disabled-btn')
        $('.page-prve').removeClass('disabled-btn')
      }
      getData(pageindex, 2, '#tab3', '.notOut-count')
    }
  })


  // 点击用户详情
  $('.uesr-icon').click(function() {
    window.location.href = './user-detail.html?t=' + Math.random()
  })
  // 点击新增设备
  $('.add-machine').click(function() {
    window.location.href = './recording-code.html?t=' + Math.random()
  })
  // 点击网器测试按钮
  $('.test-btn').click(function(event) {
    $('.pageTab-box').hide()
    sessionStorage.setItem('tabFlag', 'test')
    $('title').text('网器测试')
    $(this).addClass('active').siblings().removeClass('active')
    $('.header-test').removeClass('hid')
    $('.header-list').addClass('hid')
    $('.test-box').removeClass('hid').siblings().addClass('hid')
  })
  // 点击设备列表按钮
  $('.list-btn').click(function() {
    $('.pageTab-box').show()
    sessionStorage.setItem('tabFlag', 'list')
    $('title').text('设备列表')
    $(this).addClass('active').siblings().removeClass('active')
    $('.header-test').addClass('hid')
    $('.header-list').removeClass('hid')
    $('.list-box').removeClass('hid').siblings().addClass('hid')
  })
  // 点击搜索按钮
  $('.search-btn').click(function() {
    // 获取到序列号
    let code = $('.search-input').val()
    // 定义序列号正则表达式
    let pattern = /^\d{10}$/
    // 匹配正则
    if (pattern.test(code)) {
      ajaxHttpJsonRequest(checkIsTest,false,{serialCode: code},function (res) {
        if (res.status == 1 ) {   // 已测试 未出库
          $.toast("当前序列号已经测试!", "text")
          return false 
        }
        if (res.status == 2) {   // 已经出库
          $.toast("当前序列号已经出库!", "text")
          return false 
        }
        if (res.status == -1) {   //未进行测试
          ajaxHttpJsonRequest(checkOnline,false,{serialCode:code},function (res) {
            // console.log('是否在线=',res)
              // res.status=1在线 0不在线
              if (res.status == 0) {   // 不在线
                 // $.toast("当前设备不在线", "text")
                 // return false
              }
              if (1) {    //在线 查询设备详情 res.status == 1
                ajaxHttpJsonRequest(checkmachineDetail, false, { serialCode: code }, function(res) {
                  // console.log(res)
                  if (res.success) {
                    // 保存数据
                    sessionStorage.setItem('machineDetailData', JSON.stringify(res))
                    let htmlStr = `
                            <div class="machine-show">
                              <p>
                                <span>${res.serialCode}</span>
                                <span>信号强度:<span>${res.signal}</span></span>
                              </p>
                              <p>
                                <span>ICCID:<span class="icc-val">${res.ICCID}</span></span>
                                <span class="run-test">进行测试</span>
                              </p>
                            </div>
                          `
                    $('.machineDetail-box').html(htmlStr)
                  }
                }, function(res) {
                  console.log(res)
                })
              }
          })
        }
      })
      // ajaxHttpJsonRequest(checkmachineDetail, false, { serialCode: code }, function(res) {
      //   console.log(res)
      //   if (res.success) {
      //     // 保存数据
      //     sessionStorage.setItem('machineDetailData', JSON.stringify(res))

      //     let htmlStr = `
      //       <div class="machine-show">
      //         <p>
      //           <span>${res.serialCode}</span>
      //           <span>信号强度:<span>${res.signal}</span></span>
      //         </p>
      //         <p>
      //           <span>ICCID:<span class="icc-val">${res.ICCID}</span></span>
      //           <span class="run-test">进行测试</span>
      //         </p>
      //       </div>
      //     `
      //     $('.machineDetail-box').html(htmlStr)
      //   }
      // }, function(res) {
      //   console.log(res)
      // })
      // ajaxHttpJsonRequest(checkOnline,false,{serialCode:code},function (res) {
      //   // res.status=1在线 0不在线
      //   console.log(res)
      //   if(res.status==1) {
      //     ajaxHttpJsonRequest(checkmachineDetail,false,{serialCode:code},function (res) {
      //       console.log(res) 
      //       if(!res.success) {
      //         $.toast(res.message, "text")
      //       }
      //     },function (res) {
      //       console.log(res)
      //     })
      //   } else {
      //     $.toast("当前设备不在线,请重新扫码或输入", "text")
      //     // $('.search-input').val('')
      //   }
      // },function (res) {
      //   console.log(res)
      // })
    } else {
      $.toast("当前序列号不合法,请重新扫码和输入", "text")
    }
  })
  // 点击进行测试
  $('body').on('click', '.run-test', function() {
    window.location.href = './machine-detail.html?t=' + Math.random()
  })

  // 监听返回操作
  window.history.pushState('列表', "./machine-list.html")
  $(window).on('popstate', function() {
    window.location.href = './machine-list.html'
  })
})

// 判断进入那个tab页
if (sessionStorage.getItem("clickStatus") == 2) {
  $('#tab2-2').click()
  sessionStorage.removeItem("clickStatus")
}




// status请求的类型 0为所有的 1是已测试 2是已出库
// 封装请求所有数据的方法  page是传递页码数 status是请求类型 selector是列表选择器
function getData(page, status, selector, seltor) {
  ajaxHttpJsonRequest(requestList, true, { pagerIndex: page, status: status }, function(res) {
    if (status == 1) {
      var pageTotal1 = Math.ceil(res.pager.rowsCount / res.pager.pageSize)
      sessionStorage.setItem('pageTotal1', pageTotal1)
    } else if (status == 2) {
      var pageTotal2 = Math.ceil(res.pager.rowsCount / res.pager.pageSize)
      sessionStorage.setItem('pageTotal2', pageTotal2)
    } else {
      var pageTotal = Math.ceil(res.pager.rowsCount / res.pager.pageSize)
      sessionStorage.setItem('pageTotal', pageTotal)
    }
    
    $(seltor).html(res.pager.rowsCount)
    console.log(pageTotal)
    let html = ''
    console.log(res)
    console.dir(res.rentMobileList)
    res.rentMobileList.forEach((v, i) => {
      html += `
          <div class="single-container">
            <div class="index-box"><span>000${i+1}</span><span>暂无</span></div>
            <p class="number-box"><span>序列号:</span><span>${v.serialCode?v.serialCode:'无'}</span></p>
            <p class="code-box"><span>机编:</span><span>${v.machineCode?v.machineCode:'无'}</span></p>
            <p class="testTime-box"><span>测试时间:</span><span>${v.testAt}</span></p>
            <p class="outTime-box"><span>出库时间:</span><span>${v.deliveryAt?v.deliveryAt:'----'}</span></p>
            <div class="status-box ${v.status==1?'':'out-status'}">${v.status==1?'已测试':'已出库'}</div>
            <span class="comeCode ${v.status==1?'':'hid'}" data-status='${v.status}' data-serialCode='${v.serialCode}' data-machineCode='${v.machineCode}'>继续录码</span>
          </div>
   `
    })
    $(selector).html(html)
  }, function(res) {
    if (res.message == 'verifyToken error') {
      window.location.href = './login.html'
    }
  })
}