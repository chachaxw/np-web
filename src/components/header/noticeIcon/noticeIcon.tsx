import { BellFilled } from '@ant-design/icons';
import { Badge, Spin, Tabs } from 'antd';
import classNames from 'classnames';
import useMergeValue from 'use-merge-value';
import React from 'react';

import { Notice } from '@/services/user';
import NoticeList, { NoticeIconTabProps } from './NoticeList';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

const { TabPane } = Tabs;

export interface NoticeIconProps {
  count?: number;
  bell?: React.ReactNode;
  className?: string;
  loading?: boolean;
  popupVisible?: boolean;
  clearText?: string;
  viewMoreText?: string;
  clearClose?: boolean;
  emptyImage?: string;
  style?: React.CSSProperties;
  children?: React.ReactElement<NoticeIconTabProps>[];
  onTabChange?: (tabTile: string) => void;
  onClear?: (tabName: string, tabKey: string) => void;
  onItemClick?: (item: Notice, tabProps: NoticeIconTabProps) => void;
  onViewMore?: (tabProps: NoticeIconTabProps, e: MouseEvent) => void;
  onPopupVisibleChange?: (visible: boolean) => void;
}

const NoticeIcon: React.FC<NoticeIconProps> & {
  Tab: typeof NoticeList;
} = (props) => {
  const getNotificationBox = (): React.ReactNode => {
    const {
      children,
      loading,
      onClear,
      onTabChange,
      onItemClick,
      onViewMore,
      clearText,
      viewMoreText,
    } = props;
    if (!children) {
      return null;
    }
    const panes: React.ReactNode[] = [];
    React.Children.forEach(children, (child: React.ReactElement<NoticeIconTabProps>): void => {
      if (!child) {
        return;
      }
      const { list, title, count, tabKey, showClear, showViewMore } = child.props;
      const len = list && list.length ? list.length : 0;
      const msgCount = count || count === 0 ? count : len;
      const tabTitle: string = msgCount > 0 ? `${title} (${msgCount})` : title;
      panes.push(
        <TabPane tab={tabTitle} key={tabKey}>
          <NoticeList
            clearText={clearText}
            viewMoreText={viewMoreText}
            list={list}
            tabKey={tabKey}
            onClear={(): void => onClear && onClear(title, tabKey)}
            onClick={(item): void => onItemClick && onItemClick(item, child.props)}
            onViewMore={(event): void => onViewMore && onViewMore(child.props, event)}
            showClear={showClear}
            showViewMore={showViewMore}
            title={title}
          />
        </TabPane>,
      );
    });
    return (
      <>
        <Spin spinning={loading} delay={300}>
          <Tabs className={styles.tabs} onChange={onTabChange}>
            {panes}
          </Tabs>
        </Spin>
      </>
    );
  };

  const { className, count, bell } = props;

  const [visible, setVisible] = useMergeValue<boolean>(false, {
    value: props.popupVisible,
    onChange: props.onPopupVisibleChange,
  });
  const noticeButtonClass = classNames(className, styles.noticeButton);
  const notificationBox = getNotificationBox();
  const NoticeBellIcon = bell || <BellFilled className={styles.icon} />;
  const trigger = (
    <span className={classNames(noticeButtonClass, { opened: visible })}>
      <Badge count={count} style={{ boxShadow: 'none' }}>
        {NoticeBellIcon}&nbsp;消息
      </Badge>
    </span>
  );
  if (!notificationBox) {
    return trigger;
  }

  return (
    <HeaderDropdown
      placement="bottomRight"
      overlay={notificationBox}
      overlayClassName={styles.popover}
      trigger={['click']}
      visible={visible}
      onVisibleChange={setVisible}
    >
      {trigger}
    </HeaderDropdown>
  );
};

NoticeIcon.defaultProps = {
  emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
};

NoticeIcon.Tab = NoticeList;

export default NoticeIcon;
