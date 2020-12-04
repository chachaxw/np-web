import { Button, Checkbox, Form, Input, Layout, Row, Space, Typography } from 'antd';
import React from 'react';
import { useModel, history, Link } from 'umi';

import { login, LoginFormParams } from '@/services/login';
import { LocalStorageKey } from '@/utils/constants';
import { getStorage, removeStorage, setStorage } from '@/utils/utils';
import { AppRoutes } from '../../../config/constants';
import styles from './style.less';

const { Title } = Typography;
const { Header, Content } = Layout;

interface LoginFormType extends LoginFormParams {
  remembered: boolean;
}

/// 登录表单初始值
const loginFormInitial: LoginFormType = getStorage<LoginFormType>(
  LocalStorageKey.APP_ACCOUNT_STORE,
);

const Login: React.FC<{}> = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const handleSubmit = async (values: LoginFormType) => {
    const { remembered, ...rest } = values;
    const { data, response } = await login(rest);

    if (response.ok) {
      setStorage(LocalStorageKey.APP_AUTH_STORE, data);

      if (remembered) {
        setStorage(LocalStorageKey.APP_ACCOUNT_STORE, values);
      } else {
        removeStorage(LocalStorageKey.APP_ACCOUNT_STORE);
      }

      setInitialState({ ...initialState!, currentUser: data });
      history.replace(AppRoutes.Portal);
    }
  };

  return (
    <Layout className={styles.page}>
      <Header style={{ background: 'white', padding: '0 24px' }}>
        <Row align="middle" style={{ height: '100%' }}>
          <img src="images/logo.jpg" width="40" alt="Logo" />
          <Title level={4} style={{ marginLeft: 12, marginBottom: 0 }}>
            紫晶 . 盘古信息化生态V1.0
          </Title>
        </Row>
      </Header>
      <Content>
        <div className={styles.main}>
          <Title level={4}>登录</Title>
          <Form name="login" size="large" onFinish={handleSubmit} initialValues={loginFormInitial}>
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
            <Form.Item>
              <Form.Item name="remembered" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
              <Space style={{ float: 'right' }}>
                <Link to={AppRoutes.ResetPassword}>忘记密码</Link>
                <Link to={AppRoutes.Register}>注册</Link>
              </Space>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
