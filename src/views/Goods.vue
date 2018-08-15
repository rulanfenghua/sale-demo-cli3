<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="(item,index) in goods" :key="index" :class="{'current':currentIndex===index}" @click="selectMenu(index)" ref="menuList">
          <span class="text border-1px">
            <span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="food-list" v-for="(item,index) in goods" :key="index" ref="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item" v-for="(food,index) in item.foods" :key="index">
              <div class="icon"><img :src="food.icon" alt=""></div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now"><span class="unit">￥</span>{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" ref="shopcart"></shopcart>
  </div>
</template>

<script>
import axios from 'axios';
import shopcart from '@/components/shopcart.vue';
import cartcontrol from '@/components/cartcontrol.vue';

export default {
  name: 'goods',
  components: {
    shopcart,
    cartcontrol
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    };
  },
  computed: {
    currentIndex() {
      for (let index = 0; index < this.listHeight.length; index++) {
        const height1 = this.listHeight[index];
        const height2 = this.listHeight[index + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return index;
        }
      }
    }
  },
  created() {
    axios.get('/api/goods').then((response) => {
      response = response.data;
      if (response.errno === 0) {
        this.goods = response.data;
        // console.log(this.goods);
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    });
  },
  methods: {
    selectMenu(index) {
      // console.log(index);
      this.$refs.foodsWrapper.scrollTop = this.listHeight[index];
    },
    _initScroll() {
      this.$refs.foodsWrapper.addEventListener('scroll', () => {
        this.scrollY = this.$refs.foodsWrapper.scrollTop;
        // console.log(this.scrollY);
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodList;
      let height = 0;
      // console.dir(foodList);
      this.listHeight.push(height);
      for (let index = 0; index < foodList.length; index++) {
        const item = foodList[index];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  }
};
</script>

<style scoped lang="scss">
  @import '@/design/index.scss';

  .goods {
    display: flex;
    position: fixed;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: auto;
    .menu-wrapper {
      flex: 0 0 80px;
      background-color: #f3f5f7;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
      .menu-item {
        display: table;
        height: 54px;
        width: 80px;
        line-height: 14px;
        padding: 0 12px;
        &.current {
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background-color: #fff;
          font-weight: 700;
          .text {
            &:after {
              display: none;
            }
          }
        }
        .text {
          .icon {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: -2px;
            background-size: 12px;
            background-repeat: no-repeat;
            &.decrease {
              @include bg-image('goods/decrease_3');
            }
            &.discount {
              @include bg-image('goods/discount_3');
            }
            &.guarantee {
              @include bg-image('goods/guarantee_3');
            }
            &.invoice {
              @include bg-image('goods/invoice_3');
            }
            &.special {
              @include bg-image('goods/special_3');
            }
          }
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          font-size: 12px;
          @include border-1px(rgba(7, 17, 27, 0.1));
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
      .title {
        position: sticky;
        top: 0;
        z-index: 10;
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 18px;
        @include border-1px(rgba(7,17,27,0.1));
        &:last-child {
          &:after {
            display: none;
          }
          margin-bottom: 0;
        }
        .icon {
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content {
          flex: 1;
          .name {
            margin: 2px 0 8px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .desc, .extra {
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .desc {
            margin-bottom: 8px;
          }
          .extra {
            .count {
              margin-right: 12px;
            }
          }
          .price {
            font-weight: 700;
            line-height: 24px;
            .now {
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old {
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
        }
      }
    }
  }
</style>
