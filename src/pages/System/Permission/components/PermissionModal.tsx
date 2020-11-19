import React, { FunctionComponent, useEffect } from 'react';
import { Modal, Spin, Form } from 'antd';

import FormItems from '@/components/FormItems';
import { NotEmptyReg, ShortCodeReg } from '@/utils/regTool';

interface InternalProps {
  record: any;
  visible: boolean;
  onCancel: () => void;
  afterClose?: () => void;
  onSubmit: (params: any) => void;
}

const modalLoading = false;

export const ServiceTypeModal: FunctionComponent<InternalProps> = (props) => {
  const { visible, record, onCancel, onSubmit, afterClose } = props;

  const [form] = Form.useForm();
  const { validateFields, resetFields, setFieldsValue } = form;
  const title = record ? '编辑权限' : '添加权限';

  useEffect(() => {
    if (record) {
      setFieldsValue(record);
    }
  }, [record, setFieldsValue]);

  const handleSubmit = async () => {
    const values = await validateFields();
    const params = {
      id: record?.id,
      ...values,
    };

    onSubmit(params);
  };

  const onAfterClose = async () => {
    resetFields();

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    afterClose && afterClose();
  };

  const FormItem = [
    {
      type: 'Input',
      formItemProps: {
        name: 'name',
        label: '名称',
        required: true,
        rules: [{ pattern: NotEmptyReg, message: '权限名称不可为空!' }, { max: 20 }],
      },
      componentProps: {
        allowClear: true,
      },
    },
    {
      type: 'Input',
      formItemProps: {
        name: 'code',
        label: '服务类型简码',
        required: true,
        rules: [{ pattern: ShortCodeReg, message: '请输入字母或下划线' }, { max: 30 }],
      },
      componentProps: {
        allowClear: true,
      },
    },
    {
      type: 'Select',
      formItemProps: {
        name: 'productTypeId',
        label: '所属产品',
        required: true,
      },
      componentProps: {
        options: [],
        showSearch: true,
        optionFilterProp: 'label',
      },
    },
    {
      type: 'Switch',
      formItemProps: {
        name: 'enabled',
        label: '启用状态',
        valuePropName: 'checked',
        initialValue: false,
      },
    },
  ];

  return (
    <Modal
      centered
      width="50%"
      title={title}
      visible={visible}
      maskClosable={false}
      onOk={handleSubmit}
      onCancel={onCancel}
      afterClose={onAfterClose}
      style={{ minWidth: 520, maxWidth: 1020 }}
    >
      <Spin spinning={modalLoading}>
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <FormItems items={FormItem} />
        </Form>
      </Spin>
    </Modal>
  );
};

export default PermissionModal;
