<template>
    <view class="content">
        <!-- 轮播图显示区 -->
        <swiper class="swiper" indicator-dots autoplay :interval="interval" :duration="duration">
            <swiper-item>
                <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg" mode="widthFix"></image>
            </swiper-item>
            <swiper-item>
                <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg" mode="widthFix"></image>
            </swiper-item>
            <swiper-item>
                <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg" mode="widthFix"></image>
            </swiper-item>
        </swiper>
        <!-- 热点新闻显示区 -->
        <news-list :dataList="dataList"></news-list>
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
<!-- http://iph.href.lu/[width]x[height]?text=[自定义文字] -->
<script>
import NewsList from '@/components/news-list/news-list.vue';
export default {
    components: { NewsList },
    data() {
        return {
            user: null,
            dataList: null,
            carInfo: '信息公告',
            interval: 2000,
            duration: 500,
            drawerShow: false
        }
    },
    onLoad(options) {
        uni.setStorage({
            key: 'user',
            data: {
                id: 1,
                username: 'mqs',
                realname: 'ma quansheng',
                xiaoqu_id: 2,
                role: 1,
                usertype_id: 1,
                status: 1
            },
            success: () => {
                // console.log(this.data)
            },
            fail: () => {
                console.log("set user fail")
            },
            complete: () => {}
        })
        this.$helper.getUserInfo((user) => {
            this.user = user
            // console.log(this.user)
        })
    },
    onShow() {
        this.getNews()
    },
    onHide() {
        this.drawerShow = false
    },
    methods: {
        selDrawer() {
            this.visible = false
                    uni.removeStorageSync('user')
                    plus.runtime.quit()
        },
        onNavigationBarButtonTap(item) {
            this.drawerShow = !this.drawerShow
        },
        onUnload() {},
        getCarInfo() {
            uni.request({
                url: `${this.$helper.server}/car/${this.user.shequ}`,
                method: 'GET',
                success: (res) => {
                    if (res.statusCode == 200) {
                        this.carInfo = res.data
                    }
                },
                fail: (err) => {},
                complete: () => {}
            })
        },
        getNews() {
            uni.request({
                url: global.host+'/api/notifies/gethot',
                method: 'GET',
                dataType: 'json',
                success: (res) => {
                    if (res.statusCode == 200) {
                        this.dataList = res.data
                    }
                },
                fail: (err) => {
                    console.log(err)
                },
                complete: () => {}
            })
        },
    }
}
</script>
<style scoped>
.car-Info {
    text-align: center;
    color: darkred;
    height: 60upx;
    padding-top: 10px;
}

swiper {
    height: 300px;
}

swiper-item {
    height: 100%;
    text-align: center;
}

swiper-item image {
    width: 100%;
    flex-shrink: 0;
}
</style>