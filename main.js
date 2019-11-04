import Vue from 'vue'
import App from './App'
import helper from './helper.js'
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
// import uniIcon from '@/components/uni-icon/uni-icon.vue'

Vue.component("uni-list",uniList)
Vue.component("uni-list-item",uniListItem)
Vue.component('uni-drawer',uniDrawer)
// Vue.compile('uni-icon',uniIcon)

Vue.config.productionTip = false
Vue.prototype.$helper=helper

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
