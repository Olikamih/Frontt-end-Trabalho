import React, { InputHTMLAttributes } from 'react';

import { FormContainer } from './style';
import { FlexContainer } from '../Container/style';

const Form: React.FC<InputHTMLAttributes<HTMLFormElement>> = ({
  children,
  title,
  ...props
}) => (
  <FormContainer>
    {title && <h1 className="title">{title}</h1>}
    <FlexContainer {...props} as="form">
      {children}
    </FlexContainer>
  </FormContainer>
);

export default Form;
