import { request } from 'umi';

export interface System {
  id?:string;
  icon?: string;
  title?: string;
  desc?: string;
  collection?: boolean;
  href?:string;
}

export async function getSystemList():Promise<{data: System[]}> {
  return request<{ data: System[] }>('/api/systemList', {
    method: 'get',
  });
}
