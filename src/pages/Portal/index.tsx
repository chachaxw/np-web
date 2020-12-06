import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, notification, Row, Typography } from 'antd';
import randomColor from 'randomcolor';
import React, { ReactNode } from 'react';

import styles from './style.less';

const color = randomColor({
  luminosity: 'dark',
  format: 'rgba',
  alpha: 0.5,
});

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
    name: '基础资料平台',
    desc: '行业资料，地址，SKU，基础资料管理',
    icon: '',
    path: '/system/workbench',
    enabled: true,
  },
  {
    name: '紫晶直播平台',
    desc: '紫晶直播平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶陪玩平台',
    desc: '紫晶陪玩平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶威客平台',
    desc: '紫晶威客平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶课堂平台',
    desc: '紫晶课堂平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶游戏平台',
    desc: '紫晶游戏平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶猎头平台',
    desc: '紫晶猎头平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶商城平台',
    desc: '紫晶商城平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶服务平台',
    desc: '紫晶服务平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶电商平台',
    desc: '紫晶社区电商平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶零售平台',
    desc: '紫晶社区零售平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶医疗平台',
    desc: '紫晶医疗平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶园区平台',
    desc: '紫晶园区平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶智能平台',
    desc: '紫晶智能平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶安防平台',
    desc: '紫晶安防平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },

  {
    name: '紫晶通讯平台',
    desc: '紫晶通讯平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶报价平台',
    desc: '紫晶报价平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶采购平台',
    desc: '紫晶采购平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶客户平台',
    desc: '紫晶客户平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶合同平台',
    desc: '紫晶合同平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶订单平台',
    desc: '紫晶订单平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶运输平台',
    desc: '紫晶运输平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶运力平台',
    desc: '紫晶运力平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶路由平台',
    desc: '紫晶路由平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶调度平台',
    desc: '紫晶调度平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶仓储平台',
    desc: '紫晶仓储平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶结算平台',
    desc: '紫晶结算平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶成本平台',
    desc: '紫晶成本平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶操作平台',
    desc: '紫晶操作平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶质控平台',
    desc: '紫晶质控平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶资产平台',
    desc: '紫晶资产平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶运营平台',
    desc: '紫晶运营平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶财务平台',
    desc: '紫晶财务平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶账单平台',
    desc: '紫晶账单平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶地址平台',
    desc: '紫晶地址平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶接入平台',
    desc: '紫晶接入平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶支付平台',
    desc: '紫晶支付平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶门户平台',
    desc: '紫晶门户平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶鲲鹏平台',
    desc: '紫晶盘古平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶项目平台',
    desc: '紫晶项目平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶营销平台',
    desc: '紫晶营销平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶工单平台',
    desc: '紫晶工单平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶开发平台',
    desc: '紫晶开发平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶敏捷平台',
    desc: '紫晶敏捷平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶流程平台',
    desc: '紫晶流程平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶配置平台',
    desc: '紫晶配置平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶权限平台',
    desc: '紫晶权限平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶认证平台',
    desc: '紫晶认证平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶任务平台',
    desc: '紫晶任务平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶日志平台',
    desc: '紫晶日志平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶通知平台',
    desc: '紫晶通知平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
  },
  {
    name: '紫晶存储平台',
    desc: '紫晶存储平台',
    icon: '',
    path: '/order-manage',
    enabled: false,
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
      <Row gutter={[0, 24]}>
        {list.map((item: PlatformType, index: number) => (
          <Col span={8} key={item.path + index} style={{ textAlign: 'center' }}>
            <Card
              hoverable
              bordered={false}
              className={styles.card}
              bodyStyle={{ textAlign: 'center', padding: '44px 16px' }}
              onClick={() => handleClick(item)}
            >
              <Avatar
                size="large"
                className={styles.icon}
                icon={<AntDesignOutlined />}
                style={{ backgroundColor: color }}
              />
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
