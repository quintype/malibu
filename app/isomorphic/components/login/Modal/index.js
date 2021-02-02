import React from "react";
import { func, object, bool } from "prop-types";
import ReactModal from "react-modal";

import { CloseIcon } from "../../icons/CloseIcon";

import "./modal.m.css";

export const Modal = ({ onBackdropClick, children, hideCloseIcon }) => {
  return (
    <ReactModal
      className="malibu-modal"
      overlayClassName="modal-backdrop"
      isOpen={true}
      onRequestClose={onBackdropClick}
    >
      <div className="modal-content">
        {children}
        {!hideCloseIcon && (
          <button aria-label="close-button" styleName="close-button" onClick={onBackdropClick}>
            <CloseIcon />
          </button>
        )}
      </div>
    </ReactModal>
  );
};

Modal.propTypes = {
  onBackdropClick: func,
  children: object,
  hideCloseIcon: bool
};
