import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button, message, Space, Modal, Switch, Select } from 'antd';
import React, { FunctionComponent, useState, useRef, useEffect, useCallback } from 'react';
import { PlusCircleOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';

import { ServiceTypeModal } from './components/PermissionModal';

export const Permission: FunctionComponent = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [record, setRecord] = useState<any>(null);

  const formRef = useRef<any>(undefined);

  const getProductOptions = useCallback(async () => {
    // const { data } = await ProductTypeService.fetchProductTypeList({ pageSize: 99999, page: 1 });
    // if (data.data && Array.isArray(data.data)) {
    //   setProductOptions(formatOptions(data.data));
    // }
  }, []);

  const tableReload = () => {
    const { current } = formRef;
    if (current) {
      setVisible(false);
      current.resetFields();
      current.submit();
    }
  };

  const handleAdd = useCallback(async () => {
    await getProductOptions();
    setVisible(true);
  }, [getProductOptions]);

  const handleEdit = async (row: any) => {
    await getProductOptions();
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
      onOk: () => {},
    });
  };

  const onCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const enabledChange = (checked: boolean, row: any) => {};

  const onSubmit = useCallback(async (params: any) => {
    const { id, ...others } = params;
    try {
      message.success('操作成功!');
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

    // const { data } = await ServiceTypeService.fetchServiceTypeList(searchParams);
    // return data;
    return { data: [], response: null };
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
            {productOptions.map((v) => (
              <Select.Option value={v.value} key={v.value}>
                {v.label}
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

  useEffect(() => {
    getProductOptions();
  }, [getProductOptions]);

  return (
    <>
      <ProTable<any>
        rowKey="id"
        columns={columns}
        search={{ labelWidth: 120 }}
        pagination={{
          showQuickJumper: true,
        }}
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
