import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./style.css"
import UpButtonComponent from "../../components/common/upButton/component";
import BoolSelectComponent from "../../components/common/boolSelect/component";
import DisabledInputComponent from "../../components/common/disabledInput/component";
import EnabledInputComponent from "../../components/common/enabledInput/component";
import DbSettingsContainerComponent from "../../components/dbSettings/dbSettingsContainer/component";
import ContactsContainerComponent from "../../components/contacts/contactsContainer/component";
import ExternalIdsContainerComponent from "../../components/externalIds/externalIdsContainer/component";
import UseModulesContainerComponent from "../../components/useModules/useModuleContainer/component";
import ScheduleOptionsContainerComponent from "../../components/scheduleOptions/scheduleOptionsContainer/component";

import {
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

    useEffect(() => {
        dispatch(getOneMedicalOrganizationData(id));
    }, [dispatch, id])

    useEffect(() => {
        if (dataMedicalOrganization) {
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

    const handleConfirmButton = (formData) => {
        if (isChange) {
            const data = formData;
            dispatch(updateOneMedicalOrganizationData({ id, data }));
            setIsChange(false);
        }
    };

    return (
        <div className="page-container">
            <UpButtonComponent/>
            <div className="organization-page-container">
                <div className="organization-page-container-row-1">
                    <div className="organization-page-container-column-1">
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
                            <ScheduleOptionsContainerComponent
                                scheduleOptions={dataMedicalOrganization.scheduleOptions}
                            />
                        )}
                        {dataMedicalOrganization && dataMedicalOrganization.dbSettings && (
                            <DbSettingsContainerComponent
                                dbSettings={dataMedicalOrganization.dbSettings}
                            />
                        )}
                    </div>
                    <div className="organization-page-container-column-2">
                        {dataMedicalOrganization && dataMedicalOrganization.useModules && (
                            <UseModulesContainerComponent
                                useModules={dataMedicalOrganization.useModules}
                            />
                        )}
                        {dataMedicalOrganization && dataMedicalOrganization.contacts && (
                            <ContactsContainerComponent
                                contacts={dataMedicalOrganization.contacts}
                            />
                        )}
                        {dataMedicalOrganization && dataMedicalOrganization.externalIds && (
                            <ExternalIdsContainerComponent
                                externalIds={dataMedicalOrganization.externalIds}
                            />
                        )}</div>
                </div>
                <div className="organization-page-container-row-2"></div>
            </div>
        </div>
    )
}

export default MedicalOrganizationPage;