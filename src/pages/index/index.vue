<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getHomeBanner, getHomeCategory, getHot } from '@/services/home'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { XtxGuessInstance } from '@/types/component'
import PageSkeleton from './PageSkeleton.vue'
import { useGuessList } from '@/composables'

const bannerData = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBanner()
  bannerData.value = res.result
}

const categoryData = ref<CategoryItem[]>([])
const getCategoryData = async () => {
  const res = await getHomeCategory()
  categoryData.value = res.result
}

const HotData = ref<HotItem[]>([])
const getHotData = async () => {
  const res = await getHot()
  HotData.value = res.result
}

// 是否加载中的标记
const isLoading = ref(true)

onLoad(async () => {
  isLoading.value = true
  await Promise.allSettled([getHomeBannerData(), getCategoryData(), getHotData()])
  isLoading.value = false
})

const isTriggered = ref(false)
const { guessRef, onScrolltolower } = useGuessList()

const onRefresherrefresh = async () => {
  console.log('onRefresherrefresh')
  // 开启动画
  isTriggered.value = true
  // getHomeBannerData()
  // getCategoryData()
  // getHotData()
  // 加载数据
  // 重置猜你喜欢列表数据
  guessRef.value?.resetData()
  await Promise.allSettled([
    getHomeBannerData(),
    getCategoryData(),
    getHotData(),
    guessRef.value?.getmore(),
  ])
  // 关闭动画
  isTriggered.value = false
}
</script>

<template>
  <!-- 自定义导航栏 -->
  <custom-navbar />
  <scroll-view
    scroll-y
    class="scroll-view"
    :refresher-triggered="isTriggered"
    @scrolltolower="onScrolltolower"
    @refresherrefresh="onRefresherrefresh"
    refresher-enabled
  >
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <!-- 自定义轮播图 -->
      <XtxSwiper :data="bannerData" />
      <!-- 分类面板 -->
      <CategoryPanel :data="categoryData" />
      <!-- 热门推荐 -->
      <HotPanel :data="HotData" />
      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
//
page {
  background: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
</style>
