import React from 'react';
import styled from 'styled-components';
import Avatar from '../Avatar';

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;

  .name {
    font-size: 1.4rem;
    font-weight: bold;
    margin-left: 2rem;
  }
`;

const User: React.FC<{ avatar: string; name: string }> = ({ avatar, name }) => (
  <UserContainer>
    <Avatar src={avatar} />
    <span className="name">{name}</span>
  </UserContainer>
);

export default User;
