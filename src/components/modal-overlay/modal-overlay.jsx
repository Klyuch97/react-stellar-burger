import React from "react"
import ModalOverlayStyles from './modal-overlay.module.css'
import PropTypes from 'prop-types';

const ModalOverLay = ({onClose}) => {
    return (
        <div className={ModalOverlayStyles.overlay} onClick={onClose}></div>
    )
}
ModalOverLay.propTypes={
    onClose: PropTypes.func.isRequired
}

export default ModalOverLay