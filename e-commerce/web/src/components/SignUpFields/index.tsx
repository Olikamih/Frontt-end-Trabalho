import { FormProps } from '../../HOC/form';
import { SignUpData } from '../../screen/sign-up';
import { Fieldset } from '../Form/style';
import { Input } from '../Input';

interface FieldProps<WithProps extends keyof SignUpData>
  extends Omit<FormProps<Pick<SignUpData, WithProps>>, 'validSubmit'> {}

const UserAccount: React.FC<
  FieldProps<'email' | 'password' | 'confirmPassword' | 'avatar'>
> = ({ data, inputError, handleChange }) => (
  <Fieldset>
    <legend>Sua conta</legend>

    <Input
      id="email"
      name="email"
      value={data.email}
      error={inputError.email}
      label="Email"
      placeholder="Digite seu e-mail"
      onChange={handleChange}
    />

    <div className="input-block --two">
      <Input
        type="password"
        id="password"
        name="password"
        value={data.password}
        error={inputError.password}
        label="Senha"
        placeholder="Digite sua senha"
        onChange={handleChange}
      />

      <Input
        type="password"
        id="confirm-password"
        name="confirmPassword"
        value={data.confirmPassword}
        error={inputError.confirmPassword}
        label="Confirmar senha"
        placeholder="Digite sua senha novamente"
        onChange={handleChange}
      />
    </div>

    <Input
      type="url"
      id="avatar"
      name="avatar"
      value={data.avatar}
      error={inputError.avatar}
      label="Foto / Avatar"
      placeholder="ex.: http://exemplo.com (opcional)"
      onChange={handleChange}
    />
  </Fieldset>
);

const UserAbout: React.FC<FieldProps<'giveName' | 'surname' | 'tel'>> = ({
  data,
  inputError,
  handleChange,
}) => (
  <Fieldset>
    <legend>Sobre você</legend>

    <div className="input-block --two">
      <Input
        id="give-name"
        name="giveName"
        value={data.giveName}
        error={inputError.giveName}
        label="Nome"
        placeholder="Primeiro Nome"
        onChange={handleChange}
      />

      <Input
        id="surname"
        name="surname"
        value={data.surname}
        error={inputError.surname}
        label="Sobrenome"
        placeholder="Sobrenome"
        onChange={handleChange}
      />
    </div>

    <Input
      id="tel"
      name="tel"
      value={data.tel}
      error={inputError.tel}
      label="Telefone celular"
      placeholder="ex.: 61912345678"
      onChange={handleChange}
    />
  </Fieldset>
);

const UserAddress: React.FC<
  FieldProps<'cep' | 'street' | 'block' | 'district' | 'house' | 'stateAndCity'>
> = ({ data, inputError, handleChange }) => (
  <Fieldset>
    <legend>Endereço</legend>

    <Input
      id="state-and-city"
      name="stateAndCity"
      value={data.stateAndCity}
      error={inputError.stateAndCity}
      label="Cidade e Estado"
      placeholder="ex.: Brasília DF"
      onChange={handleChange}
    />

    <div className="input-block --two">
      <Input
        id="district"
        name="district"
        value={data.district}
        error={inputError.district}
        label="Bairro"
        placeholder="ex.: Parque das América"
        onChange={handleChange}
      />
      <Input
        id="cep"
        name="cep"
        value={data.cep}
        error={inputError.cep}
        label="CEP"
        placeholder="ex.: 12345-000"
        onChange={handleChange}
      />
    </div>

    <div className="input-block --three">
      <Input
        id="street"
        name="street"
        value={data.street}
        error={inputError.street}
        label="Rua"
        placeholder="ex.: 14"
        onChange={handleChange}
      />

      <Input
        id="block"
        name="block"
        value={data.block}
        error={inputError.block}
        label="Quadra"
        placeholder="ex.: 10"
        onChange={handleChange}
      />
      <Input
        id="house"
        name="house"
        value={data.house}
        error={inputError.house}
        label="Casa"
        placeholder="Número ou Letra"
        onChange={handleChange}
      />
    </div>
  </Fieldset>
);

export { UserAccount, UserAbout, UserAddress };
