import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 100%;
  min-height: 4.5rem;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.shadow};
  background-color: ${({ theme }) => theme.colors.background};

  padding: 0.5em;
  box-shadow: 0 8px 16px ${({ theme }) => theme.colors.shadow};

  font-size: 1.6rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
  }
`;

const InputField = styled.div`
  label {
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .input {
    position: relative;
    font-size: 1.8rem;
  }

  .input::after {
    content: '';

    position: absolute;
    width: calc(100% - 4px);
    height: 0.2em;

    border-radius: 0 0 0.5rem 0.5rem;
    background-color: initial;

    bottom: 2px;
    left: 0;
    transform: translateX(2px);
    transition: background-color 250ms ease-in;
  }

  .input:focus-within ::after {
    background-color: ${({ theme }) => theme.colors.valid};
  }

  &.invalid .input:focus-within ::after {
    background-color: tomato;
  }

  .invalid-error {
    margin-left: 1rem;
    color: tomato;

    &::before {
      content: '*';
    }
  }
`;

export { Input, InputField };
