<template>
	<view>
		<h2>
			this is test page
		</h2>
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				url: '',
				htmlNodes: null
			}
		},
		onLoad(options) {
			this.url = options.url
			this.getHtml()
		},
		methods: {
			getHtml() {
				plus.runtime.openWeb(`${this.$helper.server}/render?file=${this.url}`)
			}
		}
	}
</script>

<style>

</style>
