import { Request, Response } from 'express';

const getSystemList = (req:Request,res:Response) => {
  res.json({
    data: [
      {
        id:'1',
        icon: '/image/order.svg',
        title: '订管理平台',
        desc: '外部供应商客户渠道订单信息接入',
        collection: false,
        href:'/'
      },
      {
        id:'2',
        icon: '/image/operation.svg',
        title: '操作管理平台',
        desc: '快递物流业务操作管理',
        collection: false,
        href:'/'
      },
      {
        id:'3',
        icon: '/image/manage.svg',
        title: '设备管控平台',
        desc: '智能硬件设备升级，监控管理',
        collection: true,
        href:'/'
      },
      {
        id:'4',
        icon: '/image/operation.svg',
        title: '结算管理平台',
        desc: '客户业务订单数据结算',
        collection: false,
        href:'/'
      },
      {
        id:'5',
        icon: '/image/order.svg',
        title: '数据分析平台',
        desc: '大数据分析统计，报表查询导出',
        collection: false,
        href:'/'
      },
      {
        id:'6',
        icon: '/image/manage.svg',
        title: '权限管理平台',
        desc: '对用户进行鉴权认真，授权管理',
        collection: true,
        href:'/systemManagement/permission'
      },
      {
        id:'7',
        icon: '/image/base.svg',
        title: '基础资料平台',
        desc: '行业资料，地址，SKU,基础资料管理',
        collection: true,
        href:'/'
      },
    ]
  })
}

export default {
  'GET /api/systemList': getSystemList,
}
