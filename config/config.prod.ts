import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env.REACT_APP_NAME': '生产环境',
    'process.env.REACT_APP_HOST': 'https://portal.github.com',
    'process.env.REACT_APP_API': 'https://api.github.com/api',
    'process.env.REACT_APP_DOMAIN': 'test.admin.github.com',
    'process.env.REACT_APP_TOKEN': 'Basic UFlpWGJtOWRpTUp5YnJoTjptamtCQWFwdGs5UE1qaXlw',
  },
});
