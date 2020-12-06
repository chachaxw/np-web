import { Divider, Layout, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { useModel, history, Link } from 'umi';

import { login, LoginFormParams } from '@/services/login';
import { LocalStorageKey } from '@/utils/constants';
import { removeStorage, setStorage } from '@/utils/utils';
import { PwdForm, MobileForm } from './components';
import { AppRoutes } from '../../../config/constants';
import styles from './style.less';

const { Title } = Typography;
const { Header, Content } = Layout;

interface LoginFormType extends LoginFormParams {
  remembered: boolean;
}

const Login: React.FC<{}> = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const title = visible ? '手机号验证码' : '用户名密码';

  const handleSubmit = async (values: LoginFormType) => {
    setSubmitting(true);

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

    setSubmitting(false);
  };

  const handleCodeSubmit = () => {};

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
      <Content className={styles.main}>
        <Title level={4} style={{ marginBottom: 16 }}>
          {title}登录
        </Title>
        {visible ? (
          <MobileForm
            loading={submitting}
            onSubmit={handleCodeSubmit}
            switchLogin={() => setVisible(false)}
          />
        ) : (
          <PwdForm
            loading={submitting}
            onSubmit={handleSubmit}
            switchLogin={() => setVisible(true)}
          />
        )}
        <Row style={{ marginTop: 24 }} justify="center" align="middle">
          <Link to={AppRoutes.ResetPassword}>忘记密码</Link>
          <Divider type="vertical" />
          <Link to={AppRoutes.Register}>注册</Link>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;
