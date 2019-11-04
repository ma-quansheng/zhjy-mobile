<template>
	<view class="content">
		<wuc-tab :tab-list="typelist" :tabCur.sync="TabCur" textFlex="true" @change="tabChange"></wuc-tab>
		
		<view v-show="!showlist">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-title uni-common-pl">类型</view>
				
				<view class="uni-list">
					<view class="uni-list-cell">
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
					<button form-type="submit" type="primary" class=".view-90">提交</button>
				</view>
			</form>
		</view>
		<view v-show="showlist">
			<uni-list>
				<view v-for="(item,index) in news" :key="index">
					<navigator :url="'/pages/notifies/question-show?id='+item.id">
						<uni-list-item :title="item.title" showArrow>
						</uni-list-item>
					</navigator>
				</view>
			</uni-list>
		</view>
		<!-- 抽屉菜单 -->
		<uni-drawer :visible="drawerShow" mode="right" @close="drawerShow=false">
			<uni-list style="padding:30upx;">
				<navigator url="/pages/user/my">
				<uni-list-item title="我的" "></uni-list-item>
				</navigator>
				<navigator url="/pages/setting/setting">
				<uni-list-item title="设置" "></uni-list-item>
				</navigator>
				<uni-list-item title="退出" @click="selDrawer"></uni-list-item>
			</uni-list>
		</uni-drawer>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	export default {
		components: { WucTab },
		data() {
			return {
				typelist:[
					{name:'新建'},
					{name:'全部'},
					{name:'已回复'},
					{name:'待回复'},
				],
				TabCur:0,
				showlist:false,
				array: ['咨询', '投诉', '建议', '表扬'],
				index:0,
				news:[],
			}
		},
		onLoad() {
			this.tabChange(this.index)
		},
		methods: {
			selDrawer() {
				this.drawerShow = false
				uni.removeStorageSync('user')
				plus.runtime.quit()
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			tabChange(index) {
				this.TabCur = index;
				switch (index){
					case 1:
						this.showlist=true;
						this.$helper.getUserInfo((user) => {
							uni.request({
								url: global.host+'/api/question/lst?author='+user.id,
								method: 'GET',
								dataType: 'json',
								success: (res) => {
									if (res.statusCode == 200) {
										this.news = res.data
									}
								},
								fail: (err) => {},
								complete: () => {}
							})
						})
					break;
					case 2:
						this.showlist=true;
						this.$helper.getUserInfo((user) => {
							uni.request({
								url: global.host+'/api/question/lst?author='+user.id+'&status=0',
								method: 'GET',
								dataType: 'json',
								success: (res) => {
									if (res.statusCode == 200) {
										this.news = res.data
									}
								},
								fail: (err) => {},
								complete: () => {}
							})
						})
					break;
					case 3:
						this.showlist=true;
						this.$helper.getUserInfo((user) => {
							uni.request({
								url: global.host+'/api/question/lst?author='+user.id+'&status=1',
								method: 'GET',
								dataType: 'json',
								success: (res) => {
									if (res.statusCode == 200) {
										this.news = res.data
									}
								},
								fail: (err) => {},
								complete: () => {}
							})
						})
					break;
					default:
					this.showlist=false;
					this.news=[]
					break;
				}
			}
		}
	}
</script>

<style>

</style>
