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
    layout: {
      hideMenu: true,
    },
    component: './Portal',
  },
  ...SystemManagement,
  {
    path: '/',
    redirect: AppRoutes.Portal,
  },
  {
    component: './ErrorPage/404',
  },
];
