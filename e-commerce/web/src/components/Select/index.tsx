import React, { InputHTMLAttributes } from 'react';
import { Input } from '../Input/style';
import { InputField } from '../Input';

interface Props extends InputHTMLAttributes<HTMLSelectElement> {
  options: any[];
  name: string;
  label: string;
  error?: string;
  id: string;
  value: string;
}

const Select: React.FC<Props> = ({ options, ...props }) => (
  <InputField {...props} Input={Input} as="select">
    {options.length &&
      options.map(({ value, abbr }) => (
        <option value={abbr} key={abbr}>
          {value}
        </option>
      ))}
  </InputField>
);

export default Select;
