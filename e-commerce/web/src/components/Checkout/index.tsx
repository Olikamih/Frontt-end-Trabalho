import React, { ChangeEvent, useCallback, useMemo } from 'react';
import FormData, { FormComponent, ValidatedSubmit } from '../../HOC/form';

import { Fieldset, FormContainer } from '../Form/style';
import { Input } from '../Input';
import Select from '../Select';
import OrderTable from '../OrderTable';
import { Section } from './style';

import useAccount from '../../hooks/useAccount';
import { apiPost } from '../../utils/api';
import handleRequest from '../../utils/handleRequests';
import validate from '../../utils/validation/validate';
import { CartProps } from '../Cart';
import { FlexContainer } from '../Container/style';
import { Submit } from '../Button';
import useModal from '../../hooks/useModal';
import useOrder from '../../hooks/useOrder';

const INITIAL_DATA = {
  cardNumber: '',
  cardType: 'Escolher',
  cardOwner: '',
  cardValidate: '',
  cardSecurityCode: '',
};
type CheckoutData = typeof INITIAL_DATA;

interface Props extends Pick<CartProps, 'products'> {
  finalPrice: number;
}

const Checkout: FormComponent<CheckoutData, Props> = ({
  data,
  inputError,
  handleChange,
  finalPrice,
  products,
  validSubmit,
}) => {
  const { account } = useAccount();
  const { createOder } = useOrder();
  const [createModal, openModal] = useModal();

  const handleCardTypeOnChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      handleChange({ target: { name: 'cardNumber', value: '' } });
      handleChange(e);
    },
    []
  );

  const confirmOrder = useCallback((okAction: any) => {
    createModal.action({
      message: 'Confirmar pedido',
      okButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      okAction,
    });

    openModal();
  }, []);

  const handleSubmit = useCallback<ValidatedSubmit>(
    warnModal => {
      const justProducts = Object.entries(products).map(
        ([, product]) => product
      );
      const { cardOwner } = data;

      confirmOrder(() => {
        apiPost('/order/create', {
          id: account.id,
          products: justProducts,
          finalPrice,
          cardOwner,
        })
          .then(createOder)
          .catch(handleRequest(warnModal));
      });
    },
    [data, products, inputError]
  );

  const onSubmit = useMemo(() => validSubmit(handleSubmit), [inputError]);

  return (
    <Section>
      <OrderTable products={Object.entries(products)} finalPrice={finalPrice} />

      <FormContainer>
        <FlexContainer onSubmit={onSubmit} as="form">
          <h2 className="title">Cartão</h2>
          <Fieldset>
            <div className="input-block">
              <Select
                id="card-type"
                name="cardType"
                value={data.cardType}
                error={inputError.cardType}
                label="Cartão"
                onChange={handleCardTypeOnChange}
                options={[
                  { value: 'Escolher', abbr: 'none' },
                  { value: 'Visa', abbr: 'VS' },
                  { value: 'Mastercard', abbr: 'MS' },
                ]}
              />

              <Input
                id="card-number"
                name="cardNumber"
                error={inputError.cardNumber}
                value={data.cardNumber}
                label="Número do cartão"
                placeholder="Apenas números"
                onChange={handleChange}
              />
            </div>

            <Input
              id="card-owner"
              name="cardOwner"
              value={data.cardOwner}
              error={inputError.cardOwner}
              label="Nome"
              placeholder="Nome, presente no cartão"
              onChange={handleChange}
            />

            <Input
              type="month"
              id="card-validate"
              name="cardValidate"
              value={data.cardValidate}
              error={inputError.cardValidate}
              label="Validade"
              placeholder="MM/AA"
              onChange={handleChange}
            />
            <Input
              id="card-security-code"
              name="cardSecurityCode"
              value={data.cardSecurityCode}
              error={inputError.cardSecurityCode}
              label="Código de segurança"
              placeholder="123"
              onChange={handleChange}
            />
            <Submit>Comprar</Submit>
          </Fieldset>
        </FlexContainer>
      </FormContainer>
    </Section>
  );
};

export default FormData(Checkout, INITIAL_DATA, validate['credit-card']);
