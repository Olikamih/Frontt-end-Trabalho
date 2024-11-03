import styled from 'styled-components';
import Container from '../Container/style';

export const OrderSection = styled(Container)`
  margin-bottom: 8rem;

  .order-table {
    width: 100%;
    border: solid 1px ${({ theme }) => theme.colors.shadow};
    background-color: #fff;

    .title {
      margin-bottom: 2rem;
    }

    .total {
      font-weight: bold;
      text-align: center;
    }

    tr:not(:last-child) > :nth-child(1n),
    thead th {
      border-bottom: solid 2px ${({ theme }) => theme.colors.shadow};
    }

    tr > :nth-child(1n):not(:last-child) {
      border-right: solid 2px ${({ theme }) => theme.colors.shadow};
    }

    td,
    th {
      padding: 0.5rem;
      font-size: 1.4rem;
      text-align: left;
      background-color: initial;
    }

    thead th {
      font-weight: bold;
    }
  }

  @media screen and (min-width: 700px) {
    margin-bottom: auto;
  }
`;
