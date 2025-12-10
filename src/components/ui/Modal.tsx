import React, { useEffect } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="c-modal">
      {/* Backdrop */}
      <div
        className="c-modal__backdrop c-modal__backdrop--blur"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="c-modal__container">
        <div className="c-modal__dialog">
          <div className="c-modal__header">
            <h3 className="c-modal__heading">{title || "Modal"}</h3>
            <button
              onClick={onClose}
              className="close-button close-button--default c-modal__close-trigger"
            >
              <X />
            </button>
          </div>
          <div className="c-modal__body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
