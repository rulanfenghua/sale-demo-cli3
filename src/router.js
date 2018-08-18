import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: () => import(/* webpackChunkName: "goods" */ './views/goods.vue')
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: () => import(/* webpackChunkName: "rating" */ './views/ratings.vue')
    },
    {
      path: '/seller',
      name: 'seller',
      component: () => import(/* webpackChunkName: "seller" */ './views/seller.vue')
    }
  ]
});
