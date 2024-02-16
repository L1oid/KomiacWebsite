import React, { useState } from 'react';

function ContactsDropdownComponent(props) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [filter, setFilter] = useState('');

    const handleButtonClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleInputChange = (event) => {
        setFilter(event.target.value.toUpperCase());
    };

    const handleContactSelect = (selectedContact) => {
        props.onContactSelect(selectedContact);
        setShowDropdown(false);
    };

    const handleAddContact = () => {
        setShowDropdown(false);
        props.onAddContact();
    };

    return (
        <div className="organization-info-content">
            <span className="content-text">{props.title}</span>
            <div className="dropdown">
                <button onClick={handleButtonClick} className="drop-btn">
                    Показать контакты
                </button>
                <div className={`dropdown-content ${showDropdown ? 'show' : ''}`}>
                    <input type="text" placeholder="Поиск по значению" className="drop-input"
                           onKeyUp={handleInputChange}/>
                    <p onClick={handleAddContact}>Добавить контакт</p>
                    {props.contactsData.map((contactData, contactDataIndex) => (
                        <p
                            style={{display: filter === '' || contactData.value.toUpperCase().includes(filter) ? 'block' : 'none'}}
                            key={contactDataIndex}
                            onClick={() => handleContactSelect(contactData)}>{contactData.value}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ContactsDropdownComponent;
