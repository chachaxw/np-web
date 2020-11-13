import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import { Context } from 'umi-request';

let requestCount = 0;

export const showLoading = () => {
  if (requestCount === 0) {
    const dom = document.createElement('div');
    dom.setAttribute('id', 'loading');
    document.body.appendChild(dom);
    ReactDOM.render(<Spin indicator={<LoadingOutlined spin />} size="large" />, dom);
  }

  requestCount += 1;
};

export const hideLoading = () => {
  requestCount -= 1;

  if (requestCount === 0) {
    document.body.removeChild(document.getElementById('loading') as HTMLElement);
  }
};

// 全局loading中间件
const loadingMiddleware = async (ctx: Context, next: () => void) => {
  const {
    req: {
      options: { params, data, headers },
    },
  } = ctx;

  if ((params as any)?.loading || data?.loading) {
    if (params) {
      Reflect.deleteProperty(params, 'loading');
    }
    if (data) {
      Reflect.deleteProperty(data, 'loading');
    }

    Object.assign(headers, { 'x-request-loading': true });

    showLoading();
  }

  await next();

  if (headers?.['x-request-loading']) {
    hideLoading();
  }
};

export default loadingMiddleware;
