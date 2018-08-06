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
            <span class="icon" :class="iconClassMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="supports-count" v-if="seller.supports">
        <span class="count">{{seller.supports.length+'个'}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="title"></span>
      <span class="text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-header',
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
};
</script>

<style scoped lang="scss">
  @import '@/design/index.scss';

  .header {
    position: relative;
    color: #fff;
    background-color: rgba(7, 17, 27, 0.5);
    overflow: hidden;
    .content-wrapper {
      position: relative;
      // display: flex;
      padding: 24px 12px 18px 24px;
      .avatar {
        display: inline-block;
        img {
          border-radius: 2px;
        }
      }
      .content {
        display: inline-block;
        margin-left: 16px;
        .title {
          margin: 2px 0 8px;
          font-size: 16px;
          // display: flex;
          .brand {
            display: inline-block;
            vertical-align: top;
            width: 30px;
            height: 18px;
            @include bg-image('VHeader/brand');
            background-size: 30px 18px;
            background-repeat: no-repeat;
          }
          .name {
            vertical-align: top;
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
          }
        }
        .description {
          line-height: 12px;
          font-size: 12px;
          margin-bottom: 10px;
        }
        .supports {
          // display: flex;
          .icon {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: 12px;
            background-repeat: no-repeat;
            &.decrease{
              @include bg-image('VHeader/decrease_1');
            }
            &.discount{
              @include bg-image('VHeader/discount_1');
            }
            &.guarantee{
              @include bg-image('VHeader/guarantee_1');
            }
            &.invoice{
              @include bg-image('VHeader/invoice_1');
            }
            &.special{
              @include bg-image('VHeader/special_1');
            }
          }
          .text {
            vertical-align: top;
            line-height: 12px;
            font-size: 10px;
          }
        }
      }
      .supports-count {
        position: absolute;
        right: 12px;
        bottom: 18px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
        // display: flex;
        // align-items: center;
        .count{
          display: inline-block;
          font-size: 10px;
          vertical-align: middle;
        }
        i {
          display: inline-block;
          font-size: 10px;
          margin-left: 2px;
          vertical-align: middle;
        }
      }
    }
    .bulletin-wrapper {
      position: relative;
      height: 28px;
      line-height: 28px;
      background: rgba(7, 17, 27, 0.2);
      padding: 0 22px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .title {
          display: inline-block;
          width: 22px;
          height: 12px;
          @include bg-image('VHeader/bulletin');
          background-size: 22px 12px;
          background-repeat: no-repeat;
          vertical-align: middle;
      }
      .text {
        margin: 0 4px;
        font-size: 10px;
        vertical-align: middle;
      }
      i {
        position: absolute;
        font-size: 10px;
        right: 12px;
        bottom: 7px;
      }
    }
    .background {
      position: absolute;
      top: -74px;
      right: 0;
      width: 100%;
      // height: 100px;
      z-index: -1;
      filter: blur(10px);
    }
  }
</style>
