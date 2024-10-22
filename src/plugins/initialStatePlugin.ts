import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { notification } from 'antd';
import { isEmpty } from 'lodash';

import { getStorage } from '@/utils/utils';
import { LocalStorageKey } from '@/utils/constants';
import { fetchUser } from '@/services/user';
import defaultSettings from '../../config/defaultSettings';

interface AsyncInitialStateResponse {
  settings?: LayoutSettings;
  currentUser?: any;
  fetchUserInfo: () => Promise<any>;
}

/**
 * NOTE: initialStatePlugin方法仅在项目初始化完成后执行一次
 *
 * 当前此方法用于注入layout配置、用户信息等全局初始数据
 */
async function initialStatePlugin(): Promise<AsyncInitialStateResponse> {
  // 获取本地存储的登录信息，如token, 用户id
  const authData = getStorage<any>(LocalStorageKey.APP_AUTH_STORE);

  const fetchUserInfo = async () => {
    try {
      if (isEmpty(authData)) {
        return undefined;
      }

      const { data: currentUser } = await fetchUser(authData.id);
      return currentUser;
    } catch (error) {
      notification.error({ message: '请求出错!', description: error?.data?.error });
    }

    return undefined;
  };

  return {
    fetchUserInfo,
    settings: defaultSettings,
    currentUser: await fetchUserInfo(),
  };
}

export default initialStatePlugin;
