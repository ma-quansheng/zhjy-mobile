<template>
	<view class="">
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-title uni-common-pl">物业类型</view>
			
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" name="property_type" :value="index" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
				</view>
			</view>
			
			<view class="uni-form-item uni-column">
				<view class="title">标识</view>
				<input class="uni-input" name="addr" placeholder="地址 / 车牌号" />
			</view>
			
			<view class="uni-form-item uni-column">
				<view class="title">说明</view>
				<textarea @blur="bindTextAreaBlur" name="summary" placeholder="描述信息" />
			</view>
			
			<view class="uni-btn-v">
				<button form-type="submit" type="primary" class=".view-90">提交</button>
				<!-- <button type="default" form-type="reset">重置</button> -->
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
			}
		},
		onLoad(option) {
			this.$helper.getUserInfo((user) => {
				this.user_id=user.id;
			});
		},
		methods: {
			bindPickerChange(e) {
				this.index = e.target.value
			},
			bindTextAreaBlur(){},
			formSubmit(e) {
				e.detail.value.user_id=this.user_id;
				uni.request({
					url: global.host+'/api/properties/add',
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
