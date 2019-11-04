<template>
	<view class="warp">
		<view class="box">
			<view class="title">常用联系电话</view>
			<t-table @change="change">
				<t-tr>
					<t-th>序号</t-th>
					<t-th>部门</t-th>
					<t-th>电话</t-th>
				</t-tr>
				<t-tr v-for="(item,index) in list" :key="index">
					<t-td>{{index+1}}</t-td>
					<t-td>{{item.title}}</t-td>
					<t-td @tap="call(item.telephone)">{{item.telephone}}</t-td>
				</t-tr>
			</t-table>
		</view>
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue';
	    import tTh from '@/components/t-table/t-th.vue';
	    import tTr from '@/components/t-table/t-tr.vue';
	    import tTd from '@/components/t-table/t-td.vue';
	export default {
		components: {
		            tTable,
		            tTh,
		            tTr,
		            tTd
		        },
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
			uni.request({
				url: global.host+'/api/telephone',
				method: 'GET',
				data: {},
				success: res => {
					if (res.statusCode==200){
						this.list=res.data
					}
				},
				fail: (err) => {
					console.log(JSON.stringify(err))
				},
				complete: () => {}
			});
		},
		methods: {
			call(id){
				uni.makePhoneCall({
				    phoneNumber: id //仅为示例
				});
			}
		}
	}
</script>

<style scoped>
	a {
		display: inline-block;
		color: blue;
		font-size: 30upx;
		margin-top: 10upx;
	}
</style>
