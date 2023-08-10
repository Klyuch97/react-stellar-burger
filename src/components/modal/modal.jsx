import React from 'react';
import ReactDOM from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalStyles from './modal.module.css'
import ModalOverLay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';



const Modal = ({ children, onClose,}) => {
    const {modalActive}= useSelector(state=> state.modal)

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
    if (!modalActive) { return null; }

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

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children:PropTypes.element
}

export default Modal;

