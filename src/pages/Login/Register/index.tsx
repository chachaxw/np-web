import { CaretRightOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Layout,
  message,
  Row,
  Select,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { history, Link } from 'umi';

import { register, RegisterParams, sendPhoneCaptcha } from '@/services/login';
import { AppRoutes } from '../../../../config/constants';

import styles from '../style.less';

const { Title } = Typography;
const { Header, Content } = Layout;

const Login: React.FC<{}> = () => {
  const [form] = Form.useForm();
  const [count, setCount] = useState<number>(59);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (params: RegisterParams) => {
    await register(params);
    history.push('/login');
  };

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
      <Content className={styles.main} style={{ marginLeft: 0 }}>
        <Row justify="space-between">
          <Title level={4} style={{ marginBottom: 16 }}>
            注册
          </Title>
          <Link to={AppRoutes.Login}>
            我有账号, 立即登录
            <CaretRightOutlined />
          </Link>
        </Row>
        <Form
          name="register"
          form={form}
          size="large"
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
              <Input
                placeholder="填写六位短信验证码"
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
          <Form.Item name="agreement" valuePropName="checked" style={{ marginBottom: 0 }}>
            <Checkbox>
              我已阅读并同意
              <Link to="">《用户使用协议》</Link>
            </Checkbox>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Login;
