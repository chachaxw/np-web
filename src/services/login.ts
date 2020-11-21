import { request } from 'umi';

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

export async function login(params: LoginParams) {
  return request<UserContext.BaseInfo>('/api/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function register(params: RegisterParams) {
  return request<UserContext.BaseInfo>('/api/user/register', {
    method: 'POST',
    data: params,
  });
}

export interface ResetPasswordParams {
  username: string;
  phone: string;
  phoneAreaCode: string;
  captcha: string;
  password: string;
}

export async function resetPassword(params: ResetPasswordParams) {
  return request<UserContext.BaseInfo>('/api/user/resetPassword', {
    method: 'POST',
    data: params,
  });
}

export interface SendPhoneCaptchaParams {
  phone: string;
}

export async function sendPhoneCaptcha(params: SendPhoneCaptchaParams) {
  return request<UserContext.BaseInfo>('/api/user/sendPhoneCaptcha', {
    method: 'POST',
    data: params,
  });
}

export async function outLogin() {
  return request('/api/login/outLogin', {
    method: 'POST',
  });
}
