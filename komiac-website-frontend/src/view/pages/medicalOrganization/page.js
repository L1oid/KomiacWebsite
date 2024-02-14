import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style.css"
import BoolSelectComponent from "../../components/boolSelect/component";
import DisabledInputComponent from "../../components/disabledInput/component";
import EnabledInputComponent from "../../components/enabledInput/component";
import { getOneMedicalOrganizationData, updateOneMedicalOrganizationMainData } from "../../../state/slices/medicalOrganizationsSlice";

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


    useEffect(() => {
        dispatch(getOneMedicalOrganizationData(id));
    }, [dispatch, id])

    useEffect(() => {
        if (dataMedicalOrganization) {
            setFormMainData({
                name: dataMedicalOrganization.name,
                address: dataMedicalOrganization.address,
                oID: dataMedicalOrganization.oID,
                territoryCode: dataMedicalOrganization.territoryCode,
                divisionCode: dataMedicalOrganization.divisionCode,
                divisionType: dataMedicalOrganization.divisionType
            });
        }
    }, [dataMedicalOrganization]);

    useEffect(() => {
        if (dataMedicalOrganization.dbSettings) {
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
            })
        }
    }, [dataMedicalOrganization]);

    useEffect(() => {
        if (dataMedicalOrganization.useModules) {
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
            })
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

    const handleConfirmButton = (formData) => {
        if (isChange) {
            const data = formData;
            dispatch(updateOneMedicalOrganizationMainData({ id, data }));
            setIsChange(false);
        }
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
            </div>
        </div>
    )
}

export default MedicalOrganizationPage;
