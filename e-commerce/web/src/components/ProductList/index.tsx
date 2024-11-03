import React, { useEffect, useState } from 'react';

import Container from '../Container';
import IProduct from '../../types/product';
import Product from '../Product';
import Section from './style';
import { Link } from '../Button';

interface Props {
  error?: string;
  products: IProduct[];
}

const ProductList: React.FC<Props> = ({ error, products }) => {
  const [message, setMessage] = useState('Buscando itens');

  useEffect(() => {
    if (!products.length) {
      setMessage('Vazio');
    }
  }, [products]);

  return (
    <Section>
      <Container title="Produtos">
        {products.length > 0 ? (
          <ul className="list">
            {products.length > 0 &&
              products.map((product, index) => {
                const delay = `${0.3 * (index + 1)}s`;
                return (
                  <Product
                    key={product.id}
                    animation={{
                      duration: '350ms',
                      delay,
                      fill: 'forwards',
                    }}
                    {...product}
                  >
                    <Link href={`/products/${product.id}`}>
                      Detalhes
                    </Link>
                  </Product>
                );
              })}
          </ul>
        ) : (
          <div className="warn">{message}</div>
        )}
        {error && <div className="error">{error}</div>}
      </Container>
    </Section>
  );
};

export default ProductList;
