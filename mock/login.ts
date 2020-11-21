import { Request, Response } from 'express';

export default {
  'POST /api/user/login': (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '123456') {
      res.send({
        name: 'joyerli',
        accessToken: 'xxxxxx',
        unreadCount: 11,
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        job: '产品经理',
        company: '紫晶科技',
        position1: '产品中心',
        position2: '产品部',
        position3: '产品组',
      });
      return;
    }
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: '错误的验证码',
      message: '错误的验证码',
    });
  },

  'POST /api/user/register': (req: Request, res: Response) => {
    res.send({
      status: true,
    });
  },

  'POST /api/user/reset-password': (req: Request, res: Response) => {
    res.send({
      status: true,
    });
  },

  'POST /api/login/logout': (req: Request, res: Response) => {
    res.send({
      status: true,
    });
  },
};
