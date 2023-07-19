import React from 'react';
import ReactDOM from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalStyles from './modal.module.css'
import ModalOverLay from '../modal-overlay/modal-overlay';



const Modal = ({ active, setActive, children }) => {
    const modals = document.getElementById('modals');

    return ReactDOM.createPortal(
        <>
            <div className={active ? ModalStyles.visibilityNone : ModalStyles.visibility}>
                <ModalOverLay />
                <div className={ModalStyles.container}>
                    <div className={ModalStyles.closeButton} onClick={()=>setActive(true)} >
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

