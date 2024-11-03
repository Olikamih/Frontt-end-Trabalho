import styled from 'styled-components';
import Container from '../Container/style';

const ModalContainer = styled(Container).attrs(p => ({ ...p, as: 'div' }))`
  width: 100%;
  max-width: 40rem;
  margin: 0;
  background-color: ${({ theme }) => theme.colors.background};

  transform-style: preserve-3d;

  &.action .buttons {
    column-gap: 2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .message {
    font-size: 1.8rem;
    font-weight: 500;
    text-align: center;
  }

  hr {
    width: 100%;
    height: 0.3rem;
    border: none;
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  .buttons {
    width: 100%;
  }
`;

const Background = styled.div`
  position: fixed;

  display: grid;
  place-items: center;
  background-color: ${({ theme }) => theme.colors.shadow};

  top: 0;
  bottom: 0;

  left: 0;
  right: 0;
`;

export { ModalContainer, Background };
