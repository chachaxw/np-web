import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar, Card, Row } from 'antd';
import React, { CSSProperties } from 'react';
import { Link } from 'umi';

import styles from './index.less';

export interface EditableLink {
  title: string;
  href: string;
  icon?: string;
  id?: string;
}

interface EditableLinkGroupProps {
  links: EditableLink[];
}

const gridStyle: CSSProperties = {
  width: '50%',
  textAlign: 'center',
  backgroundColor: 'white',
};

const EditableLinkGroup: React.FC<EditableLinkGroupProps> = (props) => {
  const { links } = props;

  return (
    <Row className={styles.linkGroup} gutter={2}>
      {links.map((item, index) => (
        <Card.Grid style={gridStyle} key={index}>
          <Link to={item.href}>
            <Avatar src={item.icon} icon={<AntDesignOutlined />} size="small" />
            <span className={styles.title}>{item.title}</span>
          </Link>
        </Card.Grid>
      ))}
    </Row>
  );
};

EditableLinkGroup.defaultProps = {
  links: [],
};

export default EditableLinkGroup;
