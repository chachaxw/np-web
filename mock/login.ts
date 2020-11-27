import { Request, Response } from 'express';

export default {
  'POST /api/user/login': {
    id: 'xxxxx',
    name: 'Jake',
    accessToken: 'xxxxxx',
    unreadCount: 11,
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    job: '产品经理',
    company: '紫晶科技',
    position1: '产品中心',
    position2: '产品部',
    position3: '产品组',
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
