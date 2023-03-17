import React, { PropsWithChildren } from 'react';
import { ModalType } from '../types/ModalType';

function Modal({ onClickToggleModal, children }: PropsWithChildren<ModalType>) {
  return (
    <div className="modal_container">
      <dialog className="dialog_box">{children}</dialog>
      <button
        type="button"
        className="back_drop"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      >
        {}
      </button>
    </div>
  );
}

export default Modal;
