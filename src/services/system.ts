import { request } from 'umi';
import { SYSTEM } from './ApiUrl';
import { RequestMethod } from './config';

export interface System {
  id?: string;
  icon?: string;
  title?: string;
  desc?: string;
  collection?: boolean;
  href?: string;
}

export async function getSystemList(params: any): Promise<API.TableResponseData<System[]>> {
  return request(SYSTEM, {
    method: RequestMethod.get,
    params,
  });
}
