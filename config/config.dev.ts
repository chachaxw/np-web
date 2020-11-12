import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env.REACT_APP_NAME': '开发环境',
    'process.env.REACT_APP_HOST': 'https://dev.portal.github.com',
    'process.env.REACT_APP_API': 'https://development.api.github.com/api',
    'process.env.REACT_APP_DOMAIN': 'dev.admin.github.com',
    'process.env.REACT_APP_TOKEN': 'Basic xxxxxxxxxxxxx',
  },
});
