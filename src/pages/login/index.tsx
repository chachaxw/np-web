import * as Ad from 'antd';
import * as React from 'react';
import { login, LoginParams } from '@/services/login';
import Header from '@/components/header';
import { useModel, history, History } from 'umi';
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
      <Header />
      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.formTitle}>登录</div>
          <Ad.Form name="login"
            size="large"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}>
            <Ad.Form.Item name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Ad.Input placeholder="请输入用户名" />
            </Ad.Form.Item>
            <Ad.Form.Item name="password"
              rules={[
                { required: true, message: '请输入密码!' },
                { min: 8, message: '至少需要8位字符!' },
                { pattern:/^(?=.*?[a-z])(?=.*?[A-Z]).*$/, message: '需要包含大小写字母!' },
              ]}
            >
              <Ad.Input.Password placeholder="请输入密码" />
            </Ad.Form.Item>
            <Ad.Form.Item>
              <Ad.Form.Item
                name="captcha"
                noStyle
                rules={[{ required: true, message: '请输入验证码!' }]}
              >
                <Ad.Input style={{ width: '50%' }} placeholder="Please input" />
              </Ad.Form.Item>
              <img className={styles.captcha}
                src="https://login.sina.com.cn/cgi/pin.php?r=49619904&s=0&p=gz-649a3275eac20723f8c3b35547b99e32ddf7"
                alt="验证码图片, 请刷新页面获取" />
            </Ad.Form.Item>
            <Ad.Form.Item>
              <Ad.Form.Item name="remember" valuePropName="checked" noStyle>
                <Ad.Checkbox>记住密码</Ad.Checkbox>
              </Ad.Form.Item>
              <Ad.Space style={{ float: 'right' }}>
                <a onClick={() => history.push('/login/resetPassword')}>忘记密码</a>
                <a onClick={() => history.push('/login/register')}>注册</a>
              </Ad.Space>
            </Ad.Form.Item>
            <Ad.Form.Item>
              <Ad.Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                登录
              </Ad.Button>
            </Ad.Form.Item>
          </Ad.Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
