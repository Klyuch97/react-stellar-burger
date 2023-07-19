import React from 'react';
import ReactDOM from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalStyles from './modal.module.css'
import ModalOverLay from '../modal-overlay/modal-overlay';



const Modal = ({ children, onClose, active }) => {
    React.useEffect(() => {
        const closeEsc = (evt) => {
            if (evt.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", closeEsc);

        return () => document.removeEventListener("keydown", closeEsc);
    }, [onClose]);
    const modals = document.getElementById('modals');
    if (!active) { return null; }

    return ReactDOM.createPortal(
        <>
            <div className={ModalStyles.visibility}>
                <ModalOverLay onClose={onClose} />
                <div className={ModalStyles.container}>
                    <div className={ModalStyles.closeButton} onClick={onClose} >
                        <CloseIcon type="primary" />
                    </div>
                    {children}
                </div>
            </div>
        </>
        ,
        modals
    )
}

export default Modal;

