<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div id="tab" class="border-1px">
      <router-link to="/goods">商品</router-link>
      <router-link to="/rating">评论</router-link>
      <router-link to="/seller">商家</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import VHeader from './views/VHeader.vue';
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
    axios.get('/api/seller').then((response) => {
      // console.log(response);
      response = response.data;
      if (response.errno === 0) {
        this.seller = response.data;
      }
    });
  }
};
</script>

<style lang="scss">
  @import './design/index.scss';

  #app {
    #tab {
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      @include border-1px( rgba(7, 17, 27, 0.1));
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
