import * as React from 'react';
import { Button as AdButton } from 'antd';
import { ButtonProps } from 'antd/es/button';
import cname from 'classnames';
import styles from './style.less';

export * from 'antd/es/button';

interface SelfProps {
  clickCallback?: () => Promise<void>;
  supportDisabledTooltip?: boolean,
  maskHorizontal?: boolean,
  mask?: boolean,
  adText?: boolean,
}

export type Props = SelfProps & ButtonProps;

export type Loading = boolean | {
  delay?: number;
};

/**
 * 按钮组件
 */
const Button: React.FC<Props> = ({
  onClick, clickCallback, loading = false, children, mask = true, shape,
  supportDisabledTooltip, type, className, maskHorizontal = true, adText = false,
  ...other }) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [buttonLoading, setButtonLoading] = React.useState<Loading>(loading);

  let isDestroy: boolean = false;
  React.useEffect(()=> {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isDestroy = true;
    };
  }, []);

  function wrapperOnClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    onClick && onClick(event);
    if (clickCallback) {
      setButtonLoading(true);
      clickCallback().finally(() => {
        !isDestroy && setButtonLoading(loading);
      });
    }
  }

  const isTextButton = ['text', 'link'].includes(type || '') && !adText;

  return (<AdButton ref={ref} {...other} onClick={wrapperOnClick}
    className={cname(className, styles[shape || ''], {
      [styles.link]: type === 'link' && !adText,
      [styles.text]: type === 'text' && !adText,
      [styles.hasMask]: isTextButton,
    })}
    loading={buttonLoading} type= {type} shape={shape}>
      {children}
      {isTextButton && mask ? (<div className={cname(styles.mask, {
        [styles.horizontal]: maskHorizontal,
      })} />): undefined}
    </AdButton>);
};

export default Button;
