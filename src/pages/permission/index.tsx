import * as Ad from 'antd';
import * as Adi from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import * as React from 'react';
import { join } from 'lodash'
import { history } from 'umi';
import { queryPermissionList, Permission, deletePermission } from '@/services/permission'
import styles from './style.less'
import ModuleTree from './components/tree'

const PermissionList: React.FC<{}> = () => {
  const actionRef = React.useRef<ActionType>();
  const [query, setQuery] = React.useState<JSONObject>({});
  const [selectPermissions, setSelectPermissions] = React.useState<Permission[]>([]);
  const [moduleTreeUpdate, forceUpdateModuleTree] = React.useState<JSONObject>({});

  const handleDelete = async (permissions: Permission) => {
    await deletePermission(permissions.id);
    actionRef.current?.reload();
    actionRef.current?.reset?.();
    forceUpdateModuleTree({});
  }

  const columns: ProColumns<Permission>[] = [
    {
      title: '权限项编号',
      dataIndex: 'num',
      valueType: 'text',
      fixed: 'left',
      width: 100,
    },
    {
      title: '权限名称',
      dataIndex: 'name',
      valueType: 'text',
      width: 100,
    },
    {
      title: '权限项编码',
      dataIndex: 'coding',
      valueType: 'text',
      width: 100,
      search: false,
    },
    {
      title: '所属模块',
      dataIndex: 'module',
      valueType: 'text',
      ellipsis: true,
    },
    {
      title: '排序码',
      dataIndex: 'sortCode',
      valueType: 'text',
      width: 80,
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      /**
       * 作用于查询框
       */
      valueEnum: {
        true: { text: '开启' },
        false: { text: '关闭' }
      },
      render: (_1, permission) => {
        return <Ad.Switch
          checkedChildren={<span>√</span>}
          unCheckedChildren={<span>×</span>}
          defaultChecked={String(permission.status) === 'true'} />;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      width: 150,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: (_, permission) => (
        <Ad.Space>
          <a onClick={() => {
            history.push({
              pathname: '/systemManagement/permission/detail',
              query: {
                id: permission.id
              }
            })
          }
          }>查看</a>
          <a onClick={() => {
            history.push({
              pathname: '/systemManagement/permission/update',
              query: {
                id: permission.id
              }
            })
          }
          }>编辑</a>
          <a onClick={() => handleDelete(permission)}>删除</a>
        </Ad.Space>
      ),
    },
  ]

  const handleAdd = async () => {
    history.push({
      pathname: '/systemManagement/permission/create'
    })
  };

  const handleSelectModule = (moduleKey: string) => {
    setQuery({
      module: moduleKey,
    });
  }

  const setSelectedPermission = (permissions: Permission[]) => {
    setSelectPermissions(permissions)
  }

  return (
    <PageContainer title={false}>
      <ProTable<Permission>
        rowKey="id"
        rowSelection={{ onChange: (_, permissions) => setSelectedPermission(permissions) }}
        scroll={{ x: 1000 }}
        search={{
          defaultCollapsed: false,
          span: 8,
          collapseRender: () => false,
        }}
        params={query}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
        }}
        tableRender={(_, child) => (
          <div style={{ display: 'flex' }}>
            <div className={styles.tree} style={{ width: '290px' }}>
              <ModuleTree forceUpdate={moduleTreeUpdate}
                onSelectModule={handleSelectModule} />
            </div>
            <div className={styles.table} style={{ width: 'calc(100% - 290px)' }}>
              {child}
            </div>
          </div>
        )}
        actionRef={actionRef}
        headerTitle={(<Ad.Button key='add' onClick={() => handleAdd()}>
          <Adi.PlusOutlined /> 新增权限项
        </Ad.Button>)}
        toolBarRender={() => [
          <Ad.Button key='import'>
            <Adi.PlusOutlined /> 批量导入
          </Ad.Button>,
          <Ad.Button onClick={() => {
            if (selectPermissions.length === 0) {
              Ad.notification.info({
                message: '请选择至少一条记录',
              });
              return;
            }
            Ad.notification.info({
              message: '模拟导出',
              description:
                <div>{join(selectPermissions.map(permission => {
                  return permission.name
                }), '、')}</div>
            });
          }} key='export'>
            <Adi.PlusOutlined /> 批量导出
        </Ad.Button>
        ]}
        request={(params, sorter, filter) => queryPermissionList({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageContainer>
  )
}

export default PermissionList
