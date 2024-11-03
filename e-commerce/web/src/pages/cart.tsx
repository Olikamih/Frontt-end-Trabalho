import React, { useCallback, useEffect, useState } from 'react';

import useCart from '../hooks/useCart';

import Head from 'next/head';
import Cart, { CartItem } from '../components/Cart';
import Header from '../components/Header';
import Checkout from '../components/Checkout';
import useAccount from '../hooks/useAccount';
import SignUp from '../screen/sign-up';
import { GridContainer } from '../components/Container/style';

const CartPage: React.FC = () => {
  const { id } = useAccount().account;
  const { cart, removeFromCart } = useCart();

  const [finalPrice, setFinalPrice] = useState(0);
  const [products, setProducts] = useState<Record<string, CartItem>>({});

  const getTotalPrice = useCallback(() => {
    const total = Object.entries(products).reduce(
      (acc, [, { quantity, price }]) => (acc += price * quantity),
      0
    );

    setFinalPrice(total);
  }, [products]);

  useEffect(getTotalPrice, [products]);

  return (
    <GridContainer>
      <Head>
        <title>Carrinho</title>
      </Head>
      <Header />

      <Cart
        items={cart}
        products={products}
        setItems={setProducts}
        removeItem={removeFromCart}
      />

      {id != null ? (
        <Checkout products={products} finalPrice={finalPrice} />
      ) : (
        <SignUp goToPath="/cart" />
      )}
    </GridContainer>
  );
};

export default CartPage;
