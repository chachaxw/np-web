import { request } from 'umi';
import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  USER_RESET_PASSWORD,
  USER_SEND_CAPTCHA,
} from './ApiUrl';
import { RequestMethod } from './config';

export interface LoginFormParams {
  username: string;
  password: string;
  captcha: string;
}

export interface RegisterParams {
  username: string;
  phone: string;
  phoneAreaCode: string;
  captcha: string;
  password: string;
  email: string;
  agreement: string;
}

export interface ResetPasswordParams {
  username: string;
  phone: string;
  phoneAreaCode: string;
  captcha: string;
  password: string;
}

export interface SendPhoneCaptchaParams {
  phone: string;
}

export async function login(
  params: LoginFormParams,
): Promise<API.ResponseData<UserContext.BaseInfo>> {
  return request(USER_LOGIN, {
    method: RequestMethod.post,
    data: params,
  });
}

export async function register(
  params: RegisterParams,
): Promise<API.ResponseData<UserContext.BaseInfo>> {
  return request(USER_REGISTER, {
    method: RequestMethod.post,
    data: params,
  });
}

export async function resetPassword(
  params: ResetPasswordParams,
): Promise<API.ResponseData<UserContext.BaseInfo>> {
  return request(USER_RESET_PASSWORD, {
    method: RequestMethod.post,
    data: params,
  });
}

export async function sendPhoneCaptcha(
  params: SendPhoneCaptchaParams,
): Promise<API.ResponseData<UserContext.BaseInfo>> {
  return request(USER_SEND_CAPTCHA, {
    method: RequestMethod.post,
    data: params,
  });
}

export async function logout() {
  return request(USER_LOGOUT, { method: RequestMethod.post });
}
