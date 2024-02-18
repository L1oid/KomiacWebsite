// ContactsContainerComponent.js
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import BoolSelectComponent from "../../common/boolSelect/component";
import DisabledInputComponent from "../../common/disabledInput/component";
import EnabledInputComponent from "../../common/enabledInput/component";
import ContactsSelectComponent from "../contactsSelect/component";
import ContactsDropdownComponent from "../contactsDropdown/component";
import ConfirmationDialogComponent from "../../common/сonfirmationDialog/component";
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
    const [selectedContact, setSelectedContact] = useState({
        id: null,
        medicalOrganizationId: null,
        divisionId: "",
        isDeleted: false,
        contactType: "",
        value: ""
    });
    const [showAddContactForm, setShowAddContactForm] = useState(false);
    const [showEditContactForm, setShowEditContactForm] = useState(false);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    const [formContactsData, setFormContactsData] = useState({ contacts: [] });
    const [formContactData, setFormContactData] = useState({
        id: null,
        medicalOrganizationId: null,
        divisionId: "",
        isDeleted: false,
        contactType: "",
        value: ""
    })

    useEffect(() => {
        if (props.contacts && props.contacts.length > 0) {
            setSelectedContact(props.contacts[0]);
            setShowEditContactForm(true);
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
        } else {
            setSelectedContact({
                id: null,
                medicalOrganizationId: null,
                divisionId: "",
                isDeleted: false,
                contactType: "",
                value: ""
            });
            setShowEditContactForm(false);
            setShowAddContactForm(true);
            setFormContactsData({ contacts: [] });
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

    const handleContactInputChange = (event) => {
        const { name, value } = event.target;
        const updatedSelectedContact = {
            ...selectedContact,
            [name]: name === "isDeleted" ? value === 'true' : value
        };
        setSelectedContact(updatedSelectedContact);
        setFormContactsData(prevState => ({
            contacts: prevState.contacts.map(contact =>
                contact.id === updatedSelectedContact.id ? updatedSelectedContact : contact
            )
        }));
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


    const handleDeleteConfirmation = (id, contactId) => {
        setShowConfirmationDialog(true);
    };

    const handleDeleteContactButton = (id, contactId) => {
        setShowConfirmationDialog(false);
        dispatch(deleteOneMedicalOrganizationContactsData({ id: id, contactId: contactId }));
        dispatch(getOneMedicalOrganizationData(id));
    };

    const handleAddContactButton = () => {
        dispatch(addOneMedicalOrganizationContactsData({ id: id, contactData: formContactData }))
        setFormContactData({
            id: null,
            medicalOrganizationId: null,
            divisionId: "",
            isDeleted: false,
            contactType: "",
            value: ""
        });
        dispatch(getOneMedicalOrganizationData(id));
        setShowAddContactForm(false);
        setShowEditContactForm(true);
    };

    const handleContactSelect = (selectedContact) => {
        setSelectedContact(selectedContact);
        setShowAddContactForm(false);
        setShowEditContactForm(true);
    };

    const handleAddContact = () => {
        setShowAddContactForm(true);
        setShowEditContactForm(false);
    };

    return (
        <div className="organization-info-container">
            <div className="organization-info-subtitle">
                Контакты
            </div>
            <div className="contacts-dropdown-container">
                <ContactsDropdownComponent
                    title={"Список контактов"}
                    contactsData={formContactsData.contacts}
                    onContactSelect={handleContactSelect}
                    onAddContact={handleAddContact}
                />
            </div>
            {showEditContactForm && (
                <div className="contact-container">
                    <DisabledInputComponent
                        title={"ID"}
                        value={selectedContact.id}
                    />
                    <DisabledInputComponent
                        title={"ID Организации"}
                        value={selectedContact.medicalOrganizationId}
                    />
                    <DisabledInputComponent
                        title={"ID Подразделения"}
                        value={selectedContact.divisionId}
                    />
                    <BoolSelectComponent
                        title={"Удалено"}
                        name={"isDeleted"}
                        value={selectedContact.isDeleted}
                        handle={handleContactInputChange}
                    />
                    <ContactsSelectComponent
                        title={"Тип контакта"}
                        name={"contactType"}
                        value={selectedContact.contactType}
                        handle={handleContactInputChange}
                    />
                    <EnabledInputComponent
                        title={"Значение"}
                        name={"value"}
                        value={selectedContact.value}
                        handle={handleContactInputChange}
                    />
                    <button className="organization-info-button control"
                            onClick={() => handleDeleteConfirmation(id, selectedContact.id)}>Удалить
                    </button>
                </div>
            )}
            {showConfirmationDialog && (
                <ConfirmationDialogComponent
                    message="Вы подтверждаете удаление?"
                    onConfirm={() => handleDeleteContactButton(id, selectedContact.id)}
                    onCancel={() => setShowConfirmationDialog(false)}
                />
            )}
            {showAddContactForm && (
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
                </div>
            )}
            {showAddContactForm && (
                <button className="organization-info-button"
                        onClick={handleAddContactButton}>Добавить
                </button>
            )}
            {showEditContactForm && (
                <button className="organization-info-button"
                        onClick={handleConfirmButton.bind(this, formContactsData)}>Сохранить
                </button>
            )}
        </div>
    )
}

export default ContactsContainerComponent;
