import { Dispatch, SetStateAction } from 'react';

export type Actions = { okAction?: () => void; cancelAction?: () => void };
export type Buttons = {
  okButtonText?: string;
  cancelButtonText?: string;
};
export type ModalTypes = 'Warn' | 'Action';
export type OpenModal = () => void;
export type SetActions = ({}: Actions) => void;
export type SetButtons = ({}: Buttons) => void;

interface CreateModalParams extends Actions {
  message: string;
}
interface CreateModalParams extends Buttons {}

export type CreateModalMethods = ({
  message,
  okAction,
  okButtonText,
  cancelAction,
  cancelButtonText,
}: CreateModalParams) => void;

export type CreateModal = Record<string, CreateModalMethods>;

export type Provider = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<ModalTypes>>;
  setButtons: SetButtons;
  setActions: SetActions;
};
