/* eslint-disable no-useless-escape */
export const URLReg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const UsernameReg = /^[0-9a-z]{5,32}$/i;

export const PhoneReg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;

export const PasswordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,32}$/;

export const FloorReg = /^(((-?\d*[A-Z]?_?[A-Z]?)|(-?\d+)[~～](-?\d+))[ ,，]+)*((-?\d*[A-Z]?_?[A-Z]?)|(-?\d+)[~～](-?\d+))$/;

export const NumberReg = /^[0-9]*$/g;

export const EnglishNameReg = /^[a-z][a-z\s]*$/gi;

export const TwoLettersReg = /^[a-z]{2}$/gi;

export const ThreeLettersReg = /^[a-z]{3}$/gi;

export const FourLettersReg = /^[a-z]{4}$/gi;

export const ShortCodeReg = /^[a-z_]*$/gi;

export const NotEmptyReg = /^(?!(\s+$))/g;
