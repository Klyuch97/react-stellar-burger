import React, { FC, ReactNode } from 'react';
import ReactDOM from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalStyles from './modal.module.css'
import ModalOverLay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

interface IModal {
    onClose: () => void,
    children?: ReactNode
}

const Modal: FC<IModal> = ({ children, onClose, }) => {

    React.useEffect(() => {
        const closeEsc = (evt: any) => {
            if (evt.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", closeEsc);

        return () => document.removeEventListener("keydown", closeEsc);
    }, [onClose]);
    const modals = document.getElementById('modals') as HTMLElement;

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

// Modal.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     children: PropTypes.element
// }

export default Modal;

