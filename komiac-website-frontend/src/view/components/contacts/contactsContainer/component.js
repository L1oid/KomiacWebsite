import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";

import BoolSelectComponent from "../../common/boolSelect/component";
import DisabledInputComponent from "../../common/disabledInput/component";
import EnabledInputComponent from "../../common/enabledInput/component";
import ContactsSelectComponent from "../contactsSelect/component";
import ContactsDropdownComponent from "../contactsDropdown/component";
import {
    addOneMedicalOrganizationContactsData,
    deleteOneMedicalOrganizationContactsData,
    getOneMedicalOrganizationData,
    updateOneMedicalOrganizationData,
} from "../../../../state/slices/medicalOrganizationsSlice";

function ContactsContainerComponent(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isChange, setIsChange] = useState(false);

    const [formContactsData, setFormContactsData] = useState({contacts: []});
    const [formContactData, setFormContactData] = useState({
        id: null,
        medicalOrganizationId: null,
        divisionId: "",
        isDeleted: false,
        contactType: "",
        value: ""
    })

    useEffect(() => {
        if (props.contacts) {
            setFormContactsData({
                contacts: props.contacts.map(contact => ({
                    id: contact.id,
                    medicalOrganizationId: contact.medicalOrganizationId,
                    divisionId: contact.divisionId,
                    isDeleted: contact.isDeleted,
                    contactType: contact.contactType,
                    value: contact.value
                }))
            });
            setFormContactData({
                id: null,
                medicalOrganizationId: null,
                divisionId: id,
                isDeleted: false,
                contactType: "",
                value: ""
            });
        }
    }, [id, props.contacts]);


    const handleContactInputChange = (event, index) => {
        const { name, value } = event.target;
        setFormContactsData(prevState => {
            const updatedContacts = [...prevState.contacts];
            updatedContacts[index] = {
                ...updatedContacts[index],
                [name]: name === "isDeleted" ? value === 'true' : value
            };
            return { contacts: updatedContacts };
        });
        setIsChange(true);
    };

    const handleNewContactInputChange = (event) => {
        const { name, value } = event.target;
        setFormContactData(prevState => ({
            ...prevState,
            [name]: name === "isDeleted" ? value === 'true' : value
        }));
    };

    const handleConfirmButton = (formData) => {
        if (isChange) {
            const data = formData;
            dispatch(updateOneMedicalOrganizationData({ id, data }));
            setIsChange(false);
        }
    };

    const handleDeleteContactButton = (id, contactId) => {
        dispatch(deleteOneMedicalOrganizationContactsData({id: id, contactId: contactId}));
        dispatch(getOneMedicalOrganizationData(id));
    };

    const handleAddContactButton = () => {
        dispatch(addOneMedicalOrganizationContactsData({id: id, contactData: formContactData}))
        setFormContactData({
            id: null,
            medicalOrganizationId: null,
            divisionId: "",
            isDeleted: false,
            contactType: "",
            value: ""
        });
        dispatch(getOneMedicalOrganizationData(id));
    };

    return (
        <div className="organization-info-container">
            <div className="organization-info-subtitle">
                Контакты
            </div>
            <ContactsDropdownComponent
                title={"Список контактов"}
                contactsData={formContactsData.contacts}
            />
            {formContactsData.contacts.map((contact, contactIndex) => (
                <div className="contact-container" key={contactIndex}>
                    <DisabledInputComponent
                        title={"ID"}
                        value={contact.id}
                    />
                    <DisabledInputComponent
                        title={"ID Организации"}
                        value={contact.medicalOrganizationId}
                    />
                    <DisabledInputComponent
                        title={"ID Подразделения"}
                        value={contact.divisionId}
                    />
                    <BoolSelectComponent
                        title={"Удалено"}
                        name={"isDeleted"}
                        value={contact.isDeleted}
                        handle={(event) => handleContactInputChange(event, contactIndex)}
                    />
                    <ContactsSelectComponent
                        title={"Тип контакта"}
                        name={"contactType"}
                        value={contact.contactType}
                        handle={(event) => handleContactInputChange(event, contactIndex)}
                    />
                    <EnabledInputComponent
                        title={"Значение"}
                        name={"value"}
                        value={contact.value}
                        handle={(event) => handleContactInputChange(event, contactIndex)}
                    />
                    <button className="organization-info-button control"
                            onClick={handleDeleteContactButton
                                .bind(this, id, contact.id)}>Удалить
                    </button>
                </div>
            ))}
            <div className="contact-container">
                <DisabledInputComponent
                    title={"ID"}
                    value={null}
                />
                <DisabledInputComponent
                    title={"ID Организации"}
                    value={null}
                />
                <DisabledInputComponent
                    title={"ID Подразделения"}
                    value={id}
                />
                <BoolSelectComponent
                    title={"Удалено"}
                    name={"isDeleted"}
                    value={formContactData.isDeleted}
                    handle={handleNewContactInputChange}
                />
                <ContactsSelectComponent
                    title={"Тип контакта"}
                    name={"contactType"}
                    value={formContactData.contactType}
                    handle={handleNewContactInputChange}
                />
                <EnabledInputComponent
                    title={"Значение"}
                    name={"value"}
                    value={formContactData.value}
                    handle={handleNewContactInputChange}
                />
                <button className="organization-info-button control"
                        onClick={handleAddContactButton}>Добавить
                </button>
            </div>
            <button className="organization-info-button"
                    onClick={handleConfirmButton.bind(this, formContactsData)}>Сохранить
            </button>
        </div>
    )
}

export default ContactsContainerComponent;