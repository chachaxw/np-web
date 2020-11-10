import * as Ad from 'antd';
import * as React from 'react';
import Header from '@/components/header';
import { getSystemList, System } from '@/services/system'
import styles from './style.less';
import Card from './components/card'

const Systems: React.FC<{}> = () => {
  const [systemList, setSystemList] = React.useState<System[]>([]);

  const getSystems = async () => {
    const res = await getSystemList();
    setSystemList(res.data)
  }
  React.useEffect(() => {
    getSystems()
  }, []);

  return (
    <div className={styles.page}>
      <Header enableRightContent />
      <div className={styles.content}>
        <Ad.Row gutter={[0, 36]}>
          {systemList.map((system) => {
            return (
              <Ad.Col onClick={() => {
                if (typeof system.href === 'string') {
                  window.location.href = system.href
                }
              }} key={system.id} span={8}>
                <Card showHeart={system.collection} icon={system.icon} title={system.title} describe={system.desc} />
              </Ad.Col>
            )
          })}
        </Ad.Row>
      </div>
    </div>
  )
}

export default Systems
