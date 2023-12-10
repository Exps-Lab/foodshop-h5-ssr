<template>
  <div class="main-content">
    <MainHeader />
    <KingKongSuggest />
    <ComList :filter="ComListFilter" />
    <FooterBeian />
  </div>
  <Tabbar :active="0" />
</template>

<script setup>
import MainHeader from './components/header.vue'
import Tabbar from '@common/components/Tab_Bar/index.vue'
import KingKongSuggest from './components/king_kong_suggest.vue'
import FooterBeian from './components/footer_beian.vue'
import ComList from '@common/components/Com_List/index.vue'
import { defineOptions } from 'vue'

// const collectAsync = () => {
//   const componentsArr = [MainHeader, Tabbar, KingKongSuggest, FooterBeian, ComList]
//   return componentsArr.reduce((asyncArr, component) => {
//     if (component.asyncData && component.asyncData.constructor === Function) {
//       asyncArr.push(component.asyncData)
//     }
//     return asyncArr
//   }, [])
// }
// collectAsync()

defineOptions({
  asyncData: async (store) => {
    await store._s.get('homeStore').getSuggestData()
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
