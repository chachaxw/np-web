import React from 'react';
import moment from 'moment';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter links={[]} copyright={`${moment().year()} 紫晶 . 涅槃信息化生态`} />
);
