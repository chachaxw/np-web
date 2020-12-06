import { ArrowUpOutlined, ArrowDownOutlined, LikeOutlined } from '@ant-design/icons';
import { Statistic, Card, Row, Col } from 'antd';
import React from 'react';

import styles from './index.less';

export default () => (
  <div className={styles.container}>
    <div className="site-statistic-demo-card">
      <Row gutter={6}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Unmerged" value={93} suffix="/ 100" />
          </Card>
        </Col>
      </Row>
    </div>
  </div>
);
