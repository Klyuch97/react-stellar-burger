import React, { FC } from "react"
import ModalOverlayStyles from './modal-overlay.module.css'

interface IModalOverlay {
    onClose: () => void;
}

const ModalOverLay: FC<IModalOverlay> = ({ onClose }) => {
    return (
        <div className={ModalOverlayStyles.overlay} onClick={onClose}></div>
    )
}

export default ModalOverLay