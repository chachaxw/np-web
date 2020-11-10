
import React from 'react';
import * as Ad from 'antd';
import { useModel } from 'umi'
import styles from './style.less';

const Personal: React.FC<{}> = () => {
  const { initialState } = useModel('@@initialState');
  return (
    <div className={styles.page}>
      <Ad.Row className={styles.row}>
        <Ad.Col span={3}>
          <Ad.Avatar src={initialState?.currentUser?.avatar} size={128} />
        </Ad.Col>
        <Ad.Col span={21}>
          <div className={styles.title}>早安 ，{initialState?.currentUser?.name}，祝你开心每一天！</div>
          <div className={styles.detail}>{initialState?.currentUser?.job} |
        {initialState?.currentUser?.company}-{initialState?.currentUser?.position1}-
          {initialState?.currentUser?.position2}-
          {initialState?.currentUser?.position3}
          </div>
        </Ad.Col>
      </Ad.Row>
    </div>
  )
}

export default Personal;
