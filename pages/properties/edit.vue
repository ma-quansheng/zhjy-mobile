<template>
	<view class="">
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-title uni-common-pl">物业类型</view>
			
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" name="property_type" :value="dataList.property_type" :range="array">
							<view class="uni-input">{{array[dataList.property_type]}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">标识</view>
				<input class="uni-input" name="addr" :value="dataList.addr" placeholder="地址 / 车牌号" />
			</view>
			
			<view class="uni-form-item uni-column">
				<view class="title">说明</view>
				<textarea @blur="bindTextAreaBlur" name="summary" v-model="dataList.summary">
				</textarea>
			</view>
			
			<view class="uni-btn-v">
				<button form-type="submit" type="primary" class=".view-90">提交</button>
				<button type="warn" form-type="reset" class=".view-90" @tap="del">删除</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				array: ['请选择物业类型...','房产', '车位'],
				index:0,
				user_id:'',
				dataList:[],
				id:0
			}
		},
		onLoad(option) {
			this.id=option.id
			uni.request({
				url: global.host+'/api/properties/read?id='+option.id,
				method: 'GET',
				dataType: 'json',
				success: (res) => {
					if (res.statusCode == 200) {
						this.dataList = res.data
					}
				},
				fail: (err) => {
					console.log(err)
				},
				complete: () => {}
			})
		},
		methods: {
			bindPickerChange(e) {
				this.dataList.property_type = e.target.value
			},
			bindTextAreaBlur(){},
			del(){
				uni.request({
					url: `${global.host}/api/properties/delete?id=${this.id}`,
					method: 'GET',
					data: {},
					success: res => {
						uni.redirectTo({
							url: '/pages/properties/list',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					},
					fail: (err) => {
						
					},
					complete: () => {}
				});
			},
			formSubmit(e) {
				uni.request({
					url: global.host+'/api/properties/update?id='+this.id,
					method: 'POST',
					data: e.detail.value,
					success: res => {
						if (res.statusCode==200){
							uni.redirectTo({
								url: '/pages/properties/list',
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						}
					},
					fail: (err) => {
						console.log(JSON.stringify(err))
					},
					complete: () => {}
				});
			},
		}
	}
</script>

<style>
</style>
