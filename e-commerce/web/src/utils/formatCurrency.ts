interface Currency {
  style?: 'currency';
  currency?: string;
}

const formatCurrency = (value: number, options?: Currency | null) => {
  const getOptions = () =>
    options
      ? options
      : {
          style: 'currency',
          currency: 'BRL',
        };
  return new Intl.NumberFormat('pt-BR', getOptions()).format(value);
};

export default formatCurrency;
