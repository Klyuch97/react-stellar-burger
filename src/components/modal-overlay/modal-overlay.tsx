import React, { FC } from "react"
import ModalOverlayStyles from './modal-overlay.module.css'

type ModalOverlay = {
    onClose: () => void;
}

const ModalOverLay: FC<ModalOverlay> = ({ onClose }) => {
    return (
        <div className={ModalOverlayStyles.overlay} onClick={onClose}></div>
    )
}

export default ModalOverLay