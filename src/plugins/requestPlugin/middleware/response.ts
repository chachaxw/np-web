import { Context } from 'umi-request';

const responseHeaders = {
  'x-pagination-total-count': 'total',
};

// 后端响应数据处理中间件
const responseMiddleware = async (ctx: Context, next: () => void) => {
  await next();

  // 读取响应头数据
  const target = {};
  const { data, response } = ctx.res;

  Object.keys(responseHeaders).forEach((key) => {
    const val = response.headers.get(key);

    if (val) {
      target[responseHeaders[key]] = Number(val);
    }
  });

  if (Object.keys(target).length > 0) {
    ctx.res.data = { data, ...target };
  }
};

export default responseMiddleware;
