import { Avatar, Skeleton } from 'antd';
import React from 'react';

import styles from './style.less';

interface Props {
  currentUser: any;
}

const PageHeaderContent: React.FC<Props> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;

  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }

  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          早安，
          {currentUser.name}
          ，祝你开心每一天！
        </div>
        <div>
          {currentUser.title} | {currentUser.group}
        </div>
      </div>
    </div>
  );
};

export default PageHeaderContent;
