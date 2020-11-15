import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { history, Link } from 'umi';

import { register, RegisterParams } from '@/services/login';
import { AppRoutes } from '../../../../config/constants';

import styles from '../style.less';

const Login: React.FC<{}> = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (params: RegisterParams) => {
    await register(params);
    history.push('/login');
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.main} style={{ marginLeft: 0 }}>
          <Row justify="space-between" style={{ paddingTop: 12, paddingBottom: 12 }}>
            <span>注册</span>
            <Link to={AppRoutes.Login}>
              我有账号, 立即登录
              <CaretRightOutlined />
            </Link>
          </Row>
          <Form
            name="register"
            form={form}
            initialValues={{
              agreement: true,
              phoneAreaCode: '86',
            }}
            onFinish={handleSubmit}
          >
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item>
              <Input.Group compact>
                <Form.Item name="phoneAreaCode" noStyle>
                  <Select style={{ width: '40%' }}>
                    <Select.Option value="86">中国+86</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: '请输入手机号码!' },
                    {
                      pattern: /^1\d{10}$/,
                      message: '手机号格式错误！',
                    },
                  ]}
                  noStyle
                >
                  <Input style={{ width: '60%' }} placeholder="今后使用手机号码登录" />
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  { required: true, message: '请输入验证码!' },
                  { len: 6, message: '请输入6位验证码!' },
                ]}
              >
                <Input style={{ width: '50%' }} placeholder="填写六位短信验证码" />
              </Form.Item>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码!' },
                { min: 8, message: '至少需要8位字符!' },
                { pattern: /^(?=.*?[a-z])(?=.*?[A-Z]).*$/, message: '需要包含大小写字母!' },
              ]}
            >
              <Input.Password placeholder="设置密码" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
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
              <Input.Password placeholder="请再次输入密码" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: '请输入邮箱!' },
                { type: 'email', message: '请输入正确格式的邮箱!' },
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => {
                return (
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    disabled={!form.getFieldValue('agreement')}
                  >
                    立即注册
                  </Button>
                );
              }}
            </Form.Item>
            <Form.Item name="agreement" valuePropName="checked">
              <Checkbox>
                我已阅读并同意
                <Link to="">《用户使用协议》</Link>
              </Checkbox>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
