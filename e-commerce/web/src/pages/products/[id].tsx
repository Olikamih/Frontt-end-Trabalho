import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import Head from 'next/head';
import Header from '../../components/Header';
import ProductSection from '../../components/ProductSection';

import { apiGet } from '../../utils/api';
import ProductItem from '../../types/product';
import { GridContainer } from '../../components/Container/style';
import CommentSection from '../../components/Comment';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params || !params.id) throw new Error('Nenhum parâmetro fornecido');

    // Ajustando a chamada para a API
    const product: ProductItem = await apiGet(`/product/${params.id}`)
      .send()
      .then(res => res.data.product)
      .catch(error => {
        console.error('Erro ao buscar produto:', error);
        return null; // Retorna null se ocorrer um erro
      });

    // Se o produto não for encontrado, pode retornar um fallback ou uma página de erro
    if (!product) {
      return {
        notFound: true, // Isso vai gerar uma página 404
      };
    }

    return {
      props: { product },
    };
  } catch (err) {
    console.error('Erro ao executar getStaticProps:', err);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  let products: ProductItem[] = [];

  try {
    products = await apiGet('/product')
      .send()
      .then(({ data }) => data.products)
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
        return [];
      });

    const paths = products.map(({ id }) => ({
      params: {
        id: String(id),
      },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error('Erro ao gerar paths:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

const ProductPage: React.FC<{ product: ProductItem }> = ({ product }) => {
  return (
    <GridContainer>
      <Head>
        <meta property="og:site_name" content="Loja" key="site_name" />
        <meta property="og:title" content={product.title} key="title" />
        <meta property="og:image" content={product.image} key="image" />
        <meta
          property="og:description"
          content={product.description}
          key="description"
        />
        <title>{product.title}</title>
      </Head>
      <Header />
      <ProductSection {...product} />
      <CommentSection productId={product.id} />
    </GridContainer>
  );
};

export default ProductPage;
