import * as React from 'react';
import { BasicLayoutProps, Settings as LayoutSettings, MenuDataItem } from '@ant-design/pro-layout';
import { notification } from 'antd';
import { history, RequestConfig } from 'umi';
import { ResponseError } from 'umi-request';

import Header from '@/components/Header';
import { queryMenus } from '@/services/user';
import defaultSettings from '../config/defaultSettings';

interface InitialState {
  settings?: LayoutSettings;
  currentUser?: UserContext.BaseInfo;
  menus?: MenuDataItem[];
  fetchUserInfo: () => Optional<UserContext.BaseInfo>;
}

const fetchUserInfo = () => {
  try {
    return (JSON.parse(window.localStorage.getItem('app.user') || '') || undefined) as Optional<
      UserContext.BaseInfo
    >;
  } catch (error) {
    return undefined;
  }
};

/**
 * 应用初始化数据
 */
export async function getInitialState(): Promise<InitialState> {
  const currentUser = fetchUserInfo();
  // 如果用户登录了, 则获取菜单信息
  let menus: MenuDataItem[] = [];
  if (currentUser) {
    menus = (await queryMenus()).data;
  }
  return {
    fetchUserInfo,
    currentUser,
    menus,
    settings: defaultSettings,
  };
}

const findMatchRouteName = (path: string, routes: any[]): Optional<string> => {
  let matchRouteName: Optional<string>;
  routes.forEach((route) => {
    if (matchRouteName) {
      return;
    }
    if (route.path === path) {
      matchRouteName = route.name;
      return;
    }
    if (route.children) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      matchRouteName = findMatchRouteName(path, route.children);
    }
  });

  return matchRouteName;
};

/**
 * 布局配置
 */
export const layout = ({ initialState }: { initialState: InitialState }): BasicLayoutProps => {
  return {
    locale: 'zh-CN',
    headerRender: () => <Header enableRightContent />,
    headerHeight: 65,
    disableContentMargin: false,
    footerRender: () => undefined,
    formatMessage(message) {
      return message.description || message.defaultMessage || '程序出现错误';
    },
    onPageChange: () => {
      const { currentUser } = initialState;
      // 如果没有登录，重定向到 login
      if (!currentUser && !String(history.location.pathname).startsWith('/login')) {
        history.push('/login');
      }
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
  } as BasicLayoutProps;
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

/**
 * 请求配置
 */
export const request: RequestConfig = {
  errorHandler,
  // 设置请求时携带token
  requestInterceptors: [
    (url, options) => {
      const userInfo = fetchUserInfo();

      if (!userInfo?.accessToken) {
        return { url, options };
      }

      return {
        url,
        options: {
          ...options,
          interceptors: true,
          headers: {
            ...(options.headers || {}),
            Authorization: userInfo.accessToken,
          },
        },
      };
    },
  ],
  data: '',
};
