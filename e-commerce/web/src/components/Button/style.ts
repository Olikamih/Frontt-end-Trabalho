import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: pointer;
  height: 4.5rem;
  padding: 0.4em 1em;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.6rem;
  font-weight: bold;
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.95) !important;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const PrimaryButton = styled(StyledButton)`
  width: 100%;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};

  &:hover {
    transform: scale(1.01);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.background},
      0 0 0 4px ${({ theme }) => theme.colors.primary};
  }
`;

const SecondaryButton = styled(StyledButton)`
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  color: ${({ theme }) => theme.colors.secondary};
  border: 2px solid ${({ theme }) => theme.colors.secondary};

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.secondary};

    z-index: -1;
    transform: translateY(100%);
    transition: transform 250ms ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};

    &::before {
      transform: translateX(0);
    }
  }

  &:focus {
    outline: none;
    color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.background},
      0 0 0 4px ${({ theme }) => theme.colors.secondary};

    &::before {
      transform: translateX(0);
    }
  }
`;

export { PrimaryButton, SecondaryButton };