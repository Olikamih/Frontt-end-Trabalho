import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import getSecondsToExpire from '../utils/jwt';
import { apiRefreshToken } from '../utils/api';
import { getAccount, removeAccount, storeAccount } from '../utils/account';
import { StoreProvider, Account } from '../types/hooks';
import useModal from '../hooks/useModal';
import {
  biggerOrEqualThan,
  lessOrEqualThan,
} from '../utils/validation/validations';

export const ContextAccount = createContext<StoreProvider | null>(null);

const THIRTY_SECONDS = 30,
  TEN_SECONDS = 10;

const Store: React.FC = ({ children }) => {
  const NO_ACCOUNT = {
    id: null,
    name: '',
    avatar: '',
  };

  const router = useRouter();

  const [account, setAccount] = useState<Account>(NO_ACCOUNT);
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const [cart, setCart] = useState<string[]>([]);
  const [createModal, openModal] = useModal();

  const getStorage = useCallback(() => {
    const { account, token, refreshToken } = getAccount();
    if (account) setAccount(account);
    setToken(token);
    setRefreshToken(refreshToken);
  }, []);

  const unauthorize = useCallback(() => {
    createModal.warn({
      message: 'Sua sessão expirou, por favor, refaça o login.',
      okAction: () => {
        removeAccount();
        setAccount(NO_ACCOUNT);
        setToken('');
        setRefreshToken('');
        router.push('/sign-in');
      },
    });

    openModal();
  }, []);

  const refreshAccount = useCallback(() => {
    const refresh = ({ data }: any) => {
      storeAccount({ token: data.token });
      setToken(() => data.token);
    };

    apiRefreshToken().then(refresh).catch(console.error);
  }, []);

  const authorizeAccount = useCallback(() => {
    const hasToRefresh = lessOrEqualThan(
      getSecondsToExpire(token),
      THIRTY_SECONDS
    )();
    const canRefresh = biggerOrEqualThan(
      getSecondsToExpire(refreshToken),
      TEN_SECONDS
    )();

    if (hasToRefresh && canRefresh) {
      refreshAccount();
      return;
    } else if (hasToRefresh) {
      setRefreshToken('');
      unauthorize();
    }
  }, [token, refreshToken]);

  const expireTimer = useCallback(() => {
    const fiveSeconds = 5000;

    const secondsToExpireInterval = setInterval(authorizeAccount, fiveSeconds);

    return () => clearInterval(secondsToExpireInterval);
  }, [token, refreshToken]);

  useEffect(getStorage, []);
  useEffect(() => {
    if (refreshToken) {
      authorizeAccount();
      return expireTimer();
    }
  }, [token, refreshToken]);

  return (
    <ContextAccount.Provider
      value={{
        token,
        account,
        setAccount,
        setToken,
        setRefreshToken,
        cart,
        setCart,
      }}
    >
      {children}
    </ContextAccount.Provider>
  );
};

export default Store;
