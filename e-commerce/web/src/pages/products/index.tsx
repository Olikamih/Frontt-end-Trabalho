import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';

import ProductItem from '../../types/product'; // Assegure-se de que este tipo está correto
import Home from '../../screen/home';

import { apiGet } from '../../utils/api';
import handleRequest from '../../utils/handleRequests';

// Função que busca categorias de produtos
export const getStaticProps: GetStaticProps = async () => {
  let categories: string[] = [];

  try {
    const response = await apiGet('/product/categories').send();
    categories = response.data.categories || []; // Verifica se categories existe
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
  }

  return {
    props: {
      categories,
    },
  };
};

interface Props {
  categories: string[];
}

const IndexPage: React.FC<Props> = ({ categories }) => {
  const [products, setProducts] = useState<Array<ProductItem>>([]);
  const [error, setError] = useState('');

  // Função para buscar produtos
  const getProducts = useCallback(() => {
    const { cancel, send } = apiGet('/product');

    send()
      .then(({ data }) => {
        if (data.products) {
          setProducts(data.products); // Verifica se products existe
        } else {
          setError('Nenhum produto encontrado.');
        }
      })
      .catch(handleRequest(setError));

    return cancel;
  }, []);

  useEffect(() => {
    const cancelGetProducts = getProducts();
    return () => {
      cancelGetProducts(); // Cancela a chamada se o componente for desmontado
    };
  }, [getProducts]);

  return (
    <>
      <Head>
        <title>Produtos</title>
      </Head>
      <Home
        error={error}
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
    </>
  );
};

export default IndexPage;
