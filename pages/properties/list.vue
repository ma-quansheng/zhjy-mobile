<template>
	<view>
	<uni-list>
		<view v-for="(item,index) in dataList" :key="index">
			<navigator :url="'/pages/properties/edit?id='+item.id">
				<uni-list-item 
					:title="item.addr" 
					:note="item.property_name"
					showArrow>
				</uni-list-item>
			</navigator>
		</view>
		<navigator url="/pages/properties/add">
			<uni-list-item 
				title="添加物业" 
				note="添加新的物业"
				showArrow>
			</uni-list-item>
		</navigator>
	</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:[],
			}
		},
		onShow() {
			this.getDataList();
		},
		onPullDownRefresh() {
			this.getDataList();
		},
		onReachBottom() {
			console.log('loading...');
		},
		methods: {
			getItem(id){},
			getDataList(){
				uni.showNavigationBarLoading();
				this.$helper.getUserInfo((user) => {
					uni.request({
						url: global.host+'/api/properties/lstbyuser?id='+user.id,
						method: 'GET',
						dataType: 'json',
						success: (res) => {
							if (res.statusCode == 200) {
								console.log(res.data)
								this.dataList = res.data
							}
						},
						fail: (err) => {
							console.log(err);
						},
						complete: () => {
							uni.stopPullDownRefresh();
							uni.hideNavigationBarLoading();
						}
					})
				})
			}
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
