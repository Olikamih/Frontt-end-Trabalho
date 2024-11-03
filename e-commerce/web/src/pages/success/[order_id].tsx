import React, { useEffect } from 'react';
import useOrder from '../../hooks/useOrder';
import { PrimaryButton } from '../../components/Button/style';
import Container from '../../components/Container/';
import { FlexContainer, GridContainer } from '../../components/Container/style';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import formatCurrency from '../../utils/formatCurrency';

const SuccessContainer = styled(FlexContainer)`
  margin: auto;

  span {
    font-size: 1.8rem;
  }

  button {
    margin-top: 2rem;
  }
`;

const Success: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const { order_id } = router.query;
    if (order_id !== 'asd72dSA32sa4SA7aAS') router.push('/cart');
  }, []);

  const { order } = useOrder();

  return (
    <GridContainer>
      <Container title="Pedido concluído">
        <SuccessContainer>
          <span>Preço final: {formatCurrency(order.finalPrice)}</span>
          <span>Dono do cartão: {order.cardOwner}</span>
          <span>Nome do comprador: {order.account.name}</span>
          <span>Endereço de entrega: {order.account.address}</span>

          <PrimaryButton onClick={() => router.push('/products')}>
            Voltar a loja
          </PrimaryButton>
        </SuccessContainer>
      </Container>
    </GridContainer>
  );
};

export default Success;
