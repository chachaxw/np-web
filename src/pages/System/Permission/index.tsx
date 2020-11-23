import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button, message, Space, Modal, Switch, Select } from 'antd';
import React, { FunctionComponent, useState, useRef, useEffect, useCallback } from 'react';
import { PlusCircleOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';

import { ServiceTypeModal } from './components/PermissionModal';
import { addPermission, fetchPermissionList, updatePermission } from '@/services/permission';
import { formatOptions } from '@/utils/utils';

export const Permission: FunctionComponent = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [record, setRecord] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);
  const formRef = useRef<any>(undefined);

  const getPermissionOptions = useCallback(async () => {
    const { data } = await fetchPermissionList({ pageSize: 20, page: 0 });
    if (Array.isArray(data)) {
      setOptions(formatOptions(data));
    }
  }, []);

  useEffect(() => {
    getPermissionOptions();
  }, [getPermissionOptions]);

  const tableReload = () => {
    const { current } = formRef;
    if (current) {
      setVisible(false);
      current.resetFields();
      current.submit();
    }
  };

  const handleAdd = useCallback(async () => {
    await getPermissionOptions();
    setVisible(true);
  }, [getPermissionOptions]);

  const handleEdit = async (row: any) => {
    await getPermissionOptions();
    setRecord(row);
    setVisible(true);
  };

  const handleDelete = (row: any) => {
    Modal.confirm({
      title: `确认删除 ${row?.name || ''} 吗？`,
      okType: 'danger',
      centered: true,
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        tableReload();
      },
    });
  };

  const onCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const enabledChange = (checked: boolean, row: any) => {};

  const onSubmit = useCallback(async (params: any) => {
    const { id, ...others } = params;
    try {
      if (id) {
        updatePermission(id, others);
      } else {
        addPermission(others);
      }
      tableReload();
    } catch (error) {
      // const { data, response } = error;
    }
  }, []);

  const request = async (params: API.TableParams) => {
    const { pageSize, current, ...others } = params;
    const searchParams: any = {
      pageSize,
      page: current,
      ...others,
    };

    const { data } = await fetchPermissionList(searchParams);
    return data;
  };

  const columns: ProColumns<any>[] = [
    {
      title: '权限名称',
      dataIndex: 'name',
      fieldProps: {
        allowClear: true,
      },
    },
    {
      title: '所属产品',
      dataIndex: 'productTypeName',
      renderFormItem: () => {
        return (
          <Select placeholder="请选择" showSearch optionFilterProp="children">
            {options.map((item) => (
              <Select.Option value={item.id} key={item.id}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        );
      },
      search: {
        transform: () => 'productTypeId',
      },
    },
    {
      title: '启用状态',
      dataIndex: 'enabled',
      renderFormItem: () => {
        return (
          <Select placeholder="请选择" allowClear>
            <Select.Option value="true">启用</Select.Option>
            <Select.Option value="false">禁用</Select.Option>
          </Select>
        );
      },
      render: (text: any, row: any) => {
        return (
          <Switch
            checked={text}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={(checked: boolean) => enabledChange(checked, row)}
          />
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      valueType: 'dateTimeRange',
      render: (_: any, row: any) => {
        return moment(row.createdTime).format('YYYY-MM-DD HH:mm:ss');
      },
      search: {
        transform: (value: string[]) => ({
          startCreatedTime: moment(value[0]).valueOf(),
          endCreatedTime: moment(value[1]).valueOf(),
        }),
      },
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_: any, row: any) => [
        <Button type="link" key="edit" onClick={() => handleEdit(row)}>
          编辑
        </Button>,
        <Button type="link" key="del" danger onClick={() => handleDelete(row)}>
          删除
        </Button>,
      ],
    },
  ];

  return (
    <>
      <ProTable<any>
        rowKey="id"
        columns={columns}
        search={{ labelWidth: 120 }}
        pagination={{ showQuickJumper: true }}
        request={request}
        formRef={formRef}
        headerTitle={
          <Space>
            <Button onClick={handleAdd} type="primary" icon={<PlusCircleOutlined />}>
              新增服务类型
            </Button>
          </Space>
        }
      />
      <ServiceTypeModal
        visible={visible}
        record={record}
        onCancel={onCancel}
        onSubmit={onSubmit}
        afterClose={() => setRecord(null)}
      />
    </>
  );
};

export default Permission;
