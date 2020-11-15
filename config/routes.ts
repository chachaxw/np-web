import { AppRoutes, SystemManagement } from './constants';

export default [
  {
    path: AppRoutes.Login,
    layout: false,
    component: './Login',
  },
  {
    path: AppRoutes.ResetPassword,
    layout: false,
    component: './Login/ResetPassword',
  },
  {
    path: AppRoutes.Register,
    layout: false,
    component: './Login/Register',
  },
  {
    path: AppRoutes.Portal,
    name: '集成门户',
    layout: {
      hideMenu: true,
    },
    component: './Portal',
  },
  {
    path: AppRoutes.Workbench,
    name: '工作台',
    icon: 'CodeSandboxOutlined',
    component: './Workbench',
  },
  ...SystemManagement,
  {
    path: '/',
    redirect: AppRoutes.Workbench,
  },
  {
    component: './ErrorPage/404',
  },
];
