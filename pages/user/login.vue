<template>
	<view class="uni-padding-wrap uni-common-mt">
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-title view-90">账号</view>
			<view class="uni-form-item uni-column view-90">
				<input class="uni-input" v-model="user.username" />
			</view>
			<view class="uni-title view-90">密码</view>
			<view class="uni-form-item uni-column view-90">
				<input class="uni-input" type="password" v-model="user.password" />
			</view>
			<view class="uni-btn-v view-90">
				<button formType="submit" type="primary">登录</button>
			</view>
			<view class="uni-btn-v view-90">
				<button type="default" formType="reset">重置</button>
			</view>
			<view class="uni-btn-v view-90">
				<a href="" style="float: left;" @click.native="forgot">忘记密码</a>
				<a href="" style="float: right;" @click="regist">马上注册</a>
			</view>
		</form>
	</view>
</template>

<script>
	const graceChecker = require("@/common/graceChecker.js");
	const cryptojs = require('@/node_modules/crypto-js/index.js')
	export default {
		data() {
			return {
				user: {
					username: '',
					password: ''
				}
			}
		},
		methods: {
			formSubmit: function(e) {
				let user={
					username:'test',
					shequ:'test'
				}
				uni.setStorageSync('user', user)
				uni.switchTab({
					url: '/pages/home/index',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				return;
				this.user.password = cryptojs.SHA256(this.user.password).toString()
				this.$helper.matchUser(this.user, (res, user) => {
					if (res) {
						uni.setStorageSync('user', user)
						uni.switchTab({
							url: '/pages/home/index',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					} else {
						uni.showToast({
							title: '用户名 或 密码 错误',
							icon: 'none'
						});
						return
					}
				})
			},
			formReset: function(e) {
				console.log(cryptojs.SHA256('123456').toString())
				this.chosen = ''
			},
			forgot() {
				uni.redirectTo({
					url: '../user/forgot'
				})
			},
			regist() {
				uni.redirectTo({
					url: '/pages/user/regist'
				})
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
