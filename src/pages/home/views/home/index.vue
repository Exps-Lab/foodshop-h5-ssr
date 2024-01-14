<template>
  <div class="main-content">
    <ClientOnly>
      <MainHeader />
      <template #placeholder>###定位功能在ssr时暂不可用###</template>
    </ClientOnly>
    <KingKongSuggest />
    <ComList :filter="ComListFilter" />
    <FooterBeian />
  </div>
  <Tabbar :active="0" />
</template>

<script setup>
import ClientOnly from '@duannx/vue-client-only'
import MainHeader from './components/header.vue'
import Tabbar from '@common/components/Tab_Bar/index.vue'
import KingKongSuggest from './components/king_kong_suggest.vue'
import FooterBeian from './components/footer_beian.vue'
import ComList from '@common/components/Com_List/index.vue'
import { defineOptions } from 'vue'
import { homeStore } from '@/pages/home/store/home.js'

defineOptions({
  asyncData: async (store) => {
    await homeStore(store).getSuggestData()
  }
})

const ComListFilter = {
  distance: 1
}
</script>

<style lang="less" scoped>
  .main-content {
    background-color: rgb(245, 245, 246);
    padding-bottom: 60px;
  }
</style>
