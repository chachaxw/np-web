import * as React from 'react';
import * as Ad from 'antd'
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormSelect, ProFormSwitch, ProFormDigit } from '@ant-design/pro-form';
import { getModuleType, ModuleType, addPermission, Permission } from '@/services/permission'

const CreatePermission: React.FC<{}> = () => {
  const [moduleTypeList, setModuleTypeList] = React.useState<ModuleType[]>([])
  React.useEffect(() => {
    (async () => {
      const res = await getModuleType()
      setModuleTypeList(res.data)
    })()
  }, [])

  const submit = async (values: Permission) => {
    await addPermission(values)
    Ad.message.success('提交成功！');
    history.push({
      pathname: '/systemManagement/permission'
    })
  }

  return (
    <PageContainer title="创建权限">
      <Ad.Card title="基本信息"
        bordered={false}>
        <ProForm
          submitter={false}
          onReset={() => {
            history.push({
              pathname: '/systemManagement/permission'
            })
          }
          }
          onFinish={async (values) => {
            submit(values)
          }}
        >
          <ProForm.Group>
            <ProFormDigit
              name="num"
              fieldProps={{ precision: 0 }}
              label="权限项编号:"
              rules={[{ required: true, message: '请输入权限项编号', type: 'number' }]}
            />
            <ProFormText
              name="name"
              label="权限项名称:"
              rules={[{ required: true, max: 100, message: '权限项名称', type: 'string' }]}
              placeholder="必填;长度不超过100" />
            <ProFormSelect
              name="module"
              label="所属模块:"
              valueEnum={moduleTypeList.reduce((moduleType, map) => {
                const newModuleType = moduleType
                newModuleType[map.id] = map.name
                return newModuleType
              }, {})
              }
              rules={[{ required: true, message: '请选择所属模块', type: 'string', }]}
              placeholder="选择所属模块" />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              name="coding"
              label="权限编码:"
              placeholder="必填;长度不超过100"
              rules={[{ required: true, message: '请输入权限编码', type: 'string' }]}
            />
            <ProFormDigit
              name="sortCode"
              label="排序码:"
              fieldProps={{ precision: 0 }}
              placeholder="必填;长度不超过100"
              rules={[{ required: true, message: '请输入排序码', type: 'number' }]}
            />
            <ProFormSwitch fieldProps={{
              checkedChildren: '启用',
              unCheckedChildren: '禁用',
              defaultChecked: true
            }} name="status" label="启用状态:" />
          </ProForm.Group>
          <ProForm.Group style={{ textAlign: 'center' }}>
            <Ad.Button type="primary" htmlType="submit">
              保存
              </Ad.Button>
            <Ad.Button htmlType="reset">
              取消
              </Ad.Button>
          </ProForm.Group>
        </ProForm>
      </Ad.Card>
    </PageContainer>
  )
}

export default CreatePermission
