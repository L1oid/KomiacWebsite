import React from 'react';
import "./style.css"

function ConfirmationDialog({ message, onConfirm, onCancel }) {
    return (
        <div className="confirmation-dialog-overlay">
            <div className="confirmation-dialog">
                <p>{message}</p>
                <div className="confirmation-dialog-buttons">
                    <button onClick={onConfirm}>Да</button>
                    <button onClick={onCancel}>Нет</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationDialog;