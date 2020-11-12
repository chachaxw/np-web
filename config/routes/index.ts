import systemManagement from './modules/systemManagement';

import { AppRoutes } from './constants';

export default [
  {
    path: AppRoutes.Login,
    layout: false,
    component: './Login',
  },
  ...systemManagement,
  {
    path: '/',
    redirect: AppRoutes.Workbench,
  },
  {
    component: './ErrorPage/404',
  },
];
