import { Request, Response } from 'express';

let permissionList = [
  {
    id: 1,
    num: 1000001,
    name: '新增',
    coding: 'ADD',
    module: '驿站管理',
    moduleId: '0-1-1-6-1-1',
    sortCode: 1,
    status: true,
    createTime: '2020-01-01 00:00:00'
  },
  {
    id: 2,
    num: 1000002,
    name: '删除',
    coding: 'DELETE',
    module: '驿站管理',
    moduleId: '0-1-1-6-1-1',
    sortCode: 2,
    status: false,
    createTime: '2020-01-01 00:00:00'
  },
  {
    id: 3,
    num: 1000003,
    name: '修改',
    coding: 'UPDATE',
    module: '驿站管理',
    moduleId: '0-1-1-6-1-1',
    sortCode: 3,
    status: true,
    createTime: '2020-01-01 00:00:00'
  },
  {
    id: 4,
    num: 1000004,
    name: '导入',
    coding: 'IMPORT',
    module: '驿站管理',
    moduleId: '0-1-1-6-1-1',
    sortCode: 4,
    status: false,
    createTime: '2020-01-01 00:00:00'
  },
  {
    id: 5,
    num: 1000005,
    name: '审核',
    coding: 'VERIFY',
    module: '驿站管理',
    moduleId: '0-1-1-6-1-1',
    sortCode: 6,
    status: false,
    createTime: '2020-01-01 00:00:00'
  },
  {
    id: 6,
    num: 1000006,
    name: '导出',
    coding: 'EXPORT',
    module: '驿站管理',
    moduleId: '0-1-1-6-1-1',
    sortCode: 5,
    status: false,
    createTime: '2020-01-01 00:00:00'
  }
]

const getPermissionList = (req: Request, res: Response) => {
  res.json({
    data: permissionList
  })
}

const getModuleTree = (req: Request, res: Response) => {
  res.json({
    data: [
      {
        title: '紫晶科技',
        key: '0-1',
        isRoot: true,
        children: [
          {
            title: '紫晶科技',
            key: '0-1-1',
            children: [
              {
                title: '基础资料平台',
                key: '0-1-1-1',
                children: [
                  {
                    title: '园区管理',
                    key: '0-1-1-6-1',
                    children: [
                      {
                        title: '驿站管理',
                        key: '0-1-1-6-1-1',
                        isModule: true,
                        children: permissionList.map(permission => ({
                          title: permission.name,
                          key: String(permission.id),
                          isLeaf: true,
                        })),
                      },
                    ]
                  },
                ]
              },
              {
                title: '操作管理平台',
                key: '0-1-1-2',
              },
              {
                title: '结算管理平台',
                key: '0-1-1-3',
              },
              {
                title: '数据分析平台',
                key: '0-1-1-4',
              },
              {
                title: '权限管理平台',
                key: '0-1-1-5',
              },
              {
                title: '订单管理平台',
                key: '0-1-1-6',
              },
              {
                title: '山竺科技',
                key: '0-1-1-7',
              },
              {
                title: '山竺快跑',
                key: '0-1-1-8',
              },
              {
                title: '山竺生活i',
                key: '0-1-1-9',
              },
            ]
          },
        ]
      },
    ]
  })
}

const getModuleType = (req: Request, res: Response) => {
  res.json({
    data: [
      {
        name: '驿站管理',
        id: '0-1-1-6-1-1'
      },
      {
        name: '订单管理',
        id: '0-2-1-1-1-1'
      },
      {
        name: '操作管理',
        id: '0-3-1-1-1-1'
      },
    ]
  })
}

const addPermission = (req: Request, res: Response) => {
  const data = req.body
  data.id = permissionList.length + 1
  data.createTime = new Date()
  data.module = '驿站管理'
  permissionList.push(data)
  res.json({
    data: 1
  })
}

const updatePermission = (req: Request, res: Response) => {
  const data = req.body
  permissionList = permissionList.map((permission) => {
    if (permission.id === data.id) {
      let oldPermission = permission
      oldPermission = data
      return oldPermission
    }
    return permission
  })
  res.json({
    data: 1
  })
}

const getPermissionById = (req: Request, res: Response) => {
  const { query } = req
  let currentPermission = {}
  permissionList.forEach((permission => {
    if (permission.id === Number(query.id)) {
      currentPermission = permission
    }
  }))
  res.json({
    data: currentPermission
  })
}

const deletePermission = (req: Request, res: Response) => {
  const data = req.body;
  permissionList = permissionList.filter((permission) => permission.id !== data.id)
  res.json({})
}

export default {
  'GET /api/permission': getPermissionList,
  'GET /api/permission/moduleTree': getModuleTree,
  'GET /api/permission/moduleTypes': getModuleType,
  'POST /api/permission/add': addPermission,
  'POST /api/permission/update': updatePermission,
  'GET /api/permission/getPermissionById': getPermissionById,
  'DELETE /api/permission/delete': deletePermission
}
