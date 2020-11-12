import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env.REACT_APP_NAME': '预发布环境',
    'process.env.REACT_APP_HOST': 'https://stg.portal.github.com',
    'process.env.REACT_APP_API': 'https://staging.api.github.com/api',
    'process.env.REACT_APP_DOMAIN': 'staging.admin.github.com',
    'process.env.REACT_APP_TOKEN': 'Basic xxxxxxxxxxxxx',
  },
});
