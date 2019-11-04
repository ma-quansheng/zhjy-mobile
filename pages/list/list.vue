<template>
	<view>
		<uni-list>
			<view v-for="(item,index) in dataList" :key="index">
				<uni-list-item v-if="item.type=='d'" :title="item.name" showArrow thumb="static/icons8-folder-80.png"
				 @click="getItem(item)"></uni-list-item>
				<uni-list-item v-else :title="item.name" showArrow="false" thumb="static/icons8-preview-file-80.png"
				 @click="getItem(item)">
				</uni-list-item>
			</view>
		</uni-list>
		<!-- 抽屉菜单 -->
		<uni-drawer :visible="drawerShow" mode="right" @close="drawerShow=false">
			<uni-list style="padding:30upx;">
				<uni-list-item title="我的信息" @click="selDrawer('0')"></uni-list-item>
				<uni-list-item title="设置" @click="selDrawer('1')"></uni-list-item>
				<uni-list-item title="退出" @click="selDrawer('2')"></uni-list-item>
			</uni-list>
		</uni-drawer>
	</view>
</template>

<script>
	import path from 'path'
	export default {
		data() {
			return {
				dataList: [],
				root: null,
				drawerShow: false
			}
		},
		onLoad(options) {
			this.root = options.data
			uni.setNavigationBarTitle({
				title: path.basename(options.data),
				success: res => {},
				fail: () => {},
				complete: () => {}
			})
			this.getDataList()
		},
		onHide() {
			this.drawerShow = false
		},
		methods: {
			selDrawer(index) {
				this.drawerShow = false
				switch (index) {
					case '2':
						uni.removeStorageSync('user')
						plus.runtime.quit()
						break;
					case '1':
						uni.navigateTo({
							url: '/pages/setting/setting',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
						break;
					case '0':
						uni.navigateTo({
							url: '/pages/my/my',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
						break;
				}
			},
			onNavigationBarButtonTap(item) {
				this.drawerShow=!this.drawerShow
			},
			getDataList() {
				console.log(`${this.$helper.server}/children?root=${this.root}`);
				uni.request({
					url: `${this.$helper.server}/children?root=${this.root}`,
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						if (res.statusCode == 200) {
							this.dataList = res.data
						}
					},
					fail: (err) => {},
					complete: () => {}
				})
			},
			getItem(item) {
				if (item.type == 'f') {
					plus.runtime.openWeb(`${this.$helper.server}/render?file=${item.url}`)
				} else {
					uni.navigateTo({
						url: `/pages/list/list?data=${item.url}`,
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
			}
		}
	}
</script>

<style>

</style>
