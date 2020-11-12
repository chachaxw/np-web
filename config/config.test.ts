import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env.REACT_APP_NAME': '测试环境',
    'process.env.REACT_APP_HOST': 'https://test.portal.github.com',
    'process.env.REACT_APP_API': 'https://test.api.github.com/api',
    'process.env.REACT_APP_DOMAIN': 'test.admin.github.com',
    'process.env.REACT_APP_TOKEN': 'Basic xxxxxxxxxxxxx',
  },
});
