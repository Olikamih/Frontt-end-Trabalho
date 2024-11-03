import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { OrderContext } from '../providers/OrderProvider';

const useOrder = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw 'useOrder must be used within OrderProvider';

  const { order, setOrder } = ctx;
  const router = useRouter();

  const createOder = (res: AxiosResponse) => {
    if (!res) return;
    const { status, order_id, ...rest } = res.data;
    
    setOrder(() => ({
      ...rest,
      id: order_id,
    }));

    router.push(`/success/${order_id}`);
  };

  return { order, createOder };
};

export default useOrder;
