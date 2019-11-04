<template>
	<form @submit="formSubmit" @reset="formReset">
		<view class="uni-title view-90">账号</view>
		<view class="uni-form-item uni-column view-90">
			<input class="uni-input" v-model="user.username" />
		</view>
		<view class="uni-title view-90">姓名</view>
		<view class="uni-form-item uni-column view-90">
			<input class="uni-input" v-model="user.realname" />
		</view>
		<view class="uni-title view-90">密码</view>
		<view class="uni-form-item uni-column view-90">
			<input class="uni-input" password v-model="user.password" />
		</view>
		<view class="uni-title view-90">密码确认</view>
		<view class="uni-form-item uni-column view-90">
			<input class="uni-input" id="repwd" password v-model="repass" />
		</view>
		<view class="uni-title view-90">手机号码</view>
		<view class="uni-form-item uni-column view-90">
			<input class="uni-input" type="number" v-model="user.mobile" />
		</view>
		<view class="uni-title view-90">所属社区</view>
		<view class="uni-form-item uni-column view-90">
			<!-- <view class="uni-list"> -->
			<!-- <view class="uni-list-cell"> -->
			<!-- <view class="uni-list-cell-db"> -->
			<picker @change="bindPickerChange" :value="index" :range="shequList"
			 range-key="name">
				<view class="uni-input" v-if="!user.shequ">请选择所属社区</view>
				<view class="uni-input" v-else="">{{user.shequ}}</view>
			</picker>
			<!-- </view> -->
			<!-- </view> -->
			<!-- </view> -->
		</view>
		<view class="uni-title view-90">详细地址</view>
		<view class="uni-form-item uni-column view-90">
			<input class="uni-input" type="text" v-model="user.addr" />
		</view>
		<view class="uni-btn-v view-90">
			<button formType="submit" type="primary">注册</button>
		</view>
		<view class="uni-btn-v view-90">
			<button type="default" formType="reset">重置</button>
		</view>
		<view class="uni-btn-v view-90">
			<a href="" style="float: right;" @click="login">现在登录</a>
		</view>
	</form>
</template>

<script>
	const cryptojs = require('@/node_modules/crypto-js/index.js')
	export default {
		data() {
			return {
				user: {
					username: '',
					realname: '',
					password: '',
					mobile: '',
					shequ: '',
					addr: ''
				},
				repass: '',
				shequList: [],
				index: 0

			}
		},
		onShow() {

			this.getShequList()
		},
		methods: {
			validata() {
				if (!this.user.username) {
					uni.showToast({
						title: '账号不能为空',
						icon: 'none'
					});
					return
				}
				if (!this.user.realname) {
					uni.showToast({
						title: '姓名不能为空',
						icon: 'none'
					});
					return
				}
				if (!this.user.password) {
					uni.showToast({
						title: '密码不能为空',
						icon: 'none'
					});
					return
				}
				if (this.repass != this.user.password) {
					uni.showToast({
						title: '两次输入的密码不一致',
						icon: 'none'
					});
					return
				}
				if (!this.user.mobile) {
					uni.showToast({
						title: '手机号码不能为空',
						icon: 'none'
					});
					return
				} else if (this.user.mobile.substr(0, 1) != '1') {
					uni.showToast({
						title: '手机号码无效',
						icon: 'none'
					});
					return
				}
				if (!this.user.shequ) {
					uni.showToast({
						title: '社区不能为空',
						icon: 'none'
					});
					return
				}
			},
			getShequList() {
				uni.request({
					url: `${this.$helper.server}/shequ`,
					method: 'GET',
					data: {},
					success: res => {
						if (res.statusCode == 200) {
							for (let item of res.data.values()) {
								this.shequList.push({
									name: item.name
								})
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			login() {
				uni.redirectTo({
					url: '/pages/user/login',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			bindPickerChange(e) {
				// console.log(JSON.stringify(e));
				this.user.shequ = this.shequList[e.target.value].name
				// this.index = e.target.value
			},
			formSubmit(e) {
				// this.validata()
				this.$helper.hasUser(this.user, res => {
					if (res) {
						uni.showToast({
							title: '用户已存在',
							icon: 'none'
						});
						return
					}
				})

				this.user.password = cryptojs.SHA256(this.user.password).toString()
				uni.request({
					url: `${global.host}/user`,
					method: 'POST',
					data: this.user,
					success: res => {
						if (res.statusCode == 200) {
							uni.showToast({
								title: '注册成功',
								icon: 'none'
							});
							setTimeout(function() {
								uni.redirectTo({
									url: '/pages/user/login',
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							}, 2000);
						}
					},
					fail: (e) => {
						uni.showToast({
							title: e.errMsg,
							icon: 'none'
						});
					},
					complete: () => {}
				});
			}
		}
	}
</script>

<style scoped>
	a {
		display: inline-block;
		color: blue;
		font-size: 30upx;
		margin-top: 10upx;
	}
</style>
