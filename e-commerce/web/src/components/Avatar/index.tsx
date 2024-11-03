import React from 'react';
import StyledAvatar from './style';
interface Props {
  src: string;
}

const Avatar: React.FC<Props> = ({ src }) => {
  const avatar = src || 'https://dummyimage.com/400x350';

  return (
    <StyledAvatar>
      <img src={avatar} alt="Avatar" />
    </StyledAvatar>
  );
};

export default Avatar;
