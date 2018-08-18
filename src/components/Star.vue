<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
  </div>
</template>

<script>
const LENGTH = 5;

export default {
  name: 'star',
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size;
    },
    itemClasses() {
      let result = [];
      // let score = Math.floor(this.score * 2) / 2;
      let integer = Math.floor(this.score);
      let decimal = this.score % 1;

      for (let i = 0; i < integer; i++) {
        result.push('on');
      }
      if (decimal >= 2 / 3) {
        result.push('on');
      } else if (decimal > 1 / 3 && decimal < 2 / 3) {
        result.push('half');
      }
      while (result.length < LENGTH) {
        result.push('off');
      }
      return result;
    }
  }
};
</script>

<style scoped lang="scss">
  @import '@/design/index.scss';

  .star {
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 100%;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          @include bg-image('star/star48_on');
        }
        &.half{
          @include bg-image('star/star48_half');
        }
        &.off{
          @include bg-image('star/star48_off');
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 100%;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          @include bg-image('star/star36_on');
        }
        &.half{
          @include bg-image('star/star36_half');
        }
        &.off{
          @include bg-image('star/star36_off');
        }
      }
    }
    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 100%;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          @include bg-image('star/star24_on');
        }
        &.half{
          @include bg-image('star/star24_half');
        }
        &.off{
          @include bg-image('star/star24_off');
        }
      }
    }
  }
</style>
