<template>
  <div id="app">
    <v-header>
    </v-header>
    <v-tab>
    </v-tab>
    <v-content>
    </v-content>
    <router-view/>
  </div>
</template>

<script>
import VHeader from '@/views/Header.vue';
import VTab from '@/views/Tab.vue';
import VContent from '@/views/Content.vue';

export default {
  name: 'App',
  components: {
    VHeader,
    VTab,
    VContent
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
