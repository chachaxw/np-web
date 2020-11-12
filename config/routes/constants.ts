// 基础路由
export const AppRoutes = {
  Login: '/login', // 登陆
  Portal: '/portal', // 门户
  Register: '/register', // 注册
  Workbench: '/workbench', // 工作台
  ForgetPassword: '/forget-password', // 忘记密码
  MonitorCenter: '/monitor-center', // 监控大屏
};

// 系统管理平台
export const SystemRoutes = {
  index: '/system-manage',
  permission: '/system-manage/permission',
  createPermission: '/system-manage/permission/create', // 创建权限
  updatePermission: '/system-manage/permission/update', // 更新权限
  detailPermission: '/system-manage/permission/detail', // 权限详情
};
