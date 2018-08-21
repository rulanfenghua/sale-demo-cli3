<template>
<div>
  <div class="goods" :style="{height: clientHeight+'px'}">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="(item,index) in goods" :key="index" :class="{'current':currentIndex===index}" @click="selectMenu(index)"
          ref="menuList">
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
            <li class="food-item border-1px" v-for="(food,index) in item.foods" :key="index" @click="selectFood(food)">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">
                    <span class="unit">￥</span>{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" @add="addFood"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods" ref="shopcart"></shopcart>
  </div>
  <food @add="addFood" :food="selectedFood" ref="food"></food>
</div>
</template>

<script>
import axios from 'axios';
import shopcart from '@/components/shopcart.vue';
import cartcontrol from '@/components/cartcontrol.vue';
import food from '@/components/food.vue';

export default {
  name: 'goods',
  components: {
    shopcart,
    cartcontrol,
    food
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
      scrollY: 0, // foodsWrapper的scrollTop
      scrollTop: 0, // 用来记录上一次的scrollY
      selectedFood: {},
      scroll: 0
    };
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    axios.get('/api/goods').then((response) => {
      response = response.data;
      if (response.errno === 0) {
        this.goods = response.data;
        // console.log(this.goods);
        this.$nextTick(() => {
          this.initScroll();
          this.calculateHeight();
        });
      }
    });
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        const height1 = this.listHeight[i];
        const height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
    },
    clientHeight() {
      return (document.documentElement.clientHeight || document.body.clientHeight) - 40;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  methods: {
    initScroll() {
      const that = this;
      this.$refs.foodsWrapper.addEventListener('scroll', that._scroll);
    },
    calculateHeight() {
      let foodList = this.$refs.foodList;
      let height = 0;
      // console.dir(foodList);
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index) {
      // console.log(index);
      this.$refs.foodsWrapper.scrollTop = this.listHeight[index];
    },
    selectFood(food) {
      this.selectedFood = food;
      this.$refs.food.show();
    },
    addFood(target) {
      this._drop(target);
    },
    _scroll() {
      let scroll = 0;
      // console.log('scrollTop:' + this.scrollTop);
      this.scrollY = this.$refs.foodsWrapper.scrollTop;
      // console.log(this.scrollY);
      scroll = this.$refs.foodsWrapper.scrollTop - this.scrollTop;
      this.scrollTop = this.$refs.foodsWrapper.scrollTop;
      // 应该用监听TouchEvent和WheelEvent的方法与点击滚动的onscroll监听事件区分开
      document.documentElement.scrollTop += scroll;
      document.body.scrollTop += scroll;
    },
    _drop(target) {
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    }
  }
};
</script>

<style scoped lang="scss">
  @import '@/design/index.scss';

  .goods {
    display: flex;
    position: relative;
    top: 0;
    padding-bottom: 46px;
    width: 100%;
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
        padding-bottom: 18px;
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
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }
</style>
