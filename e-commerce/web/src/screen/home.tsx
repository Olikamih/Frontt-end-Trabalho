import React, { memo } from 'react';
import { GridContainer } from '../components/Container/style';

import Header from '../components/Header';
import ProductList from '../components/ProductList';
import SearchSection from '../components/SearchSection';
import ProductItem from '../types/product';

interface Props {
  error?: string;
  categories: string[];
  products: ProductItem[];
  setProducts: Function;
}

const Home: React.FC<Props> = ({
  error,
  categories,
  products,
  setProducts,
}) => (
  <GridContainer>
    <Header />
    <SearchSection categories={categories} setProducts={setProducts} />
    <ProductList error={error} products={products} />
  </GridContainer>
);

export default memo(Home);
