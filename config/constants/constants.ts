// 基础路由
export const AppRoutes = {
  Login: '/login', // 登陆
  Portal: '/portal', // 门户
  Workbench: '/workbench', // 工作台
  Register: '/login/register', // 注册
  ResetPassword: '/login/reset-password', // 忘记密码
};

// 系统管理平台
export const SystemManageRoutes = {
  index: '/system-manage',
  permission: '/system-manage/permission',
  createPermission: '/system-manage/permission/create', // 创建权限
  updatePermission: '/system-manage/permission/update', // 更新权限
  detailPermission: '/system-manage/permission/detail', // 权限详情
};
