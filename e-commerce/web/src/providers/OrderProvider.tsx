import React, { createContext, useState } from 'react';

interface Order {
  id: string;
  account: any;
  cardOwner: string;
  finalPrice: number;
}

interface Provider {
  order: Order;
  setOrder: Function;
}

export const OrderContext = createContext<Provider | null>(null);

const OrderProvider: React.FC = ({ children }) => {
  const [order, setOrder] = useState<Order>({
    id: '',
    account: {},
    cardOwner: '',
    finalPrice: 0,
  });

  return (
    <OrderContext.Provider
      value={{
        order,
        setOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
