import React from 'react';

function ContactsSelectComponent(props) {
    return (
        <div className="organization-info-content">
            <div className="content-text">
                <span>
                    {props.title}
                </span>
            </div>
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