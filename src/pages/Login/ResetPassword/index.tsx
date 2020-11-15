import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Select, Typography } from 'antd';
import React from 'react';
import { history, Link } from 'umi';

import { resetPassword, ResetPasswordParams } from '@/services/login';
import { AppRoutes } from '../../../../config/constants';
import styles from '../style.less';

const { Title } = Typography;

const Login: React.FC<{}> = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (params: ResetPasswordParams) => {
    await resetPassword(params);
    history.push('/login');
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.main}>
          <Title level={4}>重置密码</Title>
          <Form
            name="reset"
            form={form}
            initialValues={{
              agreement: true,
              phoneAreaCode: '86',
            }}
            onFinish={handleSubmit}
          >
            <Form.Item>
              <Input.Group compact>
                <Form.Item name="phoneAreaCode" noStyle>
                  <Select style={{ width: '30%' }}>
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
                  <Input style={{ width: '70%' }} placeholder="今后使用手机号码登录" />
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
            <Form.Item shouldUpdate>
              {() => {
                return (
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!form.getFieldValue('agreement')}
                    style={{ width: '100%' }}
                  >
                    确认
                  </Button>
                );
              }}
            </Form.Item>
            <Form.Item name="agreement" valuePropName="checked" noStyle>
              <Checkbox>
                我已阅读并同意
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  《用户使用协议》
                </a>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Link to={AppRoutes.Login}>
                我有账号, 立即登录
                <CaretRightOutlined />
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
