import React from "react"
import ModalOverlayStyles from './modal-overlay.module.css'

const ModalOverLay = ({onClose}) => {
    return (
        <div className={ModalOverlayStyles.overlay} onClick={onClose}></div>
    )
}

export default ModalOverLay