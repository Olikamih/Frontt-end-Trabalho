import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useAccount from '../hooks/useAccount';

import { AccountHeader } from '../components/Header';
import Form from '../components/Form';
import { Fieldset } from '../components/Form/style';
import FormData, { FormComponent, ValidatedSubmit } from '../HOC/form';
import { INITIAL_DATA } from '../screen/sign-up';
import { GridContainer } from '../components/Container/style';
import { UserAbout, UserAddress } from '../components/SignUpFields';
import { Submit } from '../components/Button';

import validate from '../utils/validation/validate';
import { apiGet, apiPut } from '../utils/api';
import { Input } from '../components/Input';
import { storeAccount } from '../utils/account';
import {
  formatAccountToAPI,
  formatAccountToForm,
} from '../utils/formatAccount';
import handleRequest from '../utils/handleRequests';
import { useRouter } from 'next/router';

const { confirmPassword, ...ACCOUNT_INITIAL_DATA } = INITIAL_DATA;

export type AccountData = typeof ACCOUNT_INITIAL_DATA;

const AccountForm: FormComponent<AccountData> = ({
  data,
  inputError,
  validSubmit,
  ...props
}) => {
  const router = useRouter();
  
  const handleSubmit = useCallback<ValidatedSubmit>(
    warnModal => {
      const successUpdate = ({ data }: any) => {
        const { status, ...account } = data;
        storeAccount({ account });
        warnModal('Alterações feitas conta sucesso!');
        router.reload();
      };

      apiPut('/user/update', formatAccountToAPI(data))
        .then(successUpdate)
        .catch(handleRequest(warnModal));
    },
    [data, inputError]
  );

  const onSubmit = useMemo(() => validSubmit(handleSubmit), [inputError]);

  return (
    <Form onSubmit={onSubmit} title="Alterar conta">
      <Fieldset>
        <Input
          type="url"
          id="avatar"
          name="avatar"
          value={data.avatar}
          error={inputError.avatar}
          label="Foto / Avatar"
          placeholder="ex.: http://exemplo.com (opcional)"
          onChange={props.handleChange}
        />
      </Fieldset>

      <UserAbout data={data} inputError={inputError} {...props} />
      <UserAddress data={data} inputError={inputError} {...props} />

      <Fieldset>
        <legend>Confirmação</legend>

        <Input
          id="email"
          name="email"
          value={data.email}
          error={inputError.email}
          label="E-mail"
          placeholder="Digite seu e-mail"
          onChange={props.handleChange}
        />

        <Input
          type="password"
          id="password"
          name="password"
          value={data.password}
          error={inputError.password}
          label="Senha"
          placeholder="Digite sua senha"
          onChange={props.handleChange}
        />
      </Fieldset>

      <Submit>Salvar</Submit>
    </Form>
  );
};

const Account = () => {
  const [initialData, setInitialData] = useState<AccountData>(
    ACCOUNT_INITIAL_DATA
  );
  const { account } = useAccount();

  const getAccount = useCallback(() => {
    if (!account.id) return;
    const { send, cancel } = apiGet(`/user/${account.id}`);

    send()
      .then(({ data }) =>
        setInitialData(prev => ({
          ...prev,
          ...formatAccountToForm(data.account),
        }))
      )
      .catch(console.error);

    return cancel;
  }, [account]);

  useEffect(getAccount, [account]);

  const WrappedAccountForm = FormData(
    AccountForm,
    initialData,
    validate['sign-up'],
    ['avatar']
  );

  return (
    <GridContainer>
      <AccountHeader />
      <WrappedAccountForm />
    </GridContainer>
  );
};

export default Account;
