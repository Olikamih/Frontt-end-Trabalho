import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

import Product from '../Product';
import { Input } from '../Input';
import { CartList } from './style';
import Container from '../Container/';
import { PrimaryButton } from '../Button/style';

import handleRequest from '../../utils/handleRequests';
import { apiGet } from '../../utils/api';

const Cart: React.FC<CartProps> = ({
  items,
  products,
  setItems,
  removeItem,
}) => {
  const TOTAL_ITEMS = items.length;
  const [currentItems, setCurrentItems] = useState(0);

  const [error, setError] = useState('');

  useEffect(() => {
    setCurrentItems(() => Object.keys(products).length);
  }, [products]);

  const getProduct = useCallback(id => {
    const setProduct = ({ data }: AxiosResponse) => {
      const productId = String(data.product.id);

      setItems(products => ({
        ...products,

        [productId]: {
          quantity: 1,
          ...data.product,
        },
      }));
    };

    apiGet(`/product/id?value=${id}`)
      .send()
      .then(setProduct)
      .catch(handleRequest(setError));
  }, []);

  const getProducts = useCallback(() => {
    setItems({});

    items.forEach(getProduct);
  }, [items]);

  const handleChangeQuantity = useCallback(
    (productId: string) => ({ target }: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(target.value.slice(-2));
      if (value < 1 || isNaN(value)) return;

      // Values null and undefined blocked by condition
      if (products[productId] != null) {
        setItems(prev => ({
          ...prev,
          [productId]: {
            ...prev[productId],
            quantity: value,
          },
        }));
      }
    },
    [products]
  );

  useEffect(getProducts, [items]);

  const cartProducts = useCallback(
    ([productId, { description, ...rest }], index) => (
      <Product
        key={productId}
        type="cart"
        animation={{
          duration: '450ms',
          delay: `${0.3 * (index + 1)}s`,
          fill: 'forwards',
        }}
        {...rest}
      >
        <Input
          type="number"
          id={`cart-item-${productId}`}
          name="cartItem"
          label="Quantidade:"
          value={String(products[productId].quantity)}
          onChange={handleChangeQuantity(productId)}
        />
        <PrimaryButton onClick={() => removeItem(productId)}>
          Retirar
        </PrimaryButton>
      </Product>
    ),
    [products]
  );

  return (
    <Container title="Carrinho">
      {currentItems > 0 ? (
        <CartList className="list">
          {currentItems === TOTAL_ITEMS &&
            Object.entries(products).map(cartProducts)}
        </CartList>
      ) : (
        <div className="warn">Vazio</div>
      )}
      {error && <span className="error">{error}</span>}
    </Container>
  );
};

export default Cart;
