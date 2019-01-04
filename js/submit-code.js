$(function () {
	// 获取到扫码时间
	if (sessionStorage.getItem("saoTime")) {
		var myData = sessionStorage.getItem("saoTime")
		$('.sao-time input').val(formatDate(myData))
		console.log(formatDate(myData))
	}
	// 获取到机编
	if (sessionStorage.getItem("codeData1")) {
		$('.machine-code input').val(sessionStorage.getItem("codeData1"))
	}
	// 获取到序列号
	if (sessionStorage.getItem("codeData2")) {
		$('.serial-number input').val(sessionStorage.getItem("codeData2"))
	}
	// 点击提交按钮事件
	$('.btn .weui-btn').click(function () {
		window.location.href="./machine-detail.html"
	})
})