import * as React from 'react';
import cname from 'classnames';
import Button, { Props as ButtonProps, ButtonSize, } from '../Button';
import styles from './style.less';

export * from '../Button';

interface SelfProps {
  horizontal?: Boolean,
  maskClass?: String,
  size?: ButtonSize | null,
}

export type ActionProps = SelfProps & Omit<ButtonProps, 'type' | 'size'>;

const Action: React.FC<ActionProps> = ({
  size = 'middle', horizontal = true, maskClass, className, children,
  ...other
}) => {

  const resetClassName = cname(className, styles.action);

  return (<Button {...other} className={resetClassName} type='link'>
    {children}
    <div className={cname(maskClass, styles.mask,
      horizontal ? styles.horizontal : '',
      styles[size || ''])} />
  </Button>);
};

export default Action;
