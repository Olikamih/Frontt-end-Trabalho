import React, { useCallback, useEffect, useState } from 'react';
import useModal from '../hooks/useModal';

export default function FormData<Props, Data extends Record<string, any>>(
  Component: FormComponent<Data, Props>,
  initialData: Data,
  validate: Function,
  optionalData: string[] = []
) {
  type InputNames = keyof Data;

  const FormWrapper: React.FC<Omit<Props, keyof FormProps<Data>>> = props => {
    const [data, setData] = useState(initialData);
    const [changedInput, setChangedInput] = useState<InputNames>('');
    const [inputError, setInputError] = useState<InputError<InputNames>>({});

    const [createModal, openModal] = useModal();

    const warnModal = useCallback(message => {
      createModal.warn({ message });
      openModal();
    }, []);

    const defineRequiredInputs = useCallback(() => {
      const error = Object.keys(data).reduce((acc: any, input) => {
        const isOptional = optionalData.includes(input);
        const inputError: string = validate(input, data, isOptional);

        return inputError ? ((acc[input] = ''), acc) : acc;
      }, {});

      setInputError(() => error);
    }, []);

    useEffect(defineRequiredInputs, []);

    const deleteInputError = useCallback(
      (error: any) =>
        Object.keys(error).reduce(
          (acc: any, key) =>
            key !== changedInput ? ((acc[key] = ''), acc) : acc,
          {}
        ),
      [changedInput]
    );

    const handleValidate = useCallback(() => {
      if (!changedInput) return;

      const error: string = validate(
        changedInput,
        data,
        optionalData.includes(changedInput as string)
      );

      if (error) {
        setInputError(prev => ({
          ...prev,
          [changedInput]: error,
        }));
      } else {
        setInputError(deleteInputError);
      }
    }, [data, changedInput]);

    useEffect(handleValidate, [data]);

    const handleChange = useCallback((e: HandleChange) => {
      const { name, value } = e.target;

      if (data[name] != null) {
        setData(prev => ({
          ...prev,
          [name]: value,
        }));
        setChangedInput(() => name);
      }
    }, []);

    const validSubmit = useCallback<ValidSubmit>(
      cb => event => {
        event.preventDefault();

        if (Object.values(inputError).length) {
          warnModal('Todos campos precisão estar válidos!');
          return;
        }

        cb(warnModal, event);
      },
      [inputError]
    );

    const WrappedComponent = Component as FormComponent<Data>;
    return (
      <WrappedComponent
        data={data}
        inputError={inputError}
        handleChange={handleChange}
        validSubmit={validSubmit}
        {...props}
      />
    );
  };

  return FormWrapper;
}
