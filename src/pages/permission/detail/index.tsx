import * as React from 'react';
import * as Ad from 'antd'
import { history } from 'umi';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import { Permission, getPermissionById } from '@/services/permission'

const DetailPermission: React.FC<{}> = () => {
  const [initPermission, setInitPermission] = React.useState<Permission>()
  React.useEffect(() => {
    (async () => {
      const { query } = history.location;
      const res = await getPermissionById(query.id)
      setInitPermission(res.data)
    })()
  }, [])

  return (
    <PageContainer title="权限详情">
      <Ad.Card title="基本信息" bordered={false} extra={<a href="/systemManagement/permission">返回</a>} style={{ width: '100%', height: '100%' }}>
        <ProDescriptions
          column={2}
        >
          <ProDescriptions.Item label="权限项名称">{initPermission?.name}</ProDescriptions.Item>
          <ProDescriptions.Item label="权限项编号">{initPermission?.num}</ProDescriptions.Item>
          <ProDescriptions.Item label="权限项编码	">{initPermission?.coding}</ProDescriptions.Item>
          <ProDescriptions.Item label="所属模块">{initPermission?.module}</ProDescriptions.Item>
          <ProDescriptions.Item label="排序码">{initPermission?.sortCode}</ProDescriptions.Item>
          <ProDescriptions.Item label="创建日期" valueType="dateTime">{initPermission?.createTime}</ProDescriptions.Item>
        </ProDescriptions>
      </Ad.Card>
    </PageContainer>
  )
}

export default DetailPermission
