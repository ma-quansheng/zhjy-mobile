<template>
	<!-- 抽屉菜单 -->
	<uni-drawer :visible="show" mode="right" @close="show=false">
		<uni-list style="padding:30upx;">
			<uni-list-item title="我的信息" @click="selDrawer('0')"></uni-list-item>
			<uni-list-item title="设置" @click="selDrawer('1')"></uni-list-item>
			<uni-list-item title="退出" @click="selDrawer('2')"></uni-list-item>
		</uni-list>
	</uni-drawer>
</template>

<script>
	export default {
		props: ['visible'],
		data() {
			return {
				// visible: false
			}
		},
		computed:{
			show(){
				return this.visible
			}
		},
		methods: {
			selDrawer(index) {
				this.visible = false
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
							url: '/pages/user/my',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
						break;
				}
			}
		}
	}
</script>

<style>

</style>
