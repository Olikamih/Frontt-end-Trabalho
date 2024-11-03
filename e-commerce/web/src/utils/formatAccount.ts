import { AccountData } from '../pages/account';
import { SignUpData } from '../screen/sign-up';

export const formatAccountToForm = (account: any): AccountData => {
  const { id, name, address, ...rest } = account;

  const [giveName, surname] = name.split(' ');
  const [
    stateAndCity,
    district = '',
    block = '',
    street = '',
    house = '',
  ] = address.split(',');

  const getValidProperties = (acc: any, key: string) => {
    if (rest[key] != null) {
      acc[key] = rest[key];
    }
    return acc;
  };

  const formattedRest = Object.keys(rest).reduce(getValidProperties, {});

  return {
    ...formattedRest,
    password: '',
    stateAndCity,
    giveName,
    surname,
    house,
    district,
    block,
    street,
  };
};

export const formatAccountToAPI = ({
  stateAndCity,
  district,
  giveName,
  surname,
  street,
  block,
  house,
  ...rest
}: SignUpData | AccountData) => {
  const formattedAddress = `${stateAndCity.trim()}, ${district.trim()}, ${block.trim()}, ${street.trim()}, ${house.trim()}`;

  return {
    name: `${giveName} ${surname}`,
    address: formattedAddress,
    ...rest,
  };
};
