import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';

import {
  UserAccount,
  UserAbout,
  UserAddress,
} from '../components/SignUpFields';
import Form from '../components/Form';
import handleRequest from '../utils/handleRequests';
import FormData, { FormComponent, ValidatedSubmit } from '../HOC/form';

import useAccount from '../hooks/useAccount';
import { apiPost } from '../utils/api';
import validate from '../utils/validation/validate';
import { formatAccountToAPI } from '../utils/formatAccount';
import { Submit } from '../components/Button';

export const INITIAL_DATA = {
  email: '',
  password: '',
  confirmPassword: '',
  avatar: '',
  giveName: '',
  surname: '',
  house: '',
  tel: '',
  cep: '',
  street: '',
  block: '',
  district: '',
  stateAndCity: '',
};
interface Props {
  goToPath?: string;
}

export type SignUpData = typeof INITIAL_DATA;

export const SignUp: FormComponent<SignUpData, Props> = ({
  data,
  validSubmit,
  goToPath = '/',
  ...props
}) => {
  const { login } = useAccount();

  const handleSubmit = useCallback<ValidatedSubmit>(
    async warnModal => {
      const res = await apiPost(
        '/user/sign-up',
        formatAccountToAPI(data)
      ).catch(handleRequest(warnModal));

      if (res) login({ data: res.data }, goToPath);
    },
    [data, props.inputError]
  );

  const onSubmit = useMemo(() => validSubmit(handleSubmit), [props.inputError]);

  return (
    <Form onSubmit={onSubmit} title="Cadastre-se">
      <UserAccount data={data} {...props} />
      <UserAbout data={data} {...props} />
      <UserAddress data={data} {...props} />
      <Submit>Cadastrar-se</Submit>

      <footer>
        Já possui uma conta? <br /> <Link href="/sign-in">Entrar</Link>
      </footer>
    </Form>
  );
};

export default FormData(SignUp, INITIAL_DATA, validate['sign-up'], ['avatar']);
