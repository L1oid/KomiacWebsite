import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./style.css"
import BoolSelectComponent from "../../components/boolSelect/component";
import DisabledInputComponent from "../../components/disabledInput/component";
import EnabledInputComponent from "../../components/enabledInput/component";
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
        address: "",
        oID: "",
        territoryCode: "",
        divisionCode: "",
        divisionType: ""
    });
    const [formDbData, setFormDbData] = useState({
        dbSettings: {
            id: "",
            vipnetSettings: {
                id: "",
                name: "",
                address: ""
            },
            pathToDb: "",
            login: "",
            password: "",
            provider: ""
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
            dataMedicalOrganization.dbSettings &&
            dataMedicalOrganization.useModules &&
            dataMedicalOrganization.contacts &&
            dataMedicalOrganization.externalIds) {
            setFormMainData({
                name: dataMedicalOrganization.name,
                address: dataMedicalOrganization.address,
                oID: dataMedicalOrganization.oID,
                territoryCode: dataMedicalOrganization.territoryCode,
                divisionCode: dataMedicalOrganization.divisionCode,
                divisionType: dataMedicalOrganization.divisionType
            });
            setFormDbData({
                dbSettings: {
                    id: dataMedicalOrganization.dbSettings.id,
                    vipnetSettings: {
                        id: dataMedicalOrganization.dbSettings.vipnetSettings.id,
                        name: dataMedicalOrganization.dbSettings.vipnetSettings.name,
                        address: dataMedicalOrganization.dbSettings.vipnetSettings.address
                    },
                    pathToDb: dataMedicalOrganization.dbSettings.pathToDb,
                    login: dataMedicalOrganization.dbSettings.login,
                    password: dataMedicalOrganization.dbSettings.password,
                    provider: dataMedicalOrganization.dbSettings.provider
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

    const handleDbInputChange = (event) => {
        const { name, value } = event.target;
        setFormDbData(prevState => ({
            ...prevState,
            dbSettings: {
                ...prevState.dbSettings,
                [name]: value
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

    const handleDbSelectChange = (event) => {
        const selectedIndex = event.target.selectedIndex;
        const selectedOption = event.target.options[selectedIndex];
        const selectedId = selectedOption.dataset.id;
        const selectedName = selectedOption.dataset.name;
        const selectedAddress = selectedOption.dataset.address;

        setFormDbData(prevState => ({
            ...prevState,
            dbSettings: {
                ...prevState.dbSettings,
                vipnetSettings: {
                    id: selectedId,
                    name: selectedName,
                    address: selectedAddress
                }
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
        console.log(formModulesData)
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
                        title={"ID Подразделения"}
                        value={dataMedicalOrganization.medicalOrganizationId}
                    />
                    <DisabledInputComponent
                        title={"Утверждена"}
                        value={dataMedicalOrganization.isApproved ? "Да" : "Нет"}
                    />
                    <DisabledInputComponent
                        title={"Активна"}
                        value={dataMedicalOrganization.isActive ? "Да" : "Нет"}
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
                        onClick={handleConfirmButton.bind(this, formMainData)}>Подтвердить
                    </button>
                </div>
                {dataMedicalOrganization && dataMedicalOrganization.dbSettings && (
                    <div className="organization-info-container">
                        <div className="organization-info-subtitle">
                            Параметры базы данных
                        </div>
                        <DisabledInputComponent
                            title={"ID"}
                            value={dataMedicalOrganization.dbSettings.id}
                        />
                        <div className="organization-info-content">
                            <span className="content-text">Сети</span>
                            <select className="content-input" onChange={handleDbSelectChange}>
                                <option data-id={dataMedicalOrganization.dbSettings.vipnetSettings.id}
                                        data-name={dataMedicalOrganization.dbSettings.vipnetSettings.name}
                                        data-address={dataMedicalOrganization.dbSettings.vipnetSettings.address}>
                                    {"ID: " + dataMedicalOrganization.dbSettings.vipnetSettings.id + " | "}
                                    {"Название: " + dataMedicalOrganization.dbSettings.vipnetSettings.name + " | "}
                                    {"Адресс: " + dataMedicalOrganization.dbSettings.vipnetSettings.address}
                                </option>
                            </select>
                        </div>
                        <EnabledInputComponent
                            title={"Путь до БД"}
                            name={"pathToDb"}
                            value={formDbData.dbSettings.pathToDb}
                            handle={handleDbInputChange}
                        />
                        <EnabledInputComponent
                            title={"Логин"}
                            name={"login"}
                            value={formDbData.dbSettings.login}
                            handle={handleDbInputChange}
                        />
                        <EnabledInputComponent
                            title={"Пароль"}
                            name={"password"}
                            value={formDbData.dbSettings.password}
                            handle={handleDbInputChange}
                        />
                        <div className="organization-info-content">
                            <span className="content-text">Система</span>
                            <select className="content-input"
                                    name="provider"
                                    value={formDbData.dbSettings.provider}
                                    onChange={handleDbInputChange}>
                                <option value={dataMedicalOrganization.dbSettings.provider}>
                                    {dataMedicalOrganization.dbSettings.provider}
                                </option>
                            </select>
                        </div>
                        <button className="organization-info-button"
                                onClick={handleConfirmButton.bind(this, formDbData)}>Подтвердить
                        </button>
                    </div>
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
                                onClick={handleConfirmButton.bind(this, formModulesData)}>Подтвердить
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
                                onClick={handleConfirmButton.bind(this, formContactsData)}>Подтвердить
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
                                onClick={handleConfirmButton.bind(this, formExternalIdsData)}>Подтвердить
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MedicalOrganizationPage;