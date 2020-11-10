
import React from 'react';
import * as Ad from 'antd';
import * as Adi from '@ant-design/icons';
import styles from './style.less';
import AvatarDropdown from './avatarDropdown';
import NoticeIcon from './noticeIcon';

export interface Props {
  enableRightContent?: boolean,
}

const Header: React.FC<Props> = ({ enableRightContent = false }) => (
  <header className={styles.header}>
    <Adi.DesktopOutlined className={styles.logo} />
    <span className={styles.title}>紫晶 . 涅槃信息化生态</span>
    <span className={styles.subTitle}>v2.0.0</span>
    {enableRightContent ? (<div className={styles.rightContent}>
      <Ad.Space size="large">
        <NoticeIcon />
        <span className={styles.action}
          onClick={() => {
            window.location.href = 'https://pro.ant.design/docs/getting-started';
          }}>
          <Adi.QuestionCircleFilled />&nbsp;&nbsp;帮助中心
        </span>
        <AvatarDropdown />
      </Ad.Space>
    </div>) : undefined }
  </header>
);

export default Header;
