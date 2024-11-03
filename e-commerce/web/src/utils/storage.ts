import Cookies, { CookieGetOptions, CookieSetOptions } from 'universal-cookie';

const cookie = new Cookies();

const defaultOptions = {
  path: '/',
};

export const getCookie = (name: string, options: CookieGetOptions = {}) => {
  if (!name) return null;
  return cookie.get(name, { ...defaultOptions, ...options });
};

export const setCookie = (
  name: string,
  value: any,
  options: CookieSetOptions = {}
) => {
  if (!name || !value) return null;
  cookie.set(name, value, { ...defaultOptions, ...options });

  return true;
};

export const removeCookie = (name: string, options: any = {}) => {
  if (!name) return null;
  cookie.remove(name, { ...defaultOptions, ...options });
};
