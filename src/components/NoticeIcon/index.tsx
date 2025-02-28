import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Tag, message } from 'antd';
import { groupBy } from 'lodash';
import moment from 'moment';
import { useModel } from 'umi';

import { queryNotices, Notice } from '@/services/user';
import NoticeIcon from './NoticeIcon';
import styles from './index.less';

const getNoticeData = (
  notices: Notice[],
): {
  [key: string]: Notice[];
} => {
  if (!notices || notices.length === 0 || !Array.isArray(notices)) {
    return {};
  }

  const newNotices = notices.map((notice) => {
    const newNotice = { ...notice };

    if (newNotice.datetime) {
      newNotice.datetime = moment(notice.datetime as string).fromNow();
    }

    if (newNotice.id) {
      newNotice.key = newNotice.id;
    }

    if (newNotice.extra && newNotice.status) {
      const color = {
        todo: '',
        processing: 'blue',
        urgent: 'red',
        doing: 'gold',
      }[newNotice.status];
      newNotice.extra = (
        <Tag
          color={color}
          style={{
            marginRight: 0,
          }}
        >
          {newNotice.extra}
        </Tag>
      );
    }

    return newNotice;
  });
  return groupBy(newNotices, 'type');
};

const getUnreadData = (noticeData: { [key: string]: Notice[] }) => {
  const unreadMsg: {
    [key: string]: number;
  } = {};
  Object.keys(noticeData).forEach((key) => {
    const value = noticeData[key];

    if (!unreadMsg[key]) {
      unreadMsg[key] = 0;
    }

    if (Array.isArray(value)) {
      unreadMsg[key] = value.filter((item) => !item.read).length;
    }
  });
  return unreadMsg;
};

export interface GlobalHeaderRightProps {
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onNoticeClear?: (tabName?: string) => void;
}

const NoticeIconView = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [notices, setNotices] = useState<Notice[]>([]);
  const isDestroyRef = useRef<boolean>(false);

  useEffect(() => {
    queryNotices().then(({ data }) => {
      !isDestroyRef.current && setNotices(data);
    });
    return () => {
      isDestroyRef.current = true;
    };
  }, []);

  const noticeData = getNoticeData(notices);
  const unreadMsg = getUnreadData(noticeData || {});

  const changeReadState = useCallback((id: string) => {
    setNotices(
      notices.map((item) => {
        const notice = { ...item };
        if (notice.id === id) {
          notice.read = true;
        }
        return notice;
      }),
    );
  }, []);

  const clearReadState = (title: string, key: string) => {
    setNotices(
      notices.map((item) => {
        const notice = { ...item };
        if (notice.type === key) {
          notice.read = true;
        }
        return notice;
      }),
    );
    message.success(`${'清空了'} ${title}`);
  };

  return (
    <NoticeIcon
      className={styles.action}
      count={currentUser?.unreadCount}
      onItemClick={(item) => {
        changeReadState(item.id);
      }}
      clearClose
      loading={false}
      clearText="清空"
      viewMoreText="查看更多"
      onViewMore={() => message.info('Click on view more')}
      onClear={(title: string, key: string) => clearReadState(title, key)}
    >
      <NoticeIcon.Tab
        tabKey="notification"
        count={unreadMsg.notification}
        list={noticeData.notification}
        title="通知"
        emptyText="你已查看所有通知"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="message"
        count={unreadMsg.message}
        list={noticeData.message}
        title="消息"
        emptyText="您已读完所有消息"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="event"
        title="待办"
        emptyText="你已完成所有待办"
        count={unreadMsg.event}
        list={noticeData.event}
        showViewMore
      />
    </NoticeIcon>
  );
};

export default NoticeIconView;
