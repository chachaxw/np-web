import { Button, Checkbox, Form, Input, Row } from 'antd';
import React from 'react';

import { LocalStorageKey } from '@/utils/constants';
import { getStorage } from '@/utils/utils';
import styles from './style.less';

interface LoginFormType {
  username: string;
  password: string;
  remembered: boolean;
}

const loginFormInitial: LoginFormType = getStorage<LoginFormType>(
  LocalStorageKey.APP_ACCOUNT_STORE,
);

interface Props {
  loading: boolean;
  switchLogin: () => void;
  onSubmit: (params: any) => void;
}

const PwdForm: React.FC<Props> = (props) => {
  return (
    <Form name="login" size="large" onFinish={props.onSubmit} initialValues={loginFormInitial}>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: '请输入密码!' },
          { min: 8, message: '至少需要8位字符!' },
          { pattern: /^(?=.*?[a-z])(?=.*?[A-Z]).*$/, message: '需要包含大小写字母!' },
        ]}
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item>
        <Form.Item
          name="captcha"
          noStyle
          rules={[
            { required: true, message: '请输入验证码!' },
            { len: 4, message: '请输入4位验证码!' },
          ]}
        >
          <Input style={{ width: '60%' }} placeholder="验证码" />
        </Form.Item>
        <img
          className={styles.captcha}
          src="https://login.sina.com.cn/cgi/pin.php?r=49619904&s=0&p=gz-649a3275eac20723f8c3b35547b99e32ddf7"
          alt="验证码图片, 请刷新页面获取"
        />
      </Form.Item>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Form.Item name="remembered" valuePropName="checked" noStyle>
          <Checkbox>记住密码</Checkbox>
        </Form.Item>
        <Button type="link" style={{ paddingRight: 0 }} onClick={props.switchLogin}>
          手机号验证码登录
        </Button>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PwdForm;
