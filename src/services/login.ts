import { request } from 'umi';
import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  USER_RESET_PASSWORD,
  USER_SEND_CAPTCHA,
} from './ApiUrl';
import { RequestMethod } from './config';

export interface LoginParams {
  username: string;
  password: string;
  captcha: string;
  remember: string;
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

export async function login(params: LoginParams) {
  return request<UserContext.BaseInfo>(USER_LOGIN, {
    method: RequestMethod.post,
    data: params,
  });
}

export async function register(params: RegisterParams) {
  return request<UserContext.BaseInfo>(USER_REGISTER, {
    method: RequestMethod.post,
    data: params,
  });
}

export async function resetPassword(params: ResetPasswordParams) {
  return request<UserContext.BaseInfo>(USER_RESET_PASSWORD, {
    method: RequestMethod.post,
    data: params,
  });
}

export async function sendPhoneCaptcha(params: SendPhoneCaptchaParams) {
  return request<UserContext.BaseInfo>(USER_SEND_CAPTCHA, {
    method: RequestMethod.post,
    data: params,
  });
}

export async function logout() {
  return request(USER_LOGOUT, { method: RequestMethod.post });
}
