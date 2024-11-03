import React, { MouseEvent } from 'react';
import { PrimaryButton } from '../Button/style';
import { ModalContainer, Background } from './style';

interface Props {
  className: string;
  message: string;
  isOpen: boolean;
}

interface WarnProps extends Omit<Props, 'type' | 'className'> {
  okText?: string;
  handleOk(e: MouseEvent): void;
}

interface ActionProps extends WarnProps {
  cancelText?: string;
  handleCancel(e: MouseEvent): void;
}

const Modal: React.FC<Props> = ({ isOpen, message, className, children }) => (
  <>
    {isOpen ? (
      <Background>
        <ModalContainer className={className}>
          <span className="message">{message}</span>
          <hr />
          <div className="buttons">{children}</div>
        </ModalContainer>
      </Background>
    ) : null}
  </>
);

const Action: React.FC<ActionProps> = ({
  okText,
  cancelText,
  handleOk,
  handleCancel,
  ...props
}) => (
  <Modal {...props} className="action">
    <PrimaryButton onClick={handleOk}>{okText ? okText : 'OK'}</PrimaryButton>
    <PrimaryButton onClick={handleCancel}>
      {cancelText ? cancelText : 'Cancelar'}
    </PrimaryButton>
  </Modal>
);

const Warn: React.FC<WarnProps> = ({ okText, handleOk, ...props }) => (
  <Modal {...props} className="warn">
    <PrimaryButton onClick={handleOk}>{okText ? okText : 'OK'}</PrimaryButton>
  </Modal>
);

export default {
  Action,
  Warn,
};
