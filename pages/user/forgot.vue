<template>
	<form @submit="formSubmit" @reset="formReset">
<view class="uni-title view-90">注册手机号码</view>
		<view class="uni-form-item uni-column view-90">
			<input class="uni-input" :name="mobile" />
		</view>
<view class="uni-title view-90">新密码</view>
		<view class="uni-form-item uni-column view-90">
			<input class="uni-input" :name="password"  />
		</view>
<view class="uni-title view-90">再次输入新密码</view>
		<view class="uni-form-item uni-column view-90">
			<input class="uni-input" type="password" :name="repass"  />
		</view>
		<view class="uni-btn-v view-90">
			<button formType="submit" type="primary">确认</button>
		</view>
		<view class="uni-btn-v view-90">
			<a href="" style="float: left;" @click="regist">重新注册</a>
			<a href="" style="float: right;" @click="login">现在登录</a>
		</view>
	</form>
</template>

<script>
	export default {
		data() {
			return {
				password: '',
				repass: ''
			}
		},
		methods: {
			formSubmit() {
				uni.showToast({
					title: '密码重置成功'
				})
				uni.redirectTo({
					url: '/pages/user/login'
				})
			},
			regist() {
				uni.redirectTo({
					url: '/pages/user/regist',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			login(){
				uni.redirectTo({
					url: '/pages/user/login',
					success: res => {},
					fail: () => {},
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
