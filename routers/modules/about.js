import dashboard from '../../pages/dashboard';
import about from '../../components/About';
import version from '../../components/Version';

export default {
  path: '/about',
  component: dashboard, // Parent router-view
  name: 'About',
  meta: { title: '关于', icon: 'message_circle' },
  redirect: '/about/index',
  children: [
    {
      path: '/about/index',
      component: about,
      name: 'AboutIndex',
      meta: {
        keepAlive: true,
        title: '简介',
        parentMenu: '/about',
        icon: 'list_checklist_alt'
      }
    },
    {
      path: '/about/version',
      component: version,
      name: 'AboutVersion',
      meta: {
        keepAlive: true,
        title: '版本',
        parentMenu: '/about',
        icon: 'color'
      }
    },
  ]
};
