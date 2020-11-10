import * as Ad from 'antd';
import * as React from 'react';
import * as Adi from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import Personal from './components/personal'
import DynamicTabs from './dynamic/dynamic'
import styles from './style.less';

interface CardTitleProps {
  lineClass: string
}

interface BlockButtonProps {
  describe?: string;
  fontStyle?: string;
}

const CardTitle: React.FC<CardTitleProps> = (props) => {
  const { lineClass } = props;
  return (
    <div>
      <span className={styles[lineClass]}>
        |
      </span>
      <span className={styles.cardTitle}>
        {props.children}
      </span>
    </div>
  )
}

const BlockButton: React.FC<BlockButtonProps> = (props) => {
  return (
    <div className={styles.blockButton}>
      <div style={{ fontSize: '38px', color: 'rgb(24, 144, 255)' }}>{props.children}</div>
      <span style={{ lineHeight: '10px' }}>{props.describe}</span>
    </div>
  )
}

const WorkBench: React.FC<{}> = () => {
  return (
    <PageContainer >
      <Personal />
      <Ad.Row gutter={1} style={{ marginTop: '2px' }}>
        <Ad.Col span={8}>
          <Ad.Card title={<CardTitle lineClass="lineClass">园区信息</CardTitle>} style={{ width: '100%', height: '100%' }}>
            <Ad.Card.Meta
              avatar={
                <Ad.Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={
                <div>
                  <span>万科云城</span>
                  <Ad.Button type="link">去设置&gt;</Ad.Button>
                  <Ad.Button className={styles.switch} type="link">切换园区</Ad.Button>
                </div>
              }
              description={
                <div style={{ height: '100%' }}>
                  <Ad.Descriptions className={styles.keyValue}>
                    <Ad.Descriptions.Item label="状态">已启用</Ad.Descriptions.Item>
                  </Ad.Descriptions>
                  <Ad.Descriptions className={styles.keyValue}>
                    <Ad.Descriptions.Item label="园区编号">1000432</Ad.Descriptions.Item>
                  </Ad.Descriptions>
                  <Ad.Descriptions className={styles.keyValue}>
                    <Ad.Descriptions.Item label="所属组织">坎德拉科技有限公司</Ad.Descriptions.Item>
                  </Ad.Descriptions>
                  <Ad.Descriptions className={styles.keyValue}>
                    <Ad.Descriptions.Item label="联系地址">深圳市坂田区2栋-1楼</Ad.Descriptions.Item>
                  </Ad.Descriptions>
                </div>
              }
            />
          </Ad.Card>
        </Ad.Col>
        <Ad.Col span={16}>
          <Ad.Card title={<CardTitle lineClass="lineClass">快捷入口</CardTitle>} style={{ width: '100%', height: '100%' }}>
            <div className={styles.BlockButtonList}>
              <BlockButton describe="组织管理">
                <Adi.ShopTwoTone />
              </BlockButton>
              <BlockButton describe="员工管理">
                <Adi.BulbTwoTone />
              </BlockButton>
              <BlockButton describe="用户管理">
                <Adi.UsergroupAddOutlined />
              </BlockButton>
              <BlockButton describe="岗位管理">
                <Adi.SolutionOutlined />
              </BlockButton>
              <BlockButton describe="角色管理">
                <Adi.GoldOutlined />
              </BlockButton>
              <BlockButton describe="模块管理">
                <Adi.LayoutOutlined />
              </BlockButton>
              <BlockButton describe="权限管理">
                <Adi.FormOutlined />
              </BlockButton>
            </div>
            <div style={{ width: '100%' }}><Ad.Button style={{ float: 'right' }} type="link">管理入口<Adi.SettingOutlined /></Ad.Button></div>
          </Ad.Card>
        </Ad.Col>
      </Ad.Row>
      <Ad.Row gutter={1} style={{ marginTop: '2px' }}>
        <Ad.Col span={8}>
          <Ad.Card title={<CardTitle lineClass="lineClass">驿站信息</CardTitle>} style={{ width: '100%', height: '100%' }}>
            <Ad.Card.Meta
              avatar={
                <Ad.Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={
                <div>
                  <span>万科云城驿站</span>
                  <Ad.Button type="link">去设置&gt;</Ad.Button>
                  <Ad.Button className={styles.switch} type="link">切换驿站</Ad.Button>
                </div>
              }
              description={
                <div style={{ height: '100%' }}>
                  <Ad.Descriptions className={styles.keyValue}>
                    <Ad.Descriptions.Item label="状态">已启用</Ad.Descriptions.Item>
                  </Ad.Descriptions>
                  <Ad.Descriptions className={styles.keyValue}>
                    <Ad.Descriptions.Item label="驿站编号">1000432</Ad.Descriptions.Item>
                  </Ad.Descriptions>
                  <Ad.Descriptions className={styles.keyValue}>
                    <Ad.Descriptions.Item label="站长名称">易江</Ad.Descriptions.Item>
                  </Ad.Descriptions>
                  <Ad.Descriptions className={styles.keyValue}>
                    <Ad.Descriptions.Item label="站长电话">15012668650</Ad.Descriptions.Item>
                  </Ad.Descriptions>
                  <Ad.Descriptions className={styles.keyValue}>
                    <Ad.Descriptions.Item label="所属园区">万科云城</Ad.Descriptions.Item>
                  </Ad.Descriptions>
                  <Ad.Descriptions className={styles.keyValue}>
                    <Ad.Descriptions.Item label="联系地址">深圳市南山区万科云城-1楼</Ad.Descriptions.Item>
                  </Ad.Descriptions>
                </div>
              }
            />
          </Ad.Card>
        </Ad.Col>
        <Ad.Col span={16}>
          <Ad.Card bodyStyle={{ padding: 10 }} title={<CardTitle lineClass="lineClass">系统动态</CardTitle>} style={{ width: '100%', height: '100%' }}>
            <DynamicTabs />
          </Ad.Card>
        </Ad.Col>
      </Ad.Row>
    </PageContainer>
  )
}
export default WorkBench
