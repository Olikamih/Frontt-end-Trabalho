import { useContext, useEffect } from 'react';
import { ContextAccount } from '../providers/StoreProvider';

import { CartAction } from '../types/hooks';
import { setCookie, getCookie } from '../utils/storage';

const COOKIE_CART = 'cart';

const useCart = () => {
  const ctx = useContext(ContextAccount);
  if (!ctx) throw new Error('useAccount must be used within AccountProvider');

  const { cart, setCart } = ctx;

  useEffect(() => {
    const storageCart = getCookie(COOKIE_CART);
    if (storageCart) setCart(storageCart);
  }, []);

  const addToCart: CartAction = (id) => {
    let ok = true;

    setCart((cart) => {
      if (cart.includes(id)) {
        ok = false;
        return cart;
      }

      const newCart = [...cart, id];
      setCookie(COOKIE_CART, newCart);

      return newCart;
    });

    return ok;
  };

  const removeFromCart: CartAction = (id) => {
    let error = false;

    setCart((cart) => {
      const indexId = cart.indexOf(id);
      const items = cart.slice();

      if (~indexId) {
        items.splice(indexId, 1);
        setCookie(COOKIE_CART, items);
        return items;
      }

      error = true;
      return items;
    });

    return error;
  };

  return {
    cart,
    addToCart,
    removeFromCart,
  };
};

export default useCart;
