<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div id="tab" class="border-1px">
      <router-link to="/goods">商品</router-link>
      <router-link to="/ratings">评论</router-link>
      <router-link to="/seller">商家</router-link>
    </div>
    <keep-alive>
    <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import VHeader from './views/header.vue';
import axios from 'axios';

export default {
  name: 'app',
  components: {
    VHeader
  },
  data() {
    return {
      seller: {}
    };
  },
  created() {
    if (process.env.NODE_ENV !== 'production') {
      axios.get('/api/seller').then((response) => {
      // console.log(response);
        response = response.data;
        if (response.errno === 0) {
          this.seller = response.data;
        }
      });
    } else {
      axios.get('resources/data.json').then((response) => {
        this.seller = response.data.seller;
      });
    }
  }
};
</script>

<style lang="scss">
  @import './design/index.scss';

  #app {
    #tab {
      @include border-1px( rgba(7, 17, 27, 0.1));
      position: sticky;
      top: 0;
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      background-color: #fff;
      z-index: 20;
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
