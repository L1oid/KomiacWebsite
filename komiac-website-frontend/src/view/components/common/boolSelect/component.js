import React from 'react';

function BoolSelectComponent(props) {
    return (
        <div className="organization-info-content">
            <span className="content-text">{props.title}</span>
            <select className="content-input"
                    name={props.name}
                    value={props.value}
                    onChange={props.handle}>
                <option value={props.value}>
                    {props.value ? "Да" : "Нет"}
                </option>
                <option value={!props.value}>
                    {!props.value ? "Да" : "Нет"}
                </option>
            </select>
        </div>
    )
}

export default BoolSelectComponent;