$(function () {
	// 获取最后登录时间 并显示到页面上
	if (localStorage.getItem('loginTime')) {
		$('.time-val').text(localStorage.getItem('loginTime'))
	}
	if(localStorage.getItem('userName')) {
		$('.name-val').text(localStorage.getItem('userName'))
	}
	// 点击返回按钮事件
	$('.goback-icon').click(function () {
		window.location.href="./machine-list.html?t=" + Math.random()
	})
	// 点击设备列表按钮
	$('.list-btn').click(function () {
		sessionStorage.setItem('tabFlag', 'list')
		window.location.href="./machine-list.html?t=" + Math.random()
	})
	// 点击网器测试按钮
	$('.test-btn').click(function () {
		sessionStorage.setItem('tabFlag', 'test')
		window.location.href="./machine-list.html?t=" + Math.random()
	})
})