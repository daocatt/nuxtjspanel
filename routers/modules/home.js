import dashboard from '../../components/Dashboard';

export default {
    path: '/dashboard',
    name: 'Dashboard',
    // hide: true,
    meta: {
      title: '控制面板',
      keepAlive: true,
      parentMenu: '/dashboard',
      auth: true,
      icon: 'building',
      index: '4-1'
    },
    component: dashboard,
}