import React from 'react';
import { history } from 'umi';
import { BasicLayoutProps } from '@ant-design/pro-layout';

import { RightContent, Footer } from '@/components';
import { AppRoutes } from '../../config/routes/constants';
import { InitialState } from './typed';

const noAuthRoutes = [AppRoutes.Login, AppRoutes.ForgetPassword, AppRoutes.Register];

const layoutPlugin = ({ initialState }: { initialState: InitialState }): BasicLayoutProps => {
  return {
    logo: '/images/logo.svg',
    siderWidth: 208,
    headerHeight: 60,
    disableContentMargin: false,
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    onMenuHeaderClick: () => {
      history.push(AppRoutes.Workbench);
    },
    onPageChange: () => {
      const { location } = history;

      if (initialState) {
        const { currentUser } = initialState;

        // 如果用户已登录，并且路由属于noAuthRoutes数组中的，重定向到首页
        if (currentUser?.id && noAuthRoutes.includes(location.pathname)) {
          history.replace(AppRoutes.Workbench);
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
