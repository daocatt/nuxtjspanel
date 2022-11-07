import Vue from 'vue';
import Router from 'vue-router';
import routes from './routers/routers';


Vue.use(Router);

export function createRouter() {
  
  const router = new Router({
    routes,
    base: '/',
    mode: 'hash'
  });

  
  
  router.beforeEach((to, from, next) => {

    // 此处为初始化router，具体判断在plugins/router.js
    next();

  });
  
  router.afterEach((to) => {
    // window.scrollTo(0, 0)
    if (to.meta.title) {
        document.title = to.meta.title + ' - powered by soda';
    }
  });
  
  return router;

}



