import dashboard from '../../pages/dashboard';
import setting from '../../components/Setting';
import system from '../../components/System';

export default {
  path: '/setting',
  component: dashboard, // Parent router-view
  name: 'Setting',
  meta: { title: '设置', icon: 'settings_future' },
  redirect: '/setting/index',
  children: [
    {
      path: '/setting/index',
      component: setting,
      name: 'SettingIndex',
      meta: {
        keepAlive: true,
        title: '系统设置',
        parentMenu: '/setting',
        icon: 'slider_02'
      }
    },
    {
      path: '/setting/system',
      component: system,
      name: 'SettingSystem',
      meta: {
        keepAlive: true,
        title: '系统信息',
        parentMenu: '/setting',
        icon: 'credit_card_alt'
      }
    },
  ]
};
