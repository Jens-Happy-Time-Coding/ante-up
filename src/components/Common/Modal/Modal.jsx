import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

function Modal(props) {

    if ( props.show ) {
        return (
        <div className="modal-container">
            <div className="modal">
                <h2>{props.title}</h2>
                <div className="modal-content">
                    I'll be the content
                </div>
                <div className="modal-actions">                    
                    <div className="action-buttons">
                        <button onClick={props.close}>Close</button>
                    </div>
                </div>

            </div>
        </div>
        )
    } else {
        return null;
    }

}
Modal.PropTypes = {
    title: PropTypes.string,
    close: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
}
export default Modal;