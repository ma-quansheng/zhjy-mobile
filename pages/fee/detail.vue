<template>
	<uni-card 
	    :title="data.addr" 
	    mode="title" 
	    :is-shadow="true" 
	    :extra="data.name" 
	    :note="data.pay_time"
	>
	    <text space="nbsp">今收到 {{data.payer}} 缴来的“{{data.addr}}”{{data.name}}，共计人民币{{data.amount}}元整。缴费期间从{{data.begin_date}}起，至{{data.end_date}}止。</text >
	</uni-card>
</template>

<script>
	import uniCard from "@/components/uni-card/uni-card"
	export default{
		components: {uniCard},
		data(){
			return{
				data:null
			}
		},
		onLoad(option) {
			this.id=option.id
			this.$helper.getUserInfo((user) => {
				uni.request({
					url: global.host+'/api/feereport/read?user='+user.id+'&id='+option.id,
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						if (res.statusCode == 200) {
							this.data = res.data[0]
						}
					},
					fail: (err) => {
						console.log(err)
					},
					complete: () => {}
				})
			});
		},
		methods: {
			bindPickerChange(e) {
				this.dataList.property_type = e.target.value
			},
			bindTextAreaBlur(){},
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
