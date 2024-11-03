import {
  SetValidation,
  Tests,
  ValidationFunction,
  ValidationMethods,
} from '../../types/validation';
import { getInputError } from '../getError';
import {
  isEqual,
  notNull,
  validPattern,
  biggerOrEqualThan,
  lessOrEqualThan,
} from './validations';

const patternFor: Record<string, RegExp> = {
  email: /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/,
  password: /^[a-zA-Z-0-9]{3,30}$/,
  tel: /^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/,
  VS: /^4[0-9]{12}(?:[0-9]{3})?$/,
  MS: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
};

const ERROR = {
  INVALID: 'invalid',
  EMPTY: 'empty',
  DEPENDENT_EMPTY: 'dependentEmpty',
  NOT_EQUAL: 'notEqual',
};

const NO_ERRORS = '';

const validTests = (name: string, tests: Tests) => {
  for (let [valid, error] of tests) {
    if (!valid()) {
      return getInputError({ name, error });
    }
  }

  return NO_ERRORS;
};

const defaultValidation: ValidationFunction = (name, data, optional) => {
  const value = data[name];

  if (!optional) {
    const tests: Tests = [[notNull(value), ERROR.EMPTY]];

    if (patternFor[name])
      tests.push([validPattern(patternFor[name], value), ERROR.INVALID]);

    return validTests(name, tests);
  }

  return NO_ERRORS;
};

const SIGN_UP = 'sign-up',
  SIGN_IN = 'sign-in',
  CREDIT_CARD = 'credit-card';

const validationMethods: ValidationMethods = {
  [SIGN_IN]: {
    default: defaultValidation,
  },
  [SIGN_UP]: {
    default: defaultValidation,

    confirmPassword(name, { password, confirmPassword }) {
      const tests: Tests = [
        [notNull(password), ERROR.DEPENDENT_EMPTY],
        [notNull(confirmPassword), ERROR.EMPTY],
        [isEqual(password, confirmPassword), ERROR.NOT_EQUAL],
      ];

      return validTests(name, tests);
    },
  },
  [CREDIT_CARD]: {
    default: defaultValidation,

    cardNumber(name, { cardType, cardNumber }) {
      const tests: Tests = [
        [notNull(cardNumber), ERROR.EMPTY],
        [validPattern(patternFor[cardType], cardNumber), ERROR.INVALID],
      ];
      return validTests(name, tests);
    },

    cardType(name, { cardType }) {
      const CARDS = ['MS', 'VS'];

      return CARDS.includes(cardType)
        ? NO_ERRORS
        : getInputError({ name, error: ERROR.INVALID });
    },

    cardValidate(name, { cardValidate }) {
      const [year, month] = cardValidate.split('-');
      if (!year || !month) return getInputError({ name, error: ERROR.INVALID });

      const date = new Date();

      const minYear = biggerOrEqualThan(Number(year), date.getFullYear());
      const maxYear = lessOrEqualThan(Number(year), date.getFullYear() + 20);

      const minMonth = biggerOrEqualThan(Number(month) - 1, date.getMonth());

      const isOk = minYear() && maxYear() && minMonth();

      if (isOk) return NO_ERRORS;
      return getInputError({ name, error: ERROR.INVALID });
    },
  },
};

const setValidation: SetValidation = validationName => {
  const validation = validationMethods[validationName];

  return (name, data, optional = false) => {
    if (validation[name] != null) {
      return validation[name](name, data, optional);
    } else {
      return validation.default(name, data, optional);
    }
  };
};

const validate: any = {
  [SIGN_IN]: setValidation(SIGN_IN),
  [SIGN_UP]: setValidation(SIGN_UP),
  [CREDIT_CARD]: setValidation(CREDIT_CARD),
};

export default validate;
