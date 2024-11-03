import React, { memo } from 'react';
import Link from '../Link';

import useAccount from '../../hooks/useAccount';
import StyledHeader from './style';
import Avatar from '../Avatar';

const DefaultItems: React.FC = () => (
  <>
    <li>
      <Link href="/products">Início</Link>
    </li>

    <li>
      <Link href="/cart">Carrinho</Link>
    </li>
  </>
);

const Header: React.FC = () => {
  const { account } = useAccount();

  const GuestItem = (
    <li>
      <Link href="/sign-in">Entrar</Link>
    </li>
  );

  const UserItem = (
    <li>
      <Link href="/account">
        <Avatar src={account.avatar} />
      </Link>
    </li>
  );

  return (
    <StyledHeader as="header">
      <nav>
        <ul className="list">
          <DefaultItems />

          {account.id != null ? UserItem : GuestItem}
        </ul>
      </nav>
    </StyledHeader>
  );
};

export const AccountHeader: React.FC = () => {
  const { logout } = useAccount();

  return (
    <StyledHeader as="header">
      <nav>
        <ul className="list">
          <DefaultItems />
          <li onClick={logout}>
            <Link href="/">Sair</Link>
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default memo(Header);
