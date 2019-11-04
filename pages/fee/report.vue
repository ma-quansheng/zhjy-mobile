<template>
	<view>
		<!-- <form @submit="formSubmit" @reset="formReset"> -->
			<view class="uni-title uni-common-pl">缴费类型</view>
			
			<view class="uni-list">
				<view class="uni-list-cell">
					<!-- <view class="uni-list-cell-left">
						当前选择aaaaaaaaaa
					</view> -->
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="typelist" range-key="name">
							<view class="uni-input">{{typelist[index].name}}</view>
						</picker>
					</view>
				</view>
			</view>
			
			<view v-for="(item,index) in dataList" :key="index">
				<navigator :url="'/pages/fee/detail?id='+item.id">
					<uni-list-item 
						:title="item.addr" 
						:note="item.name"
						showArrow>
					</uni-list-item>
				</navigator>
			</view>
			
			<!-- <view class="uni-btn-v">
				<button form-type="submit">提交</button>
				<button type="default" form-type="reset">返回</button>
			</view> -->
		<!-- </form> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typelist: [],
				index:0,
				selected_id:0,
				dataList:[]
			}
		},
		onShow() {
			this.getFeeType()
			this.getDataListAll()
			console.log(global.host)
		},
		methods: {
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', this.typelist[e.target.value].id)
				this.selected_id=this.typelist[e.target.value].id
				this.index = e.target.value
				if (this.index==0){
					this.getDataListAll()
				}else{
					this.getDataList()
				}
			},
			getFeeType(){
				uni.request({
					url: global.host+'/api/feetype/index',
					method: 'GET',
					data: {},
					success: res => {
						if (res.statusCode==200){
							this.typelist=res.data
							this.typelist.unshift({id:0,name:'全部'})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getDataListAll(){
				this.$helper.getUserInfo((user) => {
					uni.request({
						url: global.host+'/api/feereport/lstByUser?id='+user.id,
						method: 'GET',
						data: {},
						success: res => {
							if (res.statusCode==200){
								this.dataList=res.data
							}
						},
						fail: () => {},
						complete: () => {}
					});
				})
			},
			getDataList(){
				this.$helper.getUserInfo((user) => {
					uni.request({
						url: global.host+'/api/feereport/lst?type_id='+this.selected_id+'&id='+user.id,
						method: 'GET',
						data: {},
						success: res => {
							if (res.statusCode==200){
								this.dataList=res.data
							}
						},
						fail: () => {},
						complete: () => {}
					});
				})
			}
		}
	}
</script>

<style>

</style>
