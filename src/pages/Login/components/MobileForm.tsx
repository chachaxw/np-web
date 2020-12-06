import { Button, Col, Divider, Form, Input, message, Row } from 'antd';
import React, { FC, useState } from 'react';
import { useInterval } from 'react-use';

import { sendPhoneCaptcha } from '@/services/login';
import { PhoneReg } from '@/utils/regTool';

interface Props {
  loading: boolean;
  switchLogin: () => void;
  onSubmit: (params: object) => void;
}

const MobileForm: FC<Props> = (props) => {
  const { onSubmit, switchLogin, loading } = props;
  const [form] = Form.useForm();
  const [count, setCount] = useState<number>(59);
  const [disabled, setDisabled] = useState(false);

  const getCaptcha = async () => {
    const values: any = await form.validateFields(['mobile']);
    const { mobile } = values;

    setDisabled(true);
    setCount(59);

    try {
      await sendPhoneCaptcha(mobile);
      message.success('验证码发送成功，请注意查收！');
    } catch (err) {
      setDisabled(false);

      if (err.response) {
        const { data } = err.response;
        const errorText = data?.error_description || data.error;
        message.error(errorText);
      } else {
        message.error(err.message);
      }
    }
  };

  useInterval(
    () => {
      if (count) {
        setCount(count - 1);
        if (count === 1) {
          setDisabled(false);
        }
      }
    },
    count === 0 ? null : 1000,
  );

  return (
    <Form layout="vertical" size="large" onFinish={onSubmit} form={form}>
      <Form.Item
        name="mobile"
        rules={[
          { required: true, message: '请输入手机号码！' },
          { pattern: PhoneReg, message: '请输入正确的手机号码！' },
        ]}
      >
        <Input size="large" allowClear placeholder="手机号" />
      </Form.Item>
      <Form.Item
        name="code"
        rules={[
          { required: true, message: '请输入验证码！' },
          { max: 4, min: 4, message: '请输入4位数字验证码！' },
        ]}
      >
        <Input
          size="large"
          allowClear
          placeholder="验证码"
          suffix={
            <>
              <Divider type="vertical" />
              <Button size="small" type="link" onClick={getCaptcha} disabled={disabled}>
                {disabled ? `还剩${count && count}秒` : '获取短信验证码'}
              </Button>
            </>
          }
        />
      </Form.Item>
      <Form.Item>
        <Row justify="end">
          <Col>
            <Button type="link" onClick={switchLogin} style={{ paddingRight: 0 }}>
              用户名密码登录
            </Button>
          </Col>
        </Row>
      </Form.Item>
      <Row>
        <Button block size="large" type="primary" htmlType="submit" loading={loading}>
          登录
        </Button>
      </Row>
    </Form>
  );
};

export default MobileForm;
