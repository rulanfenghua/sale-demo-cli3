<template>
  <div id="app">
    <v-header></v-header>
    <div id="tab">
      <router-link to="/goods">商品</router-link>
      <router-link to="/rating">评论</router-link>
      <router-link to="/seller">商家</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import VHeader from '@/views/Header.vue';

export default {
  name: 'app',
  components: {
    VHeader
  }
};
</script>

<style lang="scss">
  #app {
    #tab {
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border: 1px rgba(7, 17, 27, 0.1);
      a {
        flex: 1;
        text-align: center;
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.router-link-active {
          font-size: 14px;
          color: rgb(240, 20, 20);
        }
      }
    }
  }
</style>
