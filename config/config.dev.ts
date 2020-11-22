import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env.REACT_APP_NAME': '开发环境',
    'process.env.REACT_APP_HOST': 'https://dev.github.com',
    'process.env.REACT_APP_API': ' http://localhost:8000/api',
    'process.env.REACT_APP_DOMAIN': 'dev.admin.github.com',
    'process.env.REACT_APP_TOKEN': 'Basic xxxxxxxxxxxxx',
  },
});
