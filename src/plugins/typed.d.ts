import { Settings as LayoutSettings } from '@ant-design/pro-layout';

export interface InitialState {
  settings?: LayoutSettings;
  currentUser?: any;
  fetchUserInfo: () => Promise<any>;
}
