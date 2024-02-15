import React from 'react';

function EnabledInputComponent(props) {
    return (
        <div className="organization-info-content">
            <span className="content-text">{props.title}</span>
            <input
                className="content-input"
                name={props.name}
                value={props.value}
                onChange={props.handle}
            />
        </div>
    )
}

export default EnabledInputComponent;