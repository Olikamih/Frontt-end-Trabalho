import { useContext } from 'react';
import { ModalRefContext } from '../providers/ModalProvider';
import { CreateModal, OpenModal } from '../types/modal';

type UseModal = () => [CreateModal, OpenModal];

const useModal: UseModal = () => {
  const ctx = useContext(ModalRefContext);
  if (!ctx) throw new Error('useAccount must be used within AccountProvider');

  const { setType, setIsOpen, setButtons, setActions, setMessage } = ctx;

  const openModal = () => setIsOpen(() => true);

  const createModal: CreateModal = {
    action: ({
      message,
      okAction,
      okButtonText,
      cancelAction,
      cancelButtonText,
    }) => {
      setButtons({ okButtonText, cancelButtonText });
      setActions({ okAction, cancelAction });

      setType(() => 'Action');
      setMessage(() => message);
    },

    warn: ({ message, okAction, okButtonText }) => {
      setButtons({ okButtonText });
      setActions({ okAction });

      setType(() => 'Warn');
      setMessage(() => message);
    },
  };

  return [createModal, openModal];
};

export default useModal;
