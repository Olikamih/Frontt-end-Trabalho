import { useContext } from 'react';
import router from 'next/router';

import { Login } from '../types/hooks';
import { ContextAccount } from '../providers/StoreProvider';
import { storeAccount, removeAccount } from '../utils/account';

const useAccount = () => {
  const ctx = useContext(ContextAccount);
  if (!ctx) throw new Error('useAccount must be used within AccountProvider');

  const { account, token, setAccount, setToken, setRefreshToken } = ctx;

  const login: Login = ({ data }, path = '/') => {
    const { id, avatar = '', name, token, refreshToken } = data;
    if (id && token && refreshToken) {
      removeAccount();

      storeAccount({
        account: { id, avatar, name },
        token,
        refreshToken,
      });
      setRefreshToken(refreshToken);
      setAccount({ id, avatar, name });
      setToken(token);
    }

    router.push(path);
  };

  const logout = () => {
    setAccount({ id: null, avatar: '', name: '' });
    setToken('');
    setRefreshToken('');
    removeAccount();

    router.push('/');
  };

  return {
    account,
    token,
    login,
    logout,
  };
};

export default useAccount;
