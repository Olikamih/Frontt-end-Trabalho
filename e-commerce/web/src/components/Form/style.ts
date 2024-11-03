import styled from 'styled-components';
import Container from '../Container/style';

const FormContainer = styled(Container)`
  a {
    align-self: flex-start;
  }

  form {
    width: 100%;
    height: 100%;
    max-width: 40rem;
    padding: 0 1rem;
    align-items: center;
    justify-content: center;

    .title {
      width: 100%;
      display: block;
      text-align: center;
      margin-bottom: 4rem;
    }

    .input-block {
      display: grid;
      grid-template: 1fr / 1fr;
      gap: 1.5rem;


      &.--three {
        grid-template: 1fr / 1fr 1fr;

      }
    }

    footer {
      width: 100%;
      margin-top: 4rem;
      font-size: 1.4rem;
      text-align: center;

      a {
        color: ${({ theme }) => theme.colors.primary};
        border-bottom: 2px solid transparent;
        transition: border-color 150ms ease-in;

        &:hover {
          border-color: ${({ theme }) => theme.colors.primary};
        }
      }
    }

    @media screen and (min-width: 550px) {
      margin: 0 auto;

      .input-block {
        align-items: flex-end;

        &.--two {
          grid-template: 1fr / 1fr 1fr;
        }

        &.--three {
          grid-template: 1fr / repeat(3, 1fr);
        }
      }
    }
  }
`;

const Fieldset = styled.fieldset`
  width: 100%;
  border: none;

  legend {
    width: 100%;
    text-align: center;
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 2rem;
    padding-bottom: 0.2em;
    border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  }

  & > div {
    margin-bottom: 1.5rem;
  }
`;

export { Fieldset, FormContainer };
