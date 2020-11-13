/**
 * 全局常量配置文件，主要是放全局通用的常量配置，非全局的常量需配置在相应的模块目录下，禁止添加到该文件中!!!
 */

// 全局权限枚举
export enum Permission {
  Process = 'PROCESS',
  Admin = 'ROLE-ADMIN',
}

// localStorage 本地存储 key 值
export const LocalStorageKey = {
  APP_AUTH_STORE: 'CTI-ADMIN-AUTH',
  APP_ACCOUNT_STORE: 'CTI-ADMIN-ACCOUNT',
  APP_HUB_STORE: 'CTI-ADMIN-HUB',
};
