import { RequestConfig } from 'umi';
import { RequestOptionsInit } from 'umi-request';
import { isEmpty } from 'lodash';

import { getStorage } from '@/utils/utils';
import { LocalStorageKey } from '@/utils/constants';

import errorHandler from './middleware/errorHandle';
import loadingMiddleware from './middleware/loading';
import responseMiddleware from './middleware/response';

// requestInterceptor 请求拦截器
const requestInterceptor = (url: string, options: RequestOptionsInit) => {
  const authData = getStorage<any>(LocalStorageKey.APP_AUTH_STORE);

  if (!isEmpty(authData)) {
    // 请求头添加TOKEN
    Object.assign(options.headers, {
      Authorization: `${authData.token_type} ${authData.access_token}`,
    });
  } else {
    Object.assign(options.headers, { Authorization: process.env.REACT_APP_TOKEN });
  }

  return { url, options };
};

const requestPlugin: RequestConfig = {
  prefix: process.env.REACT_APP_API, // baseURL
  timeout: 30000,
  getResponse: true,
  middlewares: [loadingMiddleware, responseMiddleware],
  requestInterceptors: [requestInterceptor],
  errorHandler,
};

export default requestPlugin;
