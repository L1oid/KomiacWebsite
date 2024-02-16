import React, { useState } from 'react';

function ExternalIdsDropdownComponent(props) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [filter, setFilter] = useState('');

    const handleButtonClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleInputChange = (event) => {
        setFilter(event.target.value.toUpperCase());
    };

    const handleExternalIdSelect = (selectedExternalId) => {
        props.onExternalIdSelect(selectedExternalId);
        setShowDropdown(false);
    };

    const handleAddExternalId = () => {
        setShowDropdown(false);
        props.onAddExternalId();
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
                Показать идентификаторы
                </button>
                <div className={`dropdown-content ${showDropdown ? 'show' : ''}`}>
                    <input type="text" placeholder="Поиск по значению" className="drop-input"
                           onKeyUp={handleInputChange}/>
                    <p onClick={handleAddExternalId}>Добавить идентификатор</p>
                    {props.externalIdsData.map((externalIdData, externalIdDataIndex) => (
                        <p
                            style={{display: filter === '' || externalIdData.value.toUpperCase().includes(filter) ? 'block' : 'none'}}
                            key={externalIdDataIndex}
                            onClick={() => handleExternalIdSelect(externalIdData)}>{externalIdData.value}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ExternalIdsDropdownComponent;
