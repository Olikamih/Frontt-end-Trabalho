import React, { InputHTMLAttributes } from 'react';
import { Input as StyledInput, InputField as Field } from './style';
interface Props<T> extends InputHTMLAttributes<T> {
  id: string;
  as?: string;
  name: string;
  label: string;
  value: string;
  error?: string;
}

export interface InputFieldProps <Element> extends Props<Element> {
  Input: any;
}

function InputField<Element>({
  id,
  name,
  label,
  value,
  error,
  Input,
  children,
  ...props
}: InputFieldProps<Element>) {
  const hasError = error != null;
  return (
    <Field className={hasError ? 'invalid' : ''}>
      <label htmlFor={id}>
        {label}
        {hasError && <span className="invalid-error">{error}</span>}
      </label>
      <div className="input">
        <Input id={id} name={name} value={value} {...props}>
          {children}
        </Input>
      </div>
    </Field>
  );
}


const Input: React.FC<Props<HTMLInputElement>> = props => (
  <InputField Input={StyledInput} {...props} />
);

export { Input, InputField };
