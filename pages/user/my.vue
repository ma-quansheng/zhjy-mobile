<template>
	<view class="uni-flex uni-column">
		<!-- 修改“我的”信息 -->
		<navigator url="/pages/user/my">
			<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg" mode=""></image>
		</navigator>
		
		<!--  -->
		<uni-list>
			<navigator url="/pages/user/kefu">
				<!-- 显示 居委会、业委会、物业 的联系电话 -->
				<uni-list-item title="我的客服" showArrow thumb="/static/icons8-phone-50.png" @click="getItem(1)">
				</uni-list-item>
			</navigator>
			<navigator url="/pages/properties/list">
				<!-- 显示 缴纳物业费 的历史记录 -->
				<uni-list-item title="我的物业" showArrow thumb="/static/icons8-home.png" @click="getItem(1)">
				</uni-list-item>
			</navigator>
			<navigator url="/pages/fee/report">
				<!-- 显示 缴纳物业费 的历史记录 -->
				<uni-list-item title="缴费记录" showArrow thumb="/static/icons8-money-bag-80.png" @click="getItem(1)">
				</uni-list-item>
			</navigator>
			<navigator url="/pages/setting/setting">
				<!-- 打开 系统设置 页面 -->
				<uni-list-item title="更多..." showArrow thumb="/static/icons8-registry-editor-64.png" @click="getItem(1)">
				</uni-list-item>
			</navigator>
			<uni-list-item showArrow="false"></uni-list-item>
			<!-- <view class="button-sp-area"> -->
			<button type="warn" class=".view-90">退出登录</button>
			<!-- </view> -->
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onShow() {
		},
		methods: {
			getItem(id){}
		}
	}
</script>

<style scoped>
	image{
		width: 100%;
		height: 300px;
	}
</style>
