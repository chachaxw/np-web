import { DesktopOutlined, QuestionCircleFilled } from '@ant-design/icons';
import React from 'react';
import { Space } from 'antd';

import AvatarDropdown from './AvatarDropdown';
import NoticeIcon from './NoticeIcon';
import styles from './style.less';

export interface Props {
  enableRightContent?: boolean;
}

const Header: React.FC<Props> = ({ enableRightContent = false }) => (
  <header className={styles.header}>
    <DesktopOutlined className={styles.logo} />
    <span className={styles.title}>紫晶 . 涅槃信息化生态</span>
    <span className={styles.subTitle}>v2.0.0</span>
    {enableRightContent ? (
      <div className={styles.rightContent}>
        <Space size="large">
          <NoticeIcon />
          <span
            className={styles.action}
            onClick={() => {
              window.location.href = 'https://pro.ant.design/docs/getting-started';
            }}
          >
            <QuestionCircleFilled />
            &nbsp;&nbsp;帮助中心
          </span>
          <AvatarDropdown />
        </Space>
      </div>
    ) : undefined}
  </header>
);

export default Header;
