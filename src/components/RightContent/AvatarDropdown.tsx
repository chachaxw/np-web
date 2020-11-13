import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { Avatar, Menu } from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';

import { LocalStorageKey } from '@/utils/constants';
import { removeStorage } from '@/utils/utils';
import HeaderDropdown from '../HeaderDropdown';
import { AppRoutes } from '../../../config/constants/constants';
import styles from './index.less';

export interface GlobalHeaderRightProps {
  menu?: boolean;
}

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  const { query, pathname } = history.location;
  const { redirect } = query;

  // 清空localStorage账号数据
  removeStorage(LocalStorageKey.APP_AUTH_STORE);

  if (window.location.pathname !== AppRoutes.Login && !redirect) {
    history.replace({
      pathname: AppRoutes.Login,
      search: stringify({ redirect: pathname }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const { key } = event;

      if (key === 'logout' && initialState) {
        setInitialState({ ...initialState, currentUser: undefined });
        loginOut();
        return;
      }

      if (key === 'portal') {
        history.push(AppRoutes.Portal);
        return;
      }

      history.push(`/account/${key}`);
    },
    [],
  );

  if (!initialState) {
    return null;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return null;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown} arrow placement="topCenter">
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          icon={<UserOutlined />}
          src={currentUser.avatar}
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{currentUser.name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
