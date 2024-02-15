import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./style.css"
import BoolSelectComponent from "../../components/common/boolSelect/component";
import DisabledInputComponent from "../../components/common/disabledInput/component";
import EnabledInputComponent from "../../components/common/enabledInput/component";
import DbSettingsComponent from "../../components/dbSettings/dbSettingsContainer/component";
import {
    addOneMedicalOrganizationExternalIdsData,
    deleteOneMedicalOrganizationExternalIdsData,
    addOneMedicalOrganizationContactsData,
    deleteOneMedicalOrganizationContactsData,
    getOneMedicalOrganizationData,
    updateOneMedicalOrganizationData,
} from "../../../state/slices/medicalOrganizationsSlice";

function MedicalOrganizationPage() {
    const { id } = useParams();

    const dispatch = useDispatch();
    const dataMedicalOrganization = useSelector(state => state.medicalOrganizations.organizationData);

    const [isChange, setIsChange] = useState(false);
    const [formMainData, setFormMainData] = useState({
        name: "",
        isApproved: false,
        isActive: false,
        address: "",
        oID: "",
        territoryCode: "",
        divisionCode: "",
        divisionType: ""
    });
    const [formScheduleOptionsData, setFormScheduleOptionsData] = useState({
        scheduleOptions: {
            id: "",
            patientSearch: "",
            isOnlyAttachment: false,
            displayTickets: "",
            daysRange: "",
            isDoctorArea: false,
            isAllowCreateCard: false,
            isHasOnlyOneTicketToSpeciality: false
        }
    });
    const [formModulesData, setFormModulesData] = useState({
        useModules: {
            id: "",
            isUseHomeCall: false,
            isUseDispanserization: false,
            isUseVaccination: false,
            isUseAppointment: false,
            isUseDocumentsCallback: false,
            isUseNativeSite: false,
            isUseDispanserizationNotification: false
        }
    });
    const [formContactsData, setFormContactsData] = useState({contacts: []});
    const [formContactData, setFormContactData] = useState({
        id: null,
        medicalOrganizationId: null,
        divisionId: "",
        isDeleted: false,
        contactType: "",
        value: ""
    })
    const [formExternalIdsData, setFormExternalIdsData] = useState({externalIds: []});
    const [formExternalIdData, setFormExternalIdData] = useState({
        id: null,
        medicalOrganizationId: null,
        divisionId: "",
        isDeleted: false,
        externalSystem: "",
        value: ""
    })

    useEffect(() => {
        dispatch(getOneMedicalOrganizationData(id));
    }, [dispatch, id])

    useEffect(() => {
        if (dataMedicalOrganization &&
            dataMedicalOrganization.useModules &&
            dataMedicalOrganization.contacts &&
            dataMedicalOrganization.externalIds) {
            setFormMainData({
                name: dataMedicalOrganization.name,
                isApproved: dataMedicalOrganization.isApproved,
                isActive: dataMedicalOrganization.isActive,
                address: dataMedicalOrganization.address,
                oID: dataMedicalOrganization.oID,
                territoryCode: dataMedicalOrganization.territoryCode,
                divisionCode: dataMedicalOrganization.divisionCode,
                divisionType: dataMedicalOrganization.divisionType
            });
            setFormScheduleOptionsData({
                scheduleOptions: {
                    id: dataMedicalOrganization.scheduleOptions.id,
                    patientSearch: dataMedicalOrganization.scheduleOptions.patientSearch,
                    isOnlyAttachment: dataMedicalOrganization.scheduleOptions.isOnlyAttachment,
                    displayTickets: dataMedicalOrganization.scheduleOptions.displayTickets,
                    daysRange: dataMedicalOrganization.scheduleOptions.daysRange,
                    isDoctorArea: dataMedicalOrganization.scheduleOptions.isDoctorArea,
                    isAllowCreateCard: dataMedicalOrganization.scheduleOptions.isAllowCreateCard,
                    isHasOnlyOneTicketToSpeciality: dataMedicalOrganization.scheduleOptions.isHasOnlyOneTicketToSpeciality
                }
            });
            setFormModulesData({
                useModules: {
                    id: dataMedicalOrganization.useModules.id,
                    isUseHomeCall: dataMedicalOrganization.useModules.isUseHomeCall,
                    isUseDispanserization: dataMedicalOrganization.useModules.isUseDispanserization,
                    isUseVaccination: dataMedicalOrganization.useModules.isUseVaccination,
                    isUseAppointment: dataMedicalOrganization.useModules.isUseAppointment,
                    isUseDocumentsCallback: dataMedicalOrganization.useModules.isUseDocumentsCallback,
                    isUseNativeSite: dataMedicalOrganization.useModules.isUseNativeSite,
                    isUseDispanserizationNotification: dataMedicalOrganization.useModules.isUseDispanserizationNotification
                }
            });
            setFormContactsData({
                contacts: dataMedicalOrganization.contacts.map(contact => ({
                    id: contact.id,
                    medicalOrganizationId: contact.medicalOrganizationId,
                    divisionId: contact.divisionId,
                    isDeleted: contact.isDeleted,
                    contactType: contact.contactType,
                    value: contact.value
                }))
            });
            setFormExternalIdsData({
                externalIds: dataMedicalOrganization.externalIds.map(externalId => ({
                    id: externalId.id,
                    medicalOrganizationId: externalId.medicalOrganizationId,
                    divisionId: externalId.divisionId,
                    isDeleted: externalId.isDeleted,
                    externalSystem: externalId.externalSystem,
                    value: externalId.value
                }))
            });
            setFormContactData({
                id: null,
                medicalOrganizationId: null,
                divisionId: dataMedicalOrganization.id,
                isDeleted: false,
                contactType: "",
                value: ""
            });
            setFormExternalIdData({
                id: null,
                medicalOrganizationId: null,
                divisionId: dataMedicalOrganization.id,
                isDeleted: false,
                externalSystem: "",
                value: ""
            });
        }
    }, [dataMedicalOrganization]);

    const handleMainInputChange = (event) => {
        const { name, value } = event.target;
        setFormMainData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setIsChange(true);
    };

    const handleMainSelectChange = (event) => {
        const { name, value } = event.target;
        setFormMainData(prevState => ({
            ...prevState,
            [name]: value === 'true'
        }));
        setIsChange(true);
    };

    const handleScheduleOptionsInputChange = (event) => {
        const { name, value } = event.target;
        setFormScheduleOptionsData(prevState => ({
            ...prevState,
            scheduleOptions: {
                ...prevState.scheduleOptions,
                [name]: value
            }
        }));
        setIsChange(true);
    };

    const handleScheduleOptionsSelectChange = (event) => {
        const { name, value } = event.target;
        setFormScheduleOptionsData(prevState => ({
            ...prevState,
            scheduleOptions: {
                ...prevState.scheduleOptions,
                [name]: value === 'true'
            }
        }));
        setIsChange(true);
    };

    const handleModulesInputChange = (event) => {
        const { name, value } = event.target;
        setFormModulesData(prevState => ({
            ...prevState,
            useModules: {
                ...prevState.useModules,
                [name]: value === 'true'
            }
        }));
        setIsChange(true);
    };

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

    const handleExternalIdInputChange = (event, index) => {
        const { name, value } = event.target;
        setFormExternalIdsData(prevState => {
            const updatedExternalIds = [...prevState.externalIds];
            updatedExternalIds[index] = {
                ...updatedExternalIds[index],
                [name]: name === "isDeleted" ? value === 'true' : value
            };
            return { externalIds: updatedExternalIds };
        });
        setIsChange(true);
    };

    const handleNewExternalIdInputChange = (event) => {
        const { name, value } = event.target;
        setFormExternalIdData(prevState => ({
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

    const handleDeleteExternalIdButton = (id, externalIdId) => {
        dispatch(deleteOneMedicalOrganizationExternalIdsData({id: id, externalIdId: externalIdId}));
        dispatch(getOneMedicalOrganizationData(id));
    };

    const handleAddExternalIdButton = () => {
        dispatch(addOneMedicalOrganizationExternalIdsData({id: id, externalIdData: formExternalIdData}))
        setFormExternalIdData({
            id: null,
            medicalOrganizationId: null,
            divisionId: "",
            isDeleted: false,
            externalSystem: "",
            value: ""
        });
        dispatch(getOneMedicalOrganizationData(id));
    };

    return (
        <div className="page-container">
            <div className="organization-page-container">
                <div className="organization-info-container">
                    <div className="organization-info-subtitle">
                        Главная информация
                    </div>
                    <EnabledInputComponent
                        title={"Название"}
                        name={"name"}
                        value={formMainData.name}
                        handle={handleMainInputChange}
                    />
                    <DisabledInputComponent
                        title={"ID"}
                        value={dataMedicalOrganization.id}
                    />
                    <DisabledInputComponent
                        title={"ID Организации"}
                        value={dataMedicalOrganization.medicalOrganizationId}
                    />
                    <BoolSelectComponent
                        title={"Утверждена"}
                        name={"isApproved"}
                        value={formMainData.isApproved}
                        handle={handleMainSelectChange}
                    />
                    <BoolSelectComponent
                        title={"Активна"}
                        name={"isActive"}
                        value={formMainData.isActive}
                        handle={handleMainSelectChange}
                    />
                    <EnabledInputComponent
                        title={"Адрес"}
                        name={"address"}
                        value={formMainData.address}
                        handle={handleMainInputChange}
                    />
                    <EnabledInputComponent
                        title={"OID"}
                        name={"oID"}
                        value={formMainData.oID}
                        handle={handleMainInputChange}
                    />
                    <EnabledInputComponent
                        title={"Код территории"}
                        name={"territoryCode"}
                        value={formMainData.territoryCode}
                        handle={handleMainInputChange}
                    />
                    <EnabledInputComponent
                        title={"Код подразделения"}
                        name={"divisionCode"}
                        value={formMainData.divisionCode}
                        handle={handleMainInputChange}
                    />
                    <EnabledInputComponent
                        title={"Тип подразделения"}
                        name={"divisionType"}
                        value={formMainData.divisionType}
                        handle={handleMainInputChange}
                    />
                    <button className="organization-info-button"
                        onClick={handleConfirmButton.bind(this, formMainData)}>Сохранить
                    </button>
                </div>
                {dataMedicalOrganization && dataMedicalOrganization.scheduleOptions && (
                    <div className="organization-info-container">
                        <div className="organization-info-subtitle">
                            Параметры расписания
                        </div>
                        <DisabledInputComponent
                            title={"ID"}
                            value={dataMedicalOrganization.scheduleOptions.id}
                        />
                        <div className="organization-info-content">
                            <span className="content-text">Поиск пациента</span>
                            <select className="content-input"
                                    name="patientSearch"
                                    value={formScheduleOptionsData.scheduleOptions.patientSearch}
                                    onChange={handleScheduleOptionsInputChange}>
                                <option value={formScheduleOptionsData.scheduleOptions.patientSearch}>
                                    {formScheduleOptionsData.scheduleOptions.patientSearch}
                                </option>
                            </select>
                        </div>
                        <BoolSelectComponent
                            title={"Только прикреплённые"}
                            name={"isOnlyAttachment"}
                            value={formScheduleOptionsData.scheduleOptions.isOnlyAttachment}
                            handle={handleScheduleOptionsSelectChange}
                        />
                        <EnabledInputComponent
                            title={"Отображаемый тип талонов"}
                            name={"displayTickets"}
                            value={formScheduleOptionsData.scheduleOptions.displayTickets}
                            handle={handleScheduleOptionsInputChange}
                        />
                        <EnabledInputComponent
                            title={"Диапазон дней"}
                            name={"daysRange"}
                            value={formScheduleOptionsData.scheduleOptions.daysRange}
                            handle={handleScheduleOptionsInputChange}
                        />
                        <BoolSelectComponent
                            title={"Кабинет доктора"}
                            name={"isDoctorArea"}
                            value={formScheduleOptionsData.scheduleOptions.isDoctorArea}
                            handle={handleScheduleOptionsSelectChange}
                        />
                        <BoolSelectComponent
                            title={"Создание мед. карты"}
                            name={"isAllowCreateCard"}
                            value={formScheduleOptionsData.scheduleOptions.isAllowCreateCard}
                            handle={handleScheduleOptionsSelectChange}
                        />
                        <BoolSelectComponent
                            title={"Только один билет на специальность"}
                            name={"isHasOnlyOneTicketToSpeciality"}
                            value={formScheduleOptionsData.scheduleOptions.isHasOnlyOneTicketToSpeciality}
                            handle={handleScheduleOptionsSelectChange}
                        />
                        <button className="organization-info-button"
                                onClick={handleConfirmButton.bind(this, formScheduleOptionsData)}>Сохранить
                        </button>
                    </div>
                )}
                {dataMedicalOrganization && dataMedicalOrganization.dbSettings && (
                    <DbSettingsComponent dbSettings = {dataMedicalOrganization.dbSettings}></DbSettingsComponent>
                )}
                {dataMedicalOrganization && dataMedicalOrganization.useModules && (
                    <div className="organization-info-container">
                        <div className="organization-info-subtitle">
                            Модули
                        </div>
                        <DisabledInputComponent
                            title={"ID"}
                            value={dataMedicalOrganization.useModules.id}
                        />
                        <BoolSelectComponent
                            title={"Звонки на дом"}
                            name={"isUseHomeCall"}
                            value={formModulesData.useModules.isUseHomeCall}
                            handle={handleModulesInputChange}
                        />
                        <BoolSelectComponent
                            title={"Диспансеризация"}
                            name={"isUseDispanserization"}
                            value={formModulesData.useModules.isUseDispanserization}
                            handle={handleModulesInputChange}
                        />
                        <BoolSelectComponent
                            title={"Вакцинация"}
                            name={"isUseVaccination"}
                            value={formModulesData.useModules.isUseVaccination}
                            handle={handleModulesInputChange}
                        />
                        <BoolSelectComponent
                            title={"Приём"}
                            name={"isUseAppointment"}
                            value={formModulesData.useModules.isUseAppointment}
                            handle={handleModulesInputChange}
                        />
                        <BoolSelectComponent
                            title={"Обратная связь по документам"}
                            name={"isUseDocumentsCallback"}
                            value={formModulesData.useModules.isUseDocumentsCallback}
                            handle={handleModulesInputChange}
                        />
                        <BoolSelectComponent
                            title={"Свой сайт"}
                            name={"isUseNativeSite"}
                            value={formModulesData.useModules.isUseNativeSite}
                            handle={handleModulesInputChange}
                        />
                        <BoolSelectComponent
                            title={"Уведомление о диспансеризации"}
                            name={"isUseDispanserizationNotification"}
                            value={formModulesData.useModules.isUseDispanserizationNotification}
                            handle={handleModulesInputChange}
                        />
                        <button className="organization-info-button"
                                onClick={handleConfirmButton.bind(this, formModulesData)}>Сохранить
                        </button>
                    </div>
                )}
                {dataMedicalOrganization && dataMedicalOrganization.contacts && (
                    <div className="organization-info-container">
                        <div className="organization-info-subtitle">
                            Контакты
                        </div>
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
                                <EnabledInputComponent
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
                                value={dataMedicalOrganization.id}
                            />
                            <BoolSelectComponent
                                title={"Удалено"}
                                name={"isDeleted"}
                                value={formContactData.isDeleted}
                                handle={handleNewContactInputChange}
                            />
                            <EnabledInputComponent
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
                )}
                {dataMedicalOrganization && dataMedicalOrganization.externalIds && (
                    <div className="organization-info-container">
                        <div className="organization-info-subtitle">
                            Идентификаторы в других системах
                        </div>
                        {formExternalIdsData.externalIds.map((externalId, externalIdIndex) => (
                            <div className="contact-container" key={externalIdIndex}>
                                <DisabledInputComponent
                                    title={"ID"}
                                    value={externalId.id}
                                />
                                <DisabledInputComponent
                                    title={"ID Организации"}
                                    value={externalId.medicalOrganizationId}
                                />
                                <DisabledInputComponent
                                    title={"ID Подразделения"}
                                    value={externalId.divisionId}
                                />
                                <BoolSelectComponent
                                    title={"Удалено"}
                                    name={"isDeleted"}
                                    value={externalId.isDeleted}
                                    handle={(event) => handleExternalIdInputChange(event, externalIdIndex)}
                                />
                                <EnabledInputComponent
                                    title={"Система"}
                                    name={"externalSystem"}
                                    value={externalId.externalSystem}
                                    handle={(event) => handleExternalIdInputChange(event, externalIdIndex)}
                                />
                                <EnabledInputComponent
                                    title={"Значение"}
                                    name={"value"}
                                    value={externalId.value}
                                    handle={(event) => handleExternalIdInputChange(event, externalIdIndex)}
                                />
                                <button className="organization-info-button control"
                                        onClick={handleDeleteExternalIdButton
                                            .bind(this, id, externalId.id)}>Удалить
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
                                value={dataMedicalOrganization.id}
                            />
                            <BoolSelectComponent
                                title={"Удалено"}
                                name={"isDeleted"}
                                value={formExternalIdData.isDeleted}
                                handle={handleNewExternalIdInputChange}
                            />
                            <EnabledInputComponent
                                title={"Система"}
                                name={"externalSystem"}
                                value={formExternalIdData.externalSystem}
                                handle={handleNewExternalIdInputChange}
                            />
                            <EnabledInputComponent
                                title={"Значение"}
                                name={"value"}
                                value={formExternalIdData.value}
                                handle={handleNewExternalIdInputChange}
                            />
                            <button className="organization-info-button control" 
                                    onClick={handleAddExternalIdButton}>Добавить
                            </button>
                        </div>
                        <button className="organization-info-button" 
                                onClick={handleConfirmButton.bind(this, formExternalIdsData)}>Сохранить
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MedicalOrganizationPage;