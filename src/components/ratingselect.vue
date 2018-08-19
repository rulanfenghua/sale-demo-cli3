<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" @click="select(2)" :class="{'activ': selectType===2}">
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" @click="select(0)" :class="{'activ': selectType===0}">
        {{desc.positive}}
        <span class="count">{{positive.length}}</span>
      </span>
      <span class="block negative" @click="select(1)" :class="{'activ': selectType===1}">
        {{desc.negative}}
        <span class="count">{{negative.length}}</span>
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
</style>
