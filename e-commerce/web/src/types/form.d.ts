import { FormEvent, ChangeEvent } from 'react';

declare module '../HOC/form' {
  export type ValidatedSubmit = (
    warnModal: (message: string) => void,
    event: FormEvent
  ) => void;

  type ValidSubmit = (
    callback: ValidatedSubmit,
    inputNames?: string[]
  ) => (event: FormEvent) => void;

  type InputError<Names> = Partial<Record<Names, string>>;

  type HandleChange =
    | { target: { name: string; value: any } }
    | ChangeEvent<HTMLInputElement | HTMLSelectElement>;
  export interface FormProps<Data> {
    data: Data;
    validSubmit: ValidSubmit;
    inputError: InputError<keyof Data>;
    handleChange(e: HandleChange): void;
  }

  export type FormComponent<
    Data,
    Props = {},
    T = Props & FormProps<Data>
  > = React.FC<T>;

  export type WrapperProps<Data, Props> = Omit<Props, keyof FormProps<Data>>;
}
