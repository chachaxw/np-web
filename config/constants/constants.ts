// 基础路由
export const AppRoutes = {
  Login: '/login', // 登陆
  Portal: '/portal', // 门户
  Register: '/login/register', // 注册
  ResetPassword: '/login/reset-password', // 忘记密码
};

// 系统管理平台
export const SystemManageRoutes = {
  index: '/system',
  workbench: '/system/workbench', // 工作台
  systemManage: '/system/system-manage', // 系统管理
  permission: '/system/system-manage/permission',
  user: '/system/system-manage/user',
};
