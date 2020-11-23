import React from 'react';
import { history } from 'umi';
import { BasicLayoutProps } from '@ant-design/pro-layout';

import { RightContent, Footer } from '@/components';
import { AppRoutes } from '../../config/constants';
import { InitialState } from './typed';

// 无需登录就可访问的页面白名单
const noAuthRoutes = [AppRoutes.Login, AppRoutes.ResetPassword, AppRoutes.Register];

const layoutPlugin = ({ initialState }: { initialState: InitialState }): BasicLayoutProps => {
  return {
    siderWidth: 240,
    headerHeight: 56,
    disableContentMargin: false,
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    onMenuHeaderClick: () => {
      history.push(AppRoutes.Portal);
    },
    onPageChange: () => {
      const { location } = history;

      console.log('初始数据', initialState);

      if (initialState?.currentUser) {
        const { currentUser } = initialState;

        // 如果用户已登录，并且路由属于noAuthRoutes数组中的，重定向到首页
        if (currentUser?.id && noAuthRoutes.includes(location.pathname)) {
          history.replace(AppRoutes.Portal);
        }
      }

      if (
        !initialState ||
        (initialState && !initialState.currentUser && !noAuthRoutes.includes(location.pathname))
      ) {
        history.replace(AppRoutes.Login);
      }
    },
    ...initialState?.settings,
  };
};

export default layoutPlugin;
