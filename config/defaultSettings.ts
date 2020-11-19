import { Settings as LayoutSettings } from '@ant-design/pro-layout';

export default {
  navTheme: 'light',
  // 拂晓蓝
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
  title: '紫晶 . 盘古信息化生态',
  iconfontUrl: '',
} as LayoutSettings & {
  pwa: boolean;
};
