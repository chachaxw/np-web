import { Button, Checkbox, Form, Input, Space } from 'antd';
import * as React from 'react';
import { useModel, history, History, Link } from 'umi';

import { login, LoginParams } from '@/services/login';
import { AppRoutes } from '../../../config/constants';
import styles from './style.less';

const Login: React.FC<{}> = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const goto = () => {
    setTimeout(() => {
      const { query } = history.location;
      const { redirect } = query as { redirect: string };
      if (!redirect) {
        history.replace('/system');
        return;
      }
      (history as History).replace(redirect);
    }, 10);
  };

  const handleSubmit = async (params: LoginParams) => {
    const userInfo = await login(params);
    localStorage.setItem('app.user', JSON.stringify(userInfo));
    setInitialState({
      ...initialState,
      currentUser: userInfo,
    } as any);
    goto();
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.formTitle}>登录</div>
          <Form
            name="login"
            size="large"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
          >
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
                rules={[{ required: true, message: '请输入验证码!' }]}
              >
                <Input style={{ width: '50%' }} placeholder="验证码" />
              </Form.Item>
              <img
                className={styles.captcha}
                src="https://login.sina.com.cn/cgi/pin.php?r=49619904&s=0&p=gz-649a3275eac20723f8c3b35547b99e32ddf7"
                alt="验证码图片, 请刷新页面获取"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
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
      </div>
    </div>
  );
};

export default Login;
