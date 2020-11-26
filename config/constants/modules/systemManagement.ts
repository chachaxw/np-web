import { SystemManageRoutes } from '../constants';

export default [
  {
    path: SystemManageRoutes.workbench,
    name: '工作台',
    icon: 'CodeSandboxOutlined',
    component: './Workbench',
  },
  {
    path: SystemManageRoutes.index,
    name: '系统管理',
    icon: 'WindowsOutlined',
    routes: [
      {
        path: SystemManageRoutes.permission,
        name: '权限管理',
        icon: 'WindowsOutlined',
        component: './System/Permission',
      },
      {
        path: SystemManageRoutes.user,
        name: '用户管理',
        icon: 'UserOutlined',
        component: './System',
      },
    ],
  },
];
