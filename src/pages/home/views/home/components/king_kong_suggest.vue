<template>
  <div class="category-container" v-loading="ssrData.loading">
    <section
      class="box"
      v-for="item in ssrData.suggestData"
      :key="item.category_id"
      @click="toCategoryPage(item)">
      <img class="img" :src="item.image_url" alt="categoryAvatar">
      <span class="name">{{item.name}}</span>
    </section>
    <section v-if="!ssrData.suggestData.length && !ssrData.loading" class="box no-data">暂无分类</section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { homeStore } from '@/pages/home/store/home.js'

const router = useRouter()
const { ssrData } = homeStore()

const toCategoryPage = (data) => {
  const { name, id } = data
  router.push({
    path: '/home/shopTopic',
    query: {
      categoryId: id,
      categoryName: name
    }
  })
}
</script>

<style lang="less" scoped>
  .category-container {
    padding: 4px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    min-height: 150px;
    .box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 54px;
      padding: 8px 0;
      flex-basis: 25%;
      font-family: PingFangSC-Regular, PingFang SC;
      &.no-data {
        font-size: 14px;
        color: @text-3;
        flex-basis: 100%;
      }
      .img {
        width: 36px;
        margin-bottom: 4px;
      }
      .name {
        font-size: 12px;
      }
    }
  }
</style>
