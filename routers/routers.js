

import dashboard from '../pages/dashboard';
import login from '../pages/login';
import logout from '../pages/logout';

import home from './modules/home';
import about from './modules/about';
import setting from './modules/setting';
import error from './modules/error';



export default [
  {
    path: '/',
    component: dashboard,
    redirect: '/dashboard',
    name: 'Soda',
    id:'dashboard',
    meta: {
      title: '控制面板',
      auth: false,
    },
    children: [home,about,setting,error]
  },
  {
    path: '/login',
    name: 'Login',
    hide: true,
    meta: {
      title: 'Login'
    },
    component: login
  },
  {
    path: '/logout',
    name: 'Logout',
    hide: true,
    meta: {
      title: 'Logout'
    },
    component: logout
  },
];
