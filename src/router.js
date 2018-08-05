import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: () => import(/* webpackChunkName: "goods" */ './views/Goods.vue')
    },
    {
      path: '/rating',
      name: 'rating',
      component: () => import(/* webpackChunkName: "rating" */ './views/Rating.vue')
    },
    {
      path: '/seller',
      name: 'seller',
      component: () => import(/* webpackChunkName: "seller" */ './views/Seller.vue')
    }
  ]
});
