<template>
	<view>
		<uni-card
			is-full="true"
		    :title="news.title"
		    mode="style"
		    is-shadow="true"
		    :thumbnail="news.image"
		    :note="news.create_time"
		>
			<view class="uni-flex uni-column">
				<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg" alt="" style="width:100%;"></image>
				<view class="flex-item">发布人: {{news.username}}</view>
				<br>
				<text>{{news.content}}</text>
			</view>
		</uni-card>
	</view>
</template>

<script>
	import uniCard from "@/components/uni-card/uni-card"
	export default {
		components: {uniCard},
		data() {
			return {
				news:null,
			}
		},
		onLoad(option) {
			uni.request({
				url: `${global.host}/api/question/read?id=${option.id}`,
				method: 'GET',
				dataType: 'json',
				success: (res) => {
					if (res.statusCode == 200) {
						this.news = res.data
					}
				},
				fail: (err) => {},
				complete: () => {}
			});
		},
		methods: {
		}
	}
</script>

<style>

</style>
