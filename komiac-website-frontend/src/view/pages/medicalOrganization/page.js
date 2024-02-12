import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style.css"
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
        console.log(isChange);
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
                    <div className="organization-info-content">
                        <span className="content-text">Название</span>
                        <input
                            className="content-input"
                            name="name"
                            value={formMainData.name}
                            onChange={handleMainInputChange}
                        />
                    </div>
                    <div className="organization-info-content">
                        <span className="content-text">ID</span>
                        <input
                            className="content-input"
                            defaultValue={dataMedicalOrganization.id}
                            disabled
                        />
                    </div>
                    <div className="organization-info-content">
                        <span className="content-text">ID Подразделения</span>
                        <input
                            className="content-input"
                            defaultValue={dataMedicalOrganization.medicalOrganizationId}
                            disabled
                        />
                    </div>
                    <div className="organization-info-content">
                        <span className="content-text">Утверждена</span>
                        <input
                            className="content-input"
                            value={dataMedicalOrganization.isApproved ? "Да" : "Нет"}
                            disabled
                        />
                    </div>
                    <div className="organization-info-content">
                        <span className="content-text">Активна</span>
                        <input
                            className="content-input"
                            value={dataMedicalOrganization.isActive ? "Да" : "Нет"}
                            disabled
                        />
                    </div>
                    <div className="organization-info-content">
                        <span className="content-text">Адрес</span>
                        <input
                            className="content-input"
                            name="address"
                            value={formMainData.address}
                            onChange={handleMainInputChange}
                        />
                    </div>
                    <div className="organization-info-content">
                        <span className="content-text">OID</span>
                        <input
                            className="content-input"
                            name="oID"
                            value={formMainData.oID}
                            onChange={handleMainInputChange}
                        />
                    </div>
                    <div className="organization-info-content">
                        <span className="content-text">Код территории</span>
                        <input
                            className="content-input"
                            name="territoryCode"
                            value={formMainData.territoryCode}
                            onChange={handleMainInputChange}
                        />
                    </div>
                    <div className="organization-info-content">
                        <span className="content-text">Код подразделения</span>
                        <input
                            className="content-input"
                            name="divisionCode"
                            value={formMainData.divisionCode}
                            onChange={handleMainInputChange}
                        />
                    </div>
                    <div className="organization-info-content">
                        <span className="content-text">Тип подразделения</span>
                        <input
                            className="content-input"
                            name="divisionType"
                            value={formMainData.divisionType}
                            onChange={handleMainInputChange}
                        />
                    </div>
                    <button className="organization-info-button" onClick={handleConfirmButton.bind(this, formMainData)}>Подтвердить</button>
                </div>
                {dataMedicalOrganization.dbSettings && (
                    <div className="organization-info-container">
                        <div className="organization-info-subtitle">
                            Параметры базы данных
                        </div>
                        <div className="organization-info-content">
                            <span className="content-text">ID</span>
                            <input
                                className="content-input"
                                defaultValue={dataMedicalOrganization.dbSettings.id}
                                disabled
                            />
                        </div>
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
                        <div className="organization-info-content">
                            <span className="content-text">Путь до БД</span>
                            <input
                                className="content-input"
                                name="pathToDb"
                                value={formDbData.dbSettings.pathToDb}
                                onChange={handleDbInputChange}
                            />
                        </div>
                        <div className="organization-info-content">
                            <span className="content-text">Логин</span>
                            <input
                                className="content-input"
                                name="login"
                                value={formDbData.dbSettings.login}
                                onChange={handleDbInputChange}
                            />
                        </div>
                        <div className="organization-info-content">
                            <span className="content-text">Пароль</span>
                            <input
                                className="content-input"
                                name="password"
                                value={formDbData.dbSettings.password}
                                onChange={handleDbInputChange}
                            />
                        </div>
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
            </div>
        </div>
    )
}

export default MedicalOrganizationPage;
