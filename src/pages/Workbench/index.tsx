import { PageContainer } from '@ant-design/pro-layout';
import { Avatar, Card, Col, List, Row } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { Link, Dispatch, connect } from 'umi';

import { ModalState } from './model';
import { EditableLink } from './components/EditableLinkGroup';
import { EditableLinkGroup, PageHeader, StatisticCard } from './components';
import { ActivitiesType, CurrentUser, NoticeType, RadarDataType } from './data.d';
import styles from './style.less';

const links: EditableLink[] = [
  {
    title: '园区管理',
    href: '',
  },
  {
    title: '产品管理',
    href: '',
  },
  {
    title: '地址管理',
    href: '',
  },
  {
    title: '基础资料',
    href: '',
  },
  {
    title: '组织结构',
    href: '',
  },
  {
    title: '驿站管理',
    href: '',
  },
  {
    title: '系统设置',
    href: '',
  },
];
interface WorkbenchProps {
  dispatch: Dispatch;
  currentUser?: CurrentUser;
  projectNotice: NoticeType[];
  activities: ActivitiesType[];
  radarData: RadarDataType[];
  currentUserLoading: boolean;
  projectLoading: boolean;
  activitiesLoading: boolean;
}

class Workbench extends Component<WorkbenchProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'workbench/init',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'workbench/clear',
    });
  }

  renderActivities = (item: ActivitiesType) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }

      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  render() {
    const {
      currentUser,
      activities,
      projectNotice,
      projectLoading,
      activitiesLoading,
    } = this.props;

    if (!currentUser || !currentUser.userid) {
      return null;
    }

    return (
      <PageContainer content={<PageHeader currentUser={currentUser} />}>
        <StatisticCard />
        <Row gutter={6}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              title="进行中的项目"
              bordered={false}
              extra={<Link to="/">全部项目</Link>}
              loading={projectLoading}
              style={{ marginBottom: 6 }}
              bodyStyle={{ padding: 0 }}
            >
              {projectNotice.map((item) => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <Link to={item.href}>{item.title}</Link>
                        </div>
                      }
                      description={item.description}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={item.memberLink}>{item.member || ''}</Link>
                      {item.updatedAt && (
                        <span className={styles.datetime} title={item.updatedAt}>
                          {moment(item.updatedAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
            <Card
              title="系统动态"
              bordered={false}
              className={styles.activeCard}
              loading={activitiesLoading}
              bodyStyle={{ padding: 0 }}
            >
              <List<ActivitiesType>
                loading={activitiesLoading}
                renderItem={(item) => this.renderActivities(item)}
                dataSource={activities}
                className={styles.activitiesList}
                size="large"
              />
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="快速开始 / 便捷导航"
              bordered={false}
              style={{ marginBottom: 6 }}
              bodyStyle={{ padding: 0 }}
              extra={<Link to="/">管理入口</Link>}
            >
              <EditableLinkGroup links={links} />
            </Card>
            <Card
              title="消息中心"
              bordered={false}
              loading={projectLoading}
              bodyStyle={{ paddingTop: 6, paddingBottom: 6 }}
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  {projectNotice.map((item) => (
                    <Col span={12} key={`members-item-${item.id}`}>
                      <Link to={item.href}>
                        <Avatar src={item.logo} size="small" />
                        <span className={styles.member}>{item.member}</span>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </PageContainer>
    );
  }
}

export default connect(
  ({
    workbench: { currentUser, projectNotice, activities, radarData },
    loading,
  }: {
    workbench: ModalState;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    currentUser,
    projectNotice,
    activities,
    radarData,
    currentUserLoading: loading.effects['workbench/fetchUserCurrent'],
    projectLoading: loading.effects['workbench/fetchProjectNotice'],
    activitiesLoading: loading.effects['workbench/fetchActivitiesList'],
  }),
)(Workbench);
