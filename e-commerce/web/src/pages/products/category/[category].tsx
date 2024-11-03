import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { apiGet } from '../../../utils/api';
import IProduct from '../../../types/product';
import Home from '../../../screen/home';
import Head from 'next/head';

interface CategoryData {
  name: string;
  description: string;
  products: IProduct[];
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.category) throw new Error('Nenhum parâmetro fornecido');

  const category: CategoryData | null = await apiGet(`/product/category/${params.category}`)
    .send()
    .then(({ data }) => data.category || null) // Acessa diretamente a categoria
    .catch(error => {
      console.error('Erro ao buscar produtos por categoria:', error);
      return null;
    });

  const categories: string[] = await apiGet('/product/categories')
    .send()
    .then(res => res.data.categories)
    .catch(() => []);

  return {
    props: {
      category,
      categories,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories: string[] = await apiGet('/product/categories')
    .send()
    .then(({ data }) => data.categories)
    .catch(() => []);

  const paths = categories.map(category => ({
    params: {
      category,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

const CategoryPage: React.FC<{ category: CategoryData | null; categories: string[] }> = ({
  category,
  categories,
}) => {
  const [products, setProducts] = useState<Array<IProduct>>(category ? category.products : []);

  useEffect(() => {
    if (category) {
      setProducts(category.products);
    }
  }, [category]);

  if (!category) {
    return <div>Categoria não encontrada.</div>; // Página de erro ou loading
  }

  return (
    <>
      <Head>
        <meta property="og:title" content={category.name} key="title" />
        <meta
          property="og:description"
          content={category.description}
          key="description"
        />
        <title>{category.name}</title>
      </Head>
      <Home
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
    </>
  );
};

export default CategoryPage;
