import React, {useEffect, useState} from 'react';

function DbSettingsDropdownComponent(props) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [filter, setFilter] = useState('');
    const [selectedNetwork, setSelectedNetwork] = useState({
        id: "",
        name: "",
        address: ""
    });

    useEffect(() => {
        setSelectedNetwork({
            id: props.vipnetSettings.id,
            name: props.vipnetSettings.name,
            address: props.vipnetSettings.address
        });
    }, [props.vipnetSettings]);

    const handleButtonClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleInputChange = (event) => {
        setFilter(event.target.value.toUpperCase());
    };

    const handleNetworkSelect = (networkData) => {
        setSelectedNetwork({
            id: networkData.id,
            name: networkData.name,
            address: networkData.address
        });
        props.handle(networkData);
        setShowDropdown(false);
    };

    return (
        <div className="organization-info-content">
            <div className="content-text">
                <span>
                    {props.title}
                </span>
            </div>
            <div className="dropdown">
                <button onClick={handleButtonClick} className="drop-btn">
                {"ID: " + selectedNetwork.id + " | "}
                    {"Название: " + selectedNetwork.name + " | "}
                    {"Адресс: " + selectedNetwork.address}
                </button>
                <div className={`dropdown-content ${showDropdown ? 'show' : ''}`}>
                    <input type="text" placeholder="Поиск по названию" className="drop-input" onKeyUp={handleInputChange}/>
                    {props.networksData.map((networkData, networkDataIndex) => (
                        <p
                            style={{display: filter === '' || networkData.name.toUpperCase().includes(filter) ? 'block' : 'none'}}
                            key={networkDataIndex}
                            onClick={() => handleNetworkSelect(networkData)}>
                            {"ID: " + networkData.id + " | "}
                            {"Название: " + networkData.name + " | "}
                            {"Адресс: " + networkData.address}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DbSettingsDropdownComponent;
