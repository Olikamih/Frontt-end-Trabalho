import { AxiosError } from 'axios';
const DEFAULT_MESSAGE =
  'Ocorreu um error inesperado, por favor recarregue a página ou tente mais tarde.';

export default function handleRequest(setError: Function) {
  return function handleError(err: AxiosError) {
    if (err.message === 'canceled') return;
     
    if (err.response) {
      const { data } = err.response;
      const message = data.message ? data.message : DEFAULT_MESSAGE;

      setError(message);
    } else if (err.request) {
      setError(
        'Não foi possível fazer a requisição, por favor, tente mais tarde.'
      );
    } else {
      setError(DEFAULT_MESSAGE);
    }
  };
}
