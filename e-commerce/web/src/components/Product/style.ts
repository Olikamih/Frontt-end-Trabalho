import styled from 'styled-components';
import Animation from '../../types/animation';
import { FlexContainer } from '../Container/style';

const ListItem = styled(FlexContainer).attrs(props => ({
  as: 'li',
  ...props,
}))<Animation>`
  animation: show-product
    ${({ duration, delay, fill, cubic }) =>
      `${duration} ${delay || 0} ${fill || ''} ${cubic || ''}`};

  width: 100%;
  padding: 1.5rem;
  align-items: center;
  opacity: 0;

  box-shadow: 0 -4px 0 ${({ theme }) => theme.colors.secondary},
    0 0 16px 8px ${({ theme }) => theme.colors.shadow};
  background-color: white;

  transform: translateY(-6.4rem);

  img {
    width: 100%;
    object-fit: cover;
    margin-bottom: 2rem;
  }

  @keyframes show-product {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ProductContent = styled(FlexContainer).attrs(() => ({
  className: 'content',
}))`
  width: 100%;
  height: 100%;

  .info {
    height: 100%;
  }

  .description {
    font-size: 1.6rem;
  }

  .price {
    font-size: 2.4rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default ListItem;
