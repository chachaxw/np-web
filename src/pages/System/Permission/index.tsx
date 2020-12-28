import ProTable, { ProColumns } from '@ant-design/pro-table';
import {
  PlusCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  ExportOutlined,
  ImportOutlined,
} from '@ant-design/icons';
import { Button, Modal, Switch, Select } from 'antd';
import React, { FunctionComponent, useState, useRef, useEffect, useCallback } from 'react';
import moment from 'moment';

import PermissionModal from './components/PermissionModal';
import { addPermission, fetchPermissionList, updatePermission } from '@/services/permission';
import { formatOptions } from '@/utils/utils';

const Permission: FunctionComponent<{}> = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [record, setRecord] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);
  const formRef = useRef<any>(undefined);

  // 异步获取选择框下拉列表数据
  const fetchOptions = useCallback(async () => {
    const { data } = await fetchPermissionList({ pageSize: 20, page: 0 });
    if (Array.isArray(data)) {
      setOptions(formatOptions(data));
    }
  }, []);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  const tableReload = () => {
    const { current } = formRef;
    if (current) {
      setVisible(false);
      current.resetFields();
      current.submit();
    }
  };

  const handleAdd = () => setVisible(true);

  const handleEdit = async (row: any) => {
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

  const onCancel = () => setVisible(false);

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

    console.log('====================================');
    console.log('请求数据', searchParams);
    console.log('====================================');
    const { data } = await fetchPermissionList(searchParams);
    return data;
  };

  const columns: ProColumns<any>[] = [
    {
      title: '权限编号',
      dataIndex: 'num',
      fieldProps: {
        allowClear: true,
      },
    },
    {
      title: '权限名称',
      dataIndex: 'name',
      fieldProps: {
        allowClear: true,
      },
    },
    {
      title: '权限项编码',
      dataIndex: 'code',
      renderFormItem: () => {
        // 下拉列表数据示例
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
        transform: () => 'code',
      },
    },
    {
      title: '所属模块',
      dataIndex: 'module',
      fieldProps: {
        allowClear: true,
      },
    },
    {
      title: '排序码',
      dataIndex: 'sortCode',
      fieldProps: {
        allowClear: true,
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
      render: (text: any, _: any) => {
        return moment(text).format('YYYY-MM-DD HH:mm:ss');
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
        request={request}
        formRef={formRef}
        search={{ labelWidth: 100 }}
        pagination={{ showQuickJumper: true }}
        headerTitle={
          <Button onClick={handleAdd} type="primary" icon={<PlusCircleOutlined />}>
            新增权限
          </Button>
        }
        toolBarRender={() => [
          <Button type="primary" icon={<ImportOutlined />}>
            导入
          </Button>,
          <Button type="primary" icon={<ExportOutlined />}>
            导出
          </Button>,
        ]}
      />
      <PermissionModal
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
