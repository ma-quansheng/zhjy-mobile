<template>
	<view>
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-title uni-common-pl">类型</view>
			
			<view class="uni-list">
				<view class="uni-list-cell">
					<!-- <view class="uni-list-cell-left">
						当前选择aaaaaaaaaa
					</view> -->
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
				</view>
			</view>
			
			<view class="uni-form-item uni-column">
				<view class="title">标题</view>
				<input class="uni-input" name="title" placeholder="标题" />
			</view>
			
			<view class="uni-form-item uni-column">
				<view class="title">内容</view>
				<textarea @blur="bindTextAreaBlur" placeholder="内容" />
			</view>
			
			<view class="uni-btn-v">
				<button form-type="submit"  class=".view-90">提交</button>
				<button type="default" form-type="reset">返回</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: ['咨询', '投诉', '建议', '表扬'],
				index:0
			}
		},
		methods: {
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			}
		}
	}
</script>

<style>

</style>
