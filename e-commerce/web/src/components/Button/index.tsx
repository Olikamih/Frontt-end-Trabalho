import React from 'react';
import router from 'next/router';
import NextLink, { LinkProps } from 'next/link';

import { PrimaryButton, SecondaryButton } from './style';

const Submit: React.FC<{ type?: 'primary' | 'secondary' }> = ({
  type = 'primary',
  children,
}) => {
  const SubmitButton = type === 'primary' ? PrimaryButton : SecondaryButton;

  return (
    <SubmitButton type="submit">
      {children}
    </SubmitButton>
  );
};

const Link: React.FC<LinkProps> = ({ children, href, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <SecondaryButton {...props} as="a">
        {children}
      </SecondaryButton>
    </NextLink>
  );
};

const ButtonBack: React.FC = () => {
  return (
    <SecondaryButton
      style={{ width: '10rem' }}
      onClick={() => router.back()}
      className="back"
    >
      Voltar
    </SecondaryButton>
  );
};

export { Link, ButtonBack, Submit };
