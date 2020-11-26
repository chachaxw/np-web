import { Settings as LayoutSettings } from '@ant-design/pro-layout';

export default {
  title: '紫晶 . 盘古信息化生态',
  navTheme: 'light',
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: false,
  },
  pwa: false,
  // proxy: proxy[REACT_APP_ENV || 'dev'],
  iconfontUrl: '',
} as LayoutSettings & {
  pwa: boolean;
};
