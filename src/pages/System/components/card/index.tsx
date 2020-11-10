import * as Ad from 'antd';
import * as React from 'react';
import * as Adi from '@ant-design/icons';
import styles from './style.less';

interface PlatformCardProps {
  showHeart?: boolean;
  icon?: string;
  title?: string;
  describe?: string
}

const PlatformCard:React.FC<PlatformCardProps>= (props)=> {
  return(
    <Ad.Card bodyStyle={{padding:10}} hoverable className={styles.card}>
      {props.showHeart?(
        <Adi.HeartFilled className={styles.heart} />
      ):undefined}
      <img className={styles.icon} src={props.icon} alt=""/>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.describe}>{props.describe}</div>
    </Ad.Card>
  )
}

export default PlatformCard
