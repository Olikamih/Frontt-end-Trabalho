import NextLink, { LinkProps } from 'next/link';
import styled from 'styled-components';

export const StyledLink = styled.a`
  height: 100%;
  padding: 1rem;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.title};
  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.5s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Link: React.FC<LinkProps> = ({ children, href, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <StyledLink {...props} as="a">{children}</StyledLink>
    </NextLink>
  );
};

export default Link;
