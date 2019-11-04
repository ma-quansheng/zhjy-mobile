<template>
	<view class="content">
		<wuc-tab :tab-list="categories" :tabCur.sync="TabCur" textFlex="true" @change="tabChange"></wuc-tab>
		<news-list :dataList="news"></news-list >
		
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
	import NewsList from '@/components/news-list/news-list.vue';
	export default {
		components: { WucTab,NewsList },
		data() {
			return {
				categories: [],
				news:[],
				drawerShow: false,
				TabCur:0
			}
		},
		onLoad() {
		},
		onShow() {
			this.getCategories()
			this.tabChange(this.TabCur)
		},onHide() {
			this.drawerShow = false
		},
		onPullDownRefresh() {
			
		},
		onReachBottom() {
			console.log(22)
		},
		methods: {
			tabChange(index) {
				this.TabCur = index;
				this.$helper.getUserInfo((user) => {
					uni.request({
						url: global.host+'/api/notifies/lst?xiaoqu='+user.xiaoqu_id+'&type='+(index+2),
						method: 'GET',
						dataType: 'json',
						success: (res) => {
							if (res.statusCode == 200) {
								this.news = res.data
							}
						},
						fail: (err) => {
							console.log(err)
						},
						complete: () => {}
					})
				})
			},
			selDrawer() {
				this.drawerShow = false
				
						uni.removeStorageSync('user')
						plus.runtime.quit()
			},
			onNavigationBarButtonTap(item) {
				this.drawerShow=!this.drawerShow
			},
			getCategories() {
				this.$helper.getUserInfo((user) => {
					uni.request({
						url: `${global.host}/api/notifies/getcategorybyxiaoqu?xiaoqu=${user.xiaoqu_id}`,
						method: 'GET',
						dataType: 'json',
						success: (res) => {
							if (res.statusCode == 200) {
								this.categories = res.data
							}
						},
						fail: (err) => {
							console.log(err)
						},
						complete: () => {}
					})
				})
			},
		}
	}
</script>

<style>
</style>
