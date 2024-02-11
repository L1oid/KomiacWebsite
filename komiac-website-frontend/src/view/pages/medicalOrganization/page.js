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
    const [formData, setFormData] = useState({
        address: "",
        oID: "",
        territoryCode: "",
        divisionCode: "",
        divisionType: ""
    });

    useEffect(() => {
        dispatch(getOneMedicalOrganizationData(id));
    }, [dispatch, id])

    useEffect(() => {
        if (dataMedicalOrganization) {
            setFormData({
                address: dataMedicalOrganization.address,
                oID: dataMedicalOrganization.oID,
                territoryCode: dataMedicalOrganization.territoryCode,
                divisionCode: dataMedicalOrganization.divisionCode,
                divisionType: dataMedicalOrganization.divisionType
            });
        }
    }, [dataMedicalOrganization]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setIsChange(true);
    };

    const handleConfirmButton = () => {
        console.log(isChange);
        if (isChange) {
            const data = formData;
            dispatch(updateOneMedicalOrganizationMainData({ id, data }));
        }
    };

    return (
        <div className="page-container">
            <div></div>
            <div className="organization-page-container">
                <div className="organization-main-info">
                    <div className="organization-info-title">
                        {dataMedicalOrganization.name}
                    </div>
                    <div className="organization-info-subtitle">
                        Главная информация
                    </div>
                    <div className="organization-info-content">
                        <span className="content-text">ID</span>
                        <input
                            className="content-input"
                            type="text"
                            defaultValue={dataMedicalOrganization.medicalOrganizationId}
                            disabled
                        />
                    </div>
                    <div className="organization-info-content">
                        <span className="content-text">Утверждена</span>
                        <input
                            className="content-input"
                            type="text"
                            value={dataMedicalOrganization.isApproved ? "Да" : "Нет"}
                            disabled
                        />
                    </div>
                    <div className="organization-info-content">
                        <span className="content-text">Активна</span>
                        <input
                            className="content-input"
                            type="text"
                            value={dataMedicalOrganization.isActive ? "Да" : "Нет"}
                            disabled
                        />
                    </div>
                    <div className="organization-info-content">
                        <span className="content-text">Адрес</span>
                        <input
                            className="content-input"
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="organization-info-content">
                        <span className="content-text">OID</span>
                        <input
                            className="content-input"
                            type="text"
                            name="oID"
                            value={formData.oID}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="organization-info-content">
                        <span className="content-text">Код территории</span>
                        <input
                            className="content-input"
                            type="text"
                            name="territoryCode"
                            value={formData.territoryCode}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="organization-info-content">
                        <span className="content-text">Код подразделения</span>
                        <input
                            className="content-input"
                            type="text"
                            name="divisionCode"
                            value={formData.divisionCode}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="organization-info-content">
                        <span className="content-text">Тип подразделения</span>
                        <input
                            className="content-input"
                            type="text"
                            name="divisionType"
                            value={formData.divisionType}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="organization-info-button" onClick={handleConfirmButton}>Подтвердить</button>
                </div>
            </div>
        </div>
    )
}

export default MedicalOrganizationPage;
