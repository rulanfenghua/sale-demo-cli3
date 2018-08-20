<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" @click="select(2)" :class="{'active': selectType===2}">
        <span>{{desc.all}}</span>
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" @click="select(0)" :class="{'active': selectType===0}">
        <span>{{desc.positive}}</span>
        <span class="count">{{positives.length}}</span>
      </span>
      <span class="block negative" @click="select(1)" :class="{'active': selectType===1}">
        <span>{{desc.negative}}</span>
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch" @click="toggleContent" :class="{'on': onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ratingselect',
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: 2
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === 0;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === 1;
      });
    }
  },
  methods: {
    select(type) {
      this.$emit('select', type);
    },
    toggleContent() {
      this.$emit('toggle');
    }
  }
};
</script>

<style scoped lang="scss">
  @import '@/design/index.scss';

  .ratingselect {
    .rating-type {
      @include border-1px(rgba(7, 17, 27, 0.1));
      padding: 18px 0;
      margin: 0 18px;
      font-size: 0;
      .block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        line-height: 16px;
        border-radius: 1px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        &.active {
          color: #fff;
        }
        .count {
          margin-left: 2px;
          font-size: 8px;
        }
        &.positive {
          background-color: rgba(0, 160, 220, 0.2);
          &.active {
            background-color: rgb(0, 160, 220);
          }
        }
        &.negative {
          background-color: rgba(77, 85, 93, 0.2);
          &.active {
            background-color: rgb(77, 85, 93);
          }
        }
      }
    }
    .switch {
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      color: rgb(147, 153, 159);
      font-size: 0;
      &.on {
        .icon-check_circle {
          color: #00c850;
        }
      }
      .icon-check_circle {
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size: 24px;
      }
      .text {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
      }
    }
  }
</style>
