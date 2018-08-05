<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description+'/'+seller.deliveryTime+'分钟送达'}}</div>
        <div class="supports" v-if="seller.supports">
            <span class="icon"></span>
            <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <!-- <div class="supports-count" v-if="seller.supports">
        <span class="count"></span>
        <i class="icon-keyboard_arrow_right"></i>
      </div> -->
    </div>
    <!-- <div class="bulletin-wrapper" @click="showDetails()">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'v-header',
  props: {
    seller: {
      type: Object
    }
  }
};
</script>

<style scoped lang="scss">
  @import '@/design/index.scss';

  .header {
    color: #fff;
    background-color: rgba(7, 17, 27, 0.5);
    overflow: hidden;
    .content-wrapper {
      display: flex;
      padding: 24px 12px 18px 24px;
      font-size: 12px;
      .avatar {
        img {
          border-radius: 2px;
        }
      }
      .content {
        margin-left: 16px;
        .title {
          margin: 2px 0 8px;
          font-size: 16px;
          .brand {
            display: inline-block;
            width: 30px;
            height: 18px;
            @include bg-image('VHeader/brand');
          }
        }
      }
    }
  }
</style>
