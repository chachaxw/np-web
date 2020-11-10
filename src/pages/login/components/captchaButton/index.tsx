import * as React from 'react';
import * as Ad from 'antd';
import { sendPhoneCaptcha, SendPhoneCaptchaParams } from '@/services/login';

export interface Props {
  onSend: () => Promise<SendPhoneCaptchaParams>,
}

const TEXT = '获取短信验证码';

const CaptchaButton: React.FC<Props> = ({ onSend }: Props) => {
  const [text, setText] = React.useState<string>(TEXT);
  const [timer, setTimer] = React.useState<any>('');

  const callbackRef = React.useRef<Noop>();

  React.useEffect(() => {
    callbackRef.current = () => {
      const number = Number.parseInt(text, 10);
      if (number <= 0 ) {
        timer && clearInterval(timer);
        setText(TEXT);
        return;
      }
      setText(`${number - 1}s`);
    };
  });

  const handleClick = async () => {
    const params = await onSend();
    await sendPhoneCaptcha(params);
    setText('90s');
    timer && clearInterval(timer);
    const newTimer = setInterval(() => callbackRef.current?.(), 1000);
    setTimer(newTimer);
  }

  return (
    <Ad.Button style={{ width: 'calc(50% - 12px)', marginLeft: '12px' }}
      disabled={text !== TEXT}
      onClick={() => handleClick()}>
      { text }
    </Ad.Button>
  );
};

export default CaptchaButton;
