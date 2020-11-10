import * as React from 'react';
import * as Adi from '@ant-design/icons';

export interface Props {
  icon: string,
};

const Icons: {
  [propName: string]: typeof Adi.SafetyOutlined,
} = {
  SafetyOutlined: Adi.SafetyOutlined,
  HomeOutlined: Adi.HomeOutlined,
};

const MenuIcon: React.FC<Props> = ({ icon }: Props) => {
  const IconComp = Icons[icon];
  return (
    <IconComp />
  );
};

export default MenuIcon;
