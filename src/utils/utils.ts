/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

/**
 * setStorage: 设置localStorage数据
 * @param key
 * @param target
 */
export const setStorage = (key: string, target: any): void => {
  const value = JSON.stringify(target);
  localStorage.setItem(key, value);
};

/**
 * getStorage: 获取localStorage数据
 * @param key
 */
export const getStorage = <T>(key: string): T => {
  const value = localStorage.getItem(key);

  try {
    return JSON.parse(value as string);
  } catch {
    return (value as unknown) as T;
  }
};

/**
 * removeStorage: 移除localStorage数据
 * @param key
 */
export const removeStorage = (key: string): void => {
  localStorage.removeItem(key);
};
