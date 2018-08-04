import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: () => import(/* webpackChunkName: "goods" */ './views/Tab/Goods.vue')
    },
    {
      path: '/rating',
      name: 'rating',
      component: () => import(/* webpackChunkName: "rating" */ './views/Tab/Rating.vue')
    },
    {
      path: '/seller',
      name: 'seller',
      component: () => import(/* webpackChunkName: "seller" */ './views/Tab/Seller.vue')
    }
  ]
});
