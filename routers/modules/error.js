import errorComponent from '../../components/Error';

export default {
    path: '/error',
    name: 'Error',
    hide: true,
    meta: {
      title: '请求错误',
      keepAlive: true,
      parentMenu: '/dashboard',
      auth: true,
      icon: 'file_minus',
    },
    component: errorComponent,
}