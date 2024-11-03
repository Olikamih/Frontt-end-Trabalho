import styled from 'styled-components';

const CartList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;

  margin-top: 2rem;

  & > :not(:last-child) {
    margin-bottom: 2.5rem;
  }

  img {
    max-width: 300px;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > :not(:last-child) {
      margin-right: 2rem;
    }
  }

  @media screen and (min-width: 350px) {
    .buttons {
      flex-direction: row;
      align-items: flex-end;
    }
  }

  @media screen and (min-width: 400px) {
    .content {
      flex-direction: row;
    }

    .buttons {
      max-width: 120px;
      flex-direction: column;

      & > :not(:last-child) {
        margin-bottom: 2rem;
        margin-right: 0;
      }
    }

    @media screen and (min-width: 520px) {
      .cart {
        & > :not(:last-child) {
          margin-right: 2rem;
          margin-bottom: 0;
        }

        flex-direction: row;
        align-items: flex-start;

        img {
          max-width: 150px;
        }
      }
    }
  }

  .input::after {
    top: 0;
    border-radius: 0.5rem 0.5rem 0 0;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export { CartList };
