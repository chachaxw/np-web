import { AntDesignOutlined } from '@ant-design/icons';
import { Image, Card, Col, notification, Row, Typography } from 'antd';
import React, { ReactNode } from 'react';

import styles from './style.module.less';

type PlatformType = {
  name: string;
  desc: string;
  path: string;
  icon: string;
  enabled: boolean;
};

const { Text, Title } = Typography;

const list: PlatformType[] = [
  {
    name: '订单管理平台',
    desc: '外部供应商客户渠道订单信息接入',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '操作管理平台',
    desc: '快递物流业务操作管理',
    icon: '',
    path: '/operation-manage',
    enabled: false,
  },
  {
    name: '设备管控平台',
    desc: '智能硬件设备升级，监控管理',
    icon: '',
    path: '/device-manage',
    enabled: false,
  },
  {
    name: '结算管理平台',
    desc: '客户业务订单数据结算',
    icon: '',
    path: '/settle-manage',
    enabled: false,
  },
  {
    name: '权限管理平台',
    desc: '对用户进行鉴权认证，授权管理',
    icon: '',
    path: '/auth-manage',
    enabled: false,
  },
  {
    name: '数据分析平台',
    desc: '大数据分析统计，报表查询导出',
    icon: '',
    path: '/monitor-center',
    enabled: true,
  },
  {
    name: '基础资料平台',
    desc: '行业资料，地址，SKU，基础资料管理',
    icon: '',
    path: '/basic/hub-manage',
    enabled: true,
  },
  {
    name: '共享业务平台',
    desc: '对投柜、呼叫、滞留件的订单管理，业务规则设置',
    icon: '',
    path: '/share/order-manage',
    enabled: true,
  },
];

export default (props: any): ReactNode => {
  const handleClick = (item: PlatformType) => {
    if (item.enabled) {
      props.history.push(item.path);
    } else {
      notification.info({ message: '平台未开通!' });
    }
  };

  return (
    <div className={styles['portal-layout']}>
      <Row gutter={[32, 32]}>
        {list.map((item: PlatformType) => (
          <Col xs={24} md={12} xl={8} key={item.path}>
            <Card
              hoverable
              bordered={false}
              bodyStyle={{ textAlign: 'center', padding: 32 }}
              onClick={() => handleClick(item)}
            >
              <AntDesignOutlined />
              <Title level={4} style={{ marginTop: 16 }}>
                {item.name}
              </Title>
              <Text>{item.desc}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
