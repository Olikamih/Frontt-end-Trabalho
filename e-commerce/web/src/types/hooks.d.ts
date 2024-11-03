import React, { SetStateAction, Dispatch } from 'react';

export interface Account {
  id: number | null;
  name: string;
  avatar: string;
}

interface Token {
  token: string;
  refreshToken: string;
}

export interface StoreProvider {
  token: string;
  account: Account;
  cart: string[];
  setAccount: Dispatch<SetStateAction<Account>>;
  setToken: Dispatch<SetStateAction<string>>;
  setRefreshToken: Dispatch<SetStateAction<string>>;
  setCart: Dispatch<SetStateAction<string[]>>;
}

export interface CookieStore extends Token {
  account: Account,
}

interface LoginData extends Account {};
interface LoginData extends Token {};

export type Login = ({ data }: { data: LoginData }, path?: string) => void;
/**
 * @returns boolean that indicates true for erros
 */
export type CartAction = (id: string) => boolean;
