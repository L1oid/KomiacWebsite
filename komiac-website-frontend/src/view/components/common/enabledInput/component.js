import React from 'react';

function EnabledInputComponent(props) {
    return (
        <div className="organization-info-content">
            <div className="content-text">
                <span>
                    {props.title}
                </span>
            </div>
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