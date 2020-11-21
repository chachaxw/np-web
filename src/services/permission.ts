import { request } from 'umi';
import { PERMISSION, PERMISSION_MODULE, PERMISSION_TYPES } from './ApiUrl';
import { RequestMethod } from './config';

export interface Permission {
  id: number;
  num: number;
  name: string;
  coding: string;
  module?: string;
  moduleId: string;
  sortCode: number;
  status: boolean;
  createTime?: string;
}

export interface QueryPermissionListParams {
  num?: number;
  name?: string;
  module?: string;
  createTime?: string;
  status?: boolean;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

export interface Module {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: Module[];
  isModule?: boolean;
  isRoot?: boolean;
  $parent?: string;
}

export interface ModuleType {
  name: string;
  id: string;
}

export async function fetchModuleType(): Promise<{ data: ModuleType[] }> {
  return request<{ data: ModuleType[] }>(PERMISSION_MODULE, { method: RequestMethod.get });
}

export async function fetchPermissionList(
  params: QueryPermissionListParams,
): Promise<{ data: Permission[] }> {
  return request<{ data: Permission[] }>(PERMISSION, {
    method: RequestMethod.get,
    params,
  });
}

export async function fetchPermissionById(
  id: string,
  params?: object,
): Promise<{ data: Permission }> {
  return request<{ data: Permission }>(`${PERMISSION}/${id}`, {
    method: RequestMethod.post,
    params,
  });
}

export async function fetchModuleTree(): Promise<{ data: Module[] }> {
  return request<{ data: Module[] }>(PERMISSION_TYPES, { method: RequestMethod.get });
}

export async function addPermission(params: Permission): Promise<{ data: number }> {
  return request<{ data: number }>(PERMISSION, {
    method: RequestMethod.post,
    data: params,
  });
}

export async function updatePermission(id: string, params: Permission): Promise<{ data: number }> {
  return request<{ data: number }>(`${PERMISSION}/${id}`, {
    method: RequestMethod.post,
    data: params,
  });
}

export async function deletePermission(id: string): Promise<void> {
  return request<void>(`${PERMISSION}/${id}`, { method: RequestMethod.delete });
}
