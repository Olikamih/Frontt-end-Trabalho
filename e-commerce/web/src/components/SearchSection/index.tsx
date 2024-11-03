import React, {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useState,
} from 'react';

import Link from '../Link';
import Container from '../Container';
import { Submit } from '../Button';

import { Input } from '../Input/style';
import * as Search from './style';

import { apiGet } from '../../utils/api';

interface Props {
  categories: string[];
  setProducts: Function;
}

const SearchSection: React.FC<Props> = ({ setProducts, categories }) => {
  const [productName, setProductName] = useState('');
  
  const searchChange = useCallback(
    (e: ChangeEvent) => {
      const { value } = e.target as HTMLInputElement;
      setProductName(value);
    },
    [productName]
  );

  const handleSearch = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const products = await apiGet(`/product/name?value=${productName}`)
        .send()
        .then(({ data }) => data.products || data.product);

      setProducts(() => products);
    },
    [productName]
  );

  return (
    <Search.Section>
      <Container title="Pesquisar">
        <form className="search-bar" onSubmit={handleSearch}>
          <Input
            type="search"
            id="search"
            name="search"
            value={productName}
            onChange={searchChange}
          />
          <Submit type="secondary">Buscar</Submit>
        </form>

        <ul className="categories">
          {categories.length > 0 &&
            categories.map(cat => (
              <li key={cat}>
                <Link href={`/products/category/${cat}`}>{cat}</Link>
              </li>
            ))}
        </ul>
      </Container>
    </Search.Section>
  );
};

export default memo(SearchSection);
