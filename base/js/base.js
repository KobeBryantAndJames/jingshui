// var baseUrl = 'http://10.190.42.75:8080/'
var baseUrl = 'http://10.190.42.75:8080/'
// 登录接口
var loginUrl = baseUrl + 'login'
// 请求列表接口
var requestList = baseUrl + 'rentMo/findMoList'
// 查询是否在线接口
var checkOnline = baseUrl + 'rentMo/isStillAlive'
// 查询转态的接口
var checkIsTest = baseUrl + 'rentMo/getMobileBySerCode'
// 设备详情
var checkmachineDetail = baseUrl + 'rentMo/getMobileDet'
// 测试完成保存数据
var testOver = baseUrl + 'rentMo/insRentMobile'
// 出库接口
var outStore = baseUrl + 'rentMo/insRentMobileAndW'
// 控制指令接口
var controlInstructions = baseUrl + 'rentMo/deviceMission'
// 滤芯复位接口
var resetFilter = baseUrl + 'rentMo/resetFilter'



// 发送json格式的ajax请求
function ajaxHttpJsonRequest(url, async, _data, successCab, errCab) {
	// url 是请求的路径
	// async 是请求异步或同步 默认true是异步 false是同步
	// _data是请求的数据
	// successCab 是请求成功的回调
	// errCab 是请求失败的回调
	$.ajax({
		url,
		async,
		type: 'post',
		data: JSON.stringify(_data),
		contentType: 'application/json; charset=UTF-8',
		headers: {
			token: localStorage.getItem('token')
			// token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJBUFAiLCJpc3MiOiJTZXJ2aWNlIiwic2VjbyI6InJlbnRNb2JpbGUiLCJ1c2VyTmFtZSI6ImFkbWluMSIsImlhdCI6MTU0NDY2OTMyM30.yY3syYtj_0W8C4qFfrjrNuF8953-JCgooKMSOgDv4fk'
		},
		dataType: 'json',
		success(data) {
			successCab(data)
		},
		error(res) {
			if (errCab) {
				errCab(res.responseJSON)
			}
		}
	})
}
// 发送fromdata数据形式
function ajaHttpRequest(url, async, data, successCab) {
	$.ajax({
		url,
		async,
		type: 'post',
		data,
		success(res) {
			successCab(res)
		}
	})
}
// 格式化时间
function formatDate(_date) {
	let myDate = new Date(_date)
	let Y = '' + myDate.getFullYear()
	let M = ('0' + (myDate.getMonth() + 1)).slice(-2)
	let D = ('0' + myDate.getDate()).slice(-2)
	let H = ('0' + myDate.getHours()).slice(-2)
	let min = ('0' + myDate.getMinutes()).slice(-2)
	return `${Y}-${M}-${D} ${H}:${min}`
}
// 返回当前时间
function nowLocalTime() {
	let myDate = new Date()
	let Y = '' + myDate.getFullYear()
	let M = ('0' + (myDate.getMonth() + 1)).slice(-2)
	let D = ('0' + myDate.getDate()).slice(-2)
	let H = ('0' + myDate.getHours()).slice(-2)
	let min = ('0' + myDate.getMinutes()).slice(-2)
	return `${Y}-${M}-${D}  ${H}:${min}`
}