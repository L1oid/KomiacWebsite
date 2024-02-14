import React from 'react';

function DisabledInputComponent(props) {
    return (
        <div className="organization-info-content">
            <span className="content-text">{props.title}</span>
            <input
                className="content-input"
                defaultValue={props.value}
                disabled
            />
        </div>
    )
}

export default DisabledInputComponent;