import React from 'react';

function DisabledInputComponent(props) {
    return (
        <div className="organization-info-content">
            <span className="content-text">{props.title}</span>
            <input
                className="content-input"
                value={props.value || ''}
                disabled
            />
        </div>
    )
}

export default DisabledInputComponent;