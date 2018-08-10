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
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="supports-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length+'个'}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="title"></span>
      <span class="text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <transition>
    <div class="detail" v-if="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <star :size="48" :score="seller.score"></star>
          <div class="title">
            <div class="line border-1px"></div>
            <div class="text">优惠信息</div>
            <div class="line border-1px"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line border-1px"></div>
            <div class="text">公司信息</div>
            <div class="line border-1px"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import star from '@/components/Star.vue';

export default {
  name: 'v-header',
  components: {
    star
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    };
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
};
</script>

<style scoped lang="scss">
  @import '@/design/index.scss';

  .header {
    position: relative;
    width: 100%;
    color: #fff;
    background-color: rgba(7, 17, 27, 0.5);
    overflow: hidden;
    .content-wrapper {
      position: relative;
      display: flex;
      font-size: 0;
      padding: 24px 12px 18px 24px;
      .avatar {
        img {
          border-radius: 2px;
        }
      }
      .content {
        margin-left: 16px;
        .title {
          font-size: 0;
          margin: 2px 0 8px;
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
          font-size: 0;
          .icon {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: 12px;
            background-repeat: no-repeat;
            &.decrease {
              @include bg-image('VHeader/decrease_1');
            }
            &.discount {
              @include bg-image('VHeader/discount_1');
            }
            &.guarantee {
              @include bg-image('VHeader/guarantee_1');
            }
            &.invoice {
              @include bg-image('VHeader/invoice_1');
            }
            &.special {
              @include bg-image('VHeader/special_1');
            }
          }
          .text {
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
        font-size: 0;
        border-radius: 14px;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
        .count {
          font-size: 10px;
          vertical-align: middle;
        }
        .icon-keyboard_arrow_right {
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
      }
      .icon-keyboard_arrow_right {
        position: absolute;
        font-size: 10px;
        right: 12px;
        bottom: 8px;
      }
    }
    .background {
      position: absolute;
      top: -20%;
      right: 0;
      width: 100%;
      z-index: -1;
      filter: blur(10px);
    }
    .detail {
      top: 0;
      right: 0;
      position: fixed;
      z-index: 1000;
      width: 100%;
      height: 100%;
      overflow: auto;
      background: rgba(7, 17, 27, 0.8);
      &.v-enter-active, &.v-leave-active {
        transition: all .5s ease;
      }
      &.v-enter, &.v-leave-to {
        transform: translateY(10px);
        opacity: 0;
      }
      .detail-wrapper {
        min-height: 100%;
        display: flex;
        flex-direction: column;
        width: 100%;
        font-size: 0;
        .detail-main {
          flex: 1;
          padding-top: 64px;
          .name {
            text-align: center;
            font-size: 16px;
            line-height: 16px;
            font-weight: 700;
          }
          .star {
            margin-top: 18px;
            padding: 2px 0;
            text-align: center;
          }
          .title {
            display: flex;
            width: 80%;
            margin: 30px auto 24px;
            .line {
              flex: 1;
              position: relative;
              @include border-1px(rgba(255, 255, 255, 0.2));
              top: -6px;
            }
            .text {
              padding: 0 12px;
              line-height: 14px;
              font-size: 14px;
              font-weight: 700;
            }
          }
          .supports {
            width: 80%;
            margin: 0 auto;
            .support-item {
              padding: 0 12px;
              margin-bottom: 12px;
              font-size: 0;
              &:last-child {
                margin-bottom: 0;
              }
              .icon {
                display: inline-block;
                width: 16px;
                height: 16px;
                vertical-align: top;
                background-size: 16px;
                background-repeat: no-repeat;
                &.decrease {
                  @include bg-image('VHeader/decrease_2');
                }
                &.discount {
                  @include bg-image('VHeader/discount_2');
                }
                &.guarantee {
                  @include bg-image('VHeader/guarantee_2');
                }
                &.invoice {
                  @include bg-image('VHeader/invoice_2');
                }
                &.special {
                  @include bg-image('VHeader/special_2');
                }
              }
              .text {
                margin-left: 6px;
                font-size: 12px;
                line-height: 16px;
              }
            }
          }
          .bulletin {
            width: 80%;
            margin: 0 auto;
            .content {
              padding: 0 12px;
              line-height: 24px;
              font-size: 12px;
            }
          }
        }
        .detail-close {
          width: 32px;
          height: 32px;
          margin: 0 auto 32px;
          clear: both;
          font-size: 32px;
        }
      }
    }
  }
</style>
