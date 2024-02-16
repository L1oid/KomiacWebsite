import React from 'react';

function ScheduleOptionsSelectComponent(props) {
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
                <option value={"PolisOMS1"}>
                    {"PolisOMS1"}
                </option>
                <option value={"PolisOMS2"}>
                    {"PolisOMS2"}
                </option>
            </select>
        </div>
    )
}

export default ScheduleOptionsSelectComponent;