import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./styles/Modal.scss";

const modalRoot = document.getElementById("modal");

const Modal = ({ setShowModal, children }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  // Allow keyboard handling within the modal
  useEffect(() => {
    function keyListener(e) {
      if (e.key == "Escape") {
        setShowModal(false);
      }
    }

    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });

  return createPortal(
    <div>
      {children}
      <button
        tabIndex={0}
        onClick={() => setShowModal(false)}
        className="modal__button"
      >
        Close
      </button>
    </div>,
    elRef.current
  );
};

export default Modal;
