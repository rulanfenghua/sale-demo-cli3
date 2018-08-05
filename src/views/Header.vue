<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar"><img :src="seller.avatar" width="64" height="64"></div>
      <!-- <div class="content">
        <div class="title">
          <div class="band"></div>
          <div class="name">{{seller.name}}</div>
        </div>
        <div class="description">{{seller.description+' / '+seller.deliveryTime+'分钟送达'}}</div>
        <div class="supports" v-if="seller.supports">
          <div class="supports_desc">
            <span class="icon" :class="iconClassMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
      </div>
      <div class="supports-count" v-if="seller.supports" @click="showDetails()">
        <span class="count"></span>
        <i class="icon-keyboard_arrow_right"></i>
      </div> -->
    </div>
    <div class="bulletin-wrapper"></div>
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
</style>
