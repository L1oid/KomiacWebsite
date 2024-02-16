import React from 'react';

function DbSettingsSelectComponent(props) {
    return (
        <div className="organization-info-content">
            <div className="content-text">
                <span>
                    {props.title}
                </span>
            </div>
            <select className="content-input"
                    name="provider"
                    value={props.value}
                    onChange={props.handle}>
                <option value={props.value}>
                    {props.value}
                </option>
                <option value={"Система 1"}>
                    {"Система 1"}
                </option>
                <option value={"Система 2"}>
                    {"Система 2"}
                </option>
            </select>
        </div>
    )
}

export default DbSettingsSelectComponent;