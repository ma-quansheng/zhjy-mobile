export default {
	appName: '智慧家园客户端',
	ver: 'ver:1.0.0',
	server: process.env.NODE_ENV === 'development' ? 'http://server.loc': 'http://60.205.210.38',
	// 'http://192.168.0.103:7001' : 'http://60.205.210.38',
	getUserInfo: (callback) => {
		uni.getStorage({
			key: 'user',
			success: (res) => {
				if (res.errMsg == "getStorage:ok") {
					// console.log(res.data)
					callback(res.data)
				}
			},
			fail: () => {
				callback(null)
			},
			complete: () => {}
		})
	},
	setUsernfo: (user) => {
		uni.setStorage({
			key: 'user',
			data: user,
			success: () => {
				console.log('set user success')
			},
			fail: () => {
				console.log("set user fail")
			},
			complete: () => {}
		})
	},
	checkLogin: (backPage, backType) => {
		const user = uni.getStorageSync('user')
		if (!user) {
			uni.redirectTo({
				url: '/pages/user/login.vue',
			})
			return false
		}
	},
	logout() {
		uni.removeStorageSync('user')
		uni.redirectTo({
			url: '/pages/user/login.vue'
		});
	},
	regist() {
		uni.redirectTo({
			url: '/pages/user/regist.vue',
			success() {
				uni.switchTab({
					url: '/pages/home/index.vue'
				})
			}
		});
	},
	hasUser(user, callback) {
		uni.request({
			url: `${global.host}/user/${user.username}`,
			method: 'GET',
			data: {},
			success: res => {
				if (res.statusCode == 200 && res.data.length > 0) {
					callback(true)
				} else {
					callback(false)
				}
			},
			fail: () => {
				callback(false)
			},
			complete: () => {}
		});
	},
	valiData(target, rules) {
		for (let item in target) {
			for (let rule in rules[item]) {

			}
		}
	},
	matchUser(user, callback) {
		const target = uni.request({
			url: `${global.host}/user/${user.username}`,
			method: 'GET',
			data: {},
			success: res => {
				if (res.statusCode = 200 && res.data.length > 0) {
					if (user.password == res.data[0].password) {
						callback(true, res.data[0])
					} else {
						callback(false)
					}
				}
			},
			fail: () => {
				callback(false)
			},
			complete: () => {}
		});
	}
}
