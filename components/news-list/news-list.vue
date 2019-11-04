<template>
	<uni-list>
		<view v-for="(item,index) in dataList" :key="index">
			<navigator :url="'/pages/notifies/notify-show?id='+item.id">
				<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg" mode="widthFix"></image>
				<uni-list-item 
					:title="item.title" 
					:note="item.create_time">
				</uni-list-item>
			</navigator>
		</view>
	</uni-list>
</template>

<script>
	export default {
		props:['dataList'],
		data() {
			return {
			};
		},
		onLoad(){
			console.log(dataList);
		}
	}
</script>

<style scoped>
navigator{
	display: flex;
	flex-wrap: nowrap;
}
navigator image{
	width: 180upx;
	margin-top: 7upx;
	margin-left: 5upx;
	flex-shrink: 0;
}

navigator uni-list-item{
	width: 100%;
	height: auto;
}
</style>
