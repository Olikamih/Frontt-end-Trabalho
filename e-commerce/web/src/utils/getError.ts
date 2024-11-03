import errors from './errors.json';

type InputError = { name: string; error: string };

export const getInputError = ({ name, error }: InputError): string => {
  const formErrors = errors.form as any;

  if (formErrors[name] && formErrors[name][error]) {
    return formErrors[name][error];
  } else {
    return formErrors.default[error]
      ? formErrors.default[error]
      : 'Ops, algo não está certo';
  }
};
