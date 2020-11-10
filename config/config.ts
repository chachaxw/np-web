// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'Ant Design Pro',
    locale: true,
    ...defaultSettings,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/login',
      layout: false,
      routes: [
        {
          name: 'register',
          path: '/login/register',
          component: './login/register',
        },
        {
          name: 'reset',
          path: '/login/resetPassword',
          component: './login/resetPassword',
        },
        {
          name: 'login',
          path: '/login',
          component: './login',
        },
      ],
    },
    {
      path: '/',
      name: '工作台',
      component: './workbench',
    },
    {
      path: '/system',
      layout: false,
      component: './system',
    },
    {
      path: '/systemManagement',
      routes: [
        {
          path: '/systemManagement/permission',
          component: './permission',
        },
        {
          name: '基本信息',
          path: '/systemManagement/permission/create',
          component: './permission/create',
        },
        {
          path: '/systemManagement/permission/update',
          component: './permission/update',
        },
        {
          path: '/systemManagement/permission/detail',
          component: './permission/detail',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  // proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
