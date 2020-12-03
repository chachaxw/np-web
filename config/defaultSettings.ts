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
  disableContentMargin: false,
  menu: {
    locale: false,
  },
  pwa: false,
  iconfontUrl: '',
} as LayoutSettings & {
  pwa: boolean;
};
