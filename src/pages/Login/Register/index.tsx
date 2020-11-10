import * as Ad from 'antd';
import * as Adi from '@ant-design/icons';
import React from 'react';
import { register, RegisterParams, SendPhoneCaptchaParams } from '@/services/login';
import { history } from 'umi';
import Header from '@/components/header';
import styles from './style.less';
import MdCaptchaButton from '../components/captchaButton';

const Login: React.FC<{}> = () => {

  const [ form ] = Ad.Form.useForm();

  const handleSubmit = async (params: RegisterParams) => {
    await register(params);
    history.push('/login');
  };

  const handleSend: () => Promise<SendPhoneCaptchaParams> = async () => {
    await form.validateFields(['phone']);
    return {
      phone: form.getFieldValue('phone'),
    };
  };

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        <div className={styles.main}
          style={{ marginLeft: 0 }}>
          <div className={styles.formTitle}>
            注册
            <span className={styles.titleBtn}
              onClick={() => history.push('/login')}>
              我有账号, 立即登录<Adi.CaretRightOutlined />
            </span>
          </div>
          <Ad.Form name="register"
            size="large"
            form={form}
            initialValues={{
              agreement: true,
              phoneAreaCode: '86',
            }}
            onFinish={handleSubmit}>
            <Ad.Form.Item name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Ad.Input placeholder="请输入用户名" />
            </Ad.Form.Item>
            <Ad.Form.Item>
              <Ad.Input.Group compact>
                <Ad.Form.Item name="phoneAreaCode" noStyle>
                  <Ad.Select style={{ width: '40%' }}>
                    <Ad.Select.Option value="86">中国+86</Ad.Select.Option>
                  </Ad.Select>
                </Ad.Form.Item>
                <Ad.Form.Item name="phone"
                  rules={[
                    { required: true, message: '请输入手机号码!' },
                    {
                      pattern: /^1\d{10}$/,
                      message: '手机号格式错误！',
                    },
                  ]}
                  noStyle>
                  <Ad.Input
                    style={{ width: '60%' }}
                    placeholder="今后使用手机号码登录"
                  />
                </Ad.Form.Item>
              </Ad.Input.Group>
            </Ad.Form.Item>
            <Ad.Form.Item>
              <Ad.Form.Item
                name="captcha"
                noStyle
                rules={[
                  { required: true, message: '请输入验证码!' },
                  { len: 6, message: '请输入6位验证码!' },
                ]}
              >
                <Ad.Input style={{ width: '50%' }} placeholder="填写六位短信验证码" />
              </Ad.Form.Item>
              <MdCaptchaButton onSend={handleSend} />
            </Ad.Form.Item>
            <Ad.Form.Item name="password"
              rules={[
                { required: true, message: '请输入密码!' },
                { min: 8, message: '至少需要8位字符!' },
                { pattern:/^(?=.*?[a-z])(?=.*?[A-Z]).*$/, message: '需要包含大小写字母!' },
              ]}
            >
              <Ad.Input.Password placeholder="设置密码" />
            </Ad.Form.Item>
            <Ad.Form.Item name="confirmPassword"
              rules={[
                { required: true, message: '请输入密码!' },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致!'));
                  },
                }),
              ]}
            >
              <Ad.Input.Password placeholder="请再次输入密码" />
            </Ad.Form.Item>
            <Ad.Form.Item name="email"
              rules={[
                {required: true, message: '请输入邮箱!' },
                {type: 'email', message: '请输入正确格式的邮箱!' },
              ]}
            >
              <Ad.Input placeholder="请输入邮箱" />
            </Ad.Form.Item>
            <Ad.Form.Item shouldUpdate>
              {() => {
                return (
                  <Ad.Button type="primary" htmlType="submit"
                    disabled={!form.getFieldValue('agreement')}
                    style={{ width: '100%' }}>
                    立即注册
                  </Ad.Button>
                );
              }}
            </Ad.Form.Item>
            <Ad.Form.Item name="agreement" valuePropName="checked">
              <Ad.Checkbox>
                我已阅读并同意
                <a onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}>《用户使用协议》</a>
              </Ad.Checkbox>
            </Ad.Form.Item>
          </Ad.Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
