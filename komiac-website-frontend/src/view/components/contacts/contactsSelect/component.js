import React from 'react';

function ContactsSelectComponent(props) {
    return (
        <div className="organization-info-content">
            <span className="content-text">{props.title}</span>
            <select className="content-input"
                    name={props.name}
                    value={props.value}
                    onChange={props.handle}>
                <option value={props.value}>
                    {props.value}
                </option>
                <option value={"Phone"}>
                    {"Phone"}
                </option>
                <option value={"Email"}>
                    {"Email"}
                </option>
            </select>
        </div>
    )
}

export default ContactsSelectComponent;