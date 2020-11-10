import { request } from 'umi';
import { MenuDataItem } from '@ant-design/pro-layout';

export interface Notice {
  id: string;
  key: string;
  avatar: string;
  title: string;
  datetime: string;
  type: string;
  read?: boolean;
  description: string;
  clickClose?: boolean;
  extra: any;
  status: string;
}

export async function queryNotices(): Promise<{data: Notice[]}> {
  return request<{ data: Notice[] }>('/api/notices');
}

export async function queryMenus(): Promise<{data: MenuDataItem[]}> {
  return request<{ data: MenuDataItem[] }>('/api/menus');
}
