<template>
	<view class="uni-flex uni-column">
		<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg" mode=""></image>
	<uni-list>
		<navigator url="/pages/setting/about">
		<uni-list-item title="关于 ..." showArrow ></uni-list-item>
		</navigator>
		<navigator url="/pages/setting/help">
		<uni-list-item title="帮助" showArrow ></uni-list-item>
		</navigator>
	</uni-list>
	<button type="primary" class=".view-90">检查更新</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped>
image{
		width: 100%;
		height: 300px;
	}
</style>
