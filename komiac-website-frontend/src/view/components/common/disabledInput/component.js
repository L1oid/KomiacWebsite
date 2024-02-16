import React from 'react';

function DisabledInputComponent(props) {
    return (
        <div className="organization-info-content">
            <div className="content-text">
                <span>
                    {props.title}
                </span>
            </div>
            <input
                className="content-input"
                value={props.value || ''}
                disabled
            />
        </div>
    )
}

export default DisabledInputComponent;