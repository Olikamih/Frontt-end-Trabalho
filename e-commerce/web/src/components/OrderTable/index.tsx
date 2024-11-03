import React from 'react';
import formatCurrency from '../../utils/formatCurrency';
import { CartItem } from '../Cart';
import { OrderSection } from './style';

interface Props {
  products: [string, CartItem][];
  finalPrice: number;
}

const OrderTable: React.FC<Props> = ({ products, finalPrice }) => {
  return (
    <OrderSection as="div">
      <table className="order-table">
        <caption className="title">Pedido</caption>

        <colgroup>
          <col span={1} />
          <col span={1} />
          <col span={1} />
        </colgroup>

        <thead>
          <tr>
            <th colSpan={1} scope="col">
              Produto
            </th>
            <th colSpan={1} scope="col">
              Quantidade
            </th>
            <th colSpan={1} scope="col">
              Preço
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map(([, { id, title, price, quantity }]) => {
            return (
              <tr key={id}>
                <th scope="row">{title}</th>
                <td>{quantity}</td>
                <td>{formatCurrency(price)}</td>
              </tr>
            );
          })}

          <tr>
            <th>Total</th>
            <td colSpan={2} className="total">
              {formatCurrency(finalPrice)}
            </td>
          </tr>
        </tbody>
      </table>
    </OrderSection>
  );
};

export default OrderTable;
