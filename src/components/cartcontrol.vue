<template>
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'cartcontrol',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart() {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    },
    decreaseCart() {
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.cartcontrol {
  font-size: 0;
  .cart-decrease {
    display: inline-block;
    padding: 6px;
    opacity: 1;
    .inner {
      display: inline-block;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
}
</style>
