import { MenuDataItem } from '@ant-design/pro-layout';
import { request } from 'umi';

import { USER } from './ApiUrl';

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

export interface UserModel {
  name: string;
  avatar: string;
  job: string;
  company: string;
  position1: string;
  position2: string;
  position3: string;
}

export async function fetchUser(id: string): Promise<API.ResponseData<UserModel>> {
  return request(`${USER}/${id}`);
}

export async function queryNotices(): Promise<{ data: Notice[] }> {
  return request('/notices');
}

export async function queryMenus(): Promise<{ data: MenuDataItem[] }> {
  return request('/menus');
}
