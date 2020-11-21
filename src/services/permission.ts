import { request } from 'umi';

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

export async function addPermission(params: Permission): Promise<{ data: number }> {
  return request<{ data: number }>('/api/permission/add', {
    method: 'post',
    data: {
      ...params,
    },
  });
}

export async function getPermissionById(params: number): Promise<{ data: Permission }> {
  return request<{ data: Permission }>('/api/permission/getPermissionById', {
    method: 'get',
    params: {
      id: params,
    },
  });
}

export async function updatePermission(params: Permission): Promise<{ data: number }> {
  return request<{ data: number }>('/api/permission/update', {
    method: 'post',
    data: {
      ...params,
    },
  });
}

export async function getModuleType(): Promise<{ data: ModuleType[] }> {
  return request<{ data: ModuleType[] }>('/api/permission/moduleTypes', {
    method: 'get',
  });
}

export async function queryPermissionList(
  params: QueryPermissionListParams,
): Promise<{ data: Permission[] }> {
  return request<{ data: Permission[] }>('/api/permission', {
    method: 'get',
    params,
  });
}

export async function getModuleTree(): Promise<{ data: Module[] }> {
  return request<{ data: Module[] }>('/api/permission/moduleTree', {
    method: 'get',
  });
}

export async function deletePermission(id: number): Promise<void> {
  return request<void>('/api/permission/delete', {
    method: 'delete',
    data: {
      id,
    },
  });
}
