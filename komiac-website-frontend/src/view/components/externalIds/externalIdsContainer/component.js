import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import BoolSelectComponent from "../../common/boolSelect/component";
import DisabledInputComponent from "../../common/disabledInput/component";
import EnabledInputComponent from "../../common/enabledInput/component";
import ExternalIdsDropdownComponent from "../externalIdsDropdown/component";

import {
    addOneMedicalOrganizationExternalIdsData,
    deleteOneMedicalOrganizationExternalIdsData,
    getOneMedicalOrganizationData,
    updateOneMedicalOrganizationData,
} from "../../../../state/slices/medicalOrganizationsSlice";

function ExternalIdsContainerComponent(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isChange, setIsChange] = useState(false);
    const [selectedExternalId, setSelectedExternalId] = useState({
        id: null,
        medicalOrganizationId: null,
        divisionId: "",
        isDeleted: false,
        externalSystem: "",
        value: ""
    });
    const [showAddExternalIdForm, setShowAddExternalIdForm] = useState(false);
    const [showEditExternalIdForm, setShowEditExternalIdForm] = useState(false);

    const [formExternalIdsData, setFormExternalIdsData] = useState({ externalIds: [] });
    const [formExternalIdData, setFormExternalIdData] = useState({
        id: null,
        medicalOrganizationId: null,
        divisionId: "",
        isDeleted: false,
        externalSystem: "",
        value: ""
    })

    useEffect(() => {
        if (props.externalIds && props.externalIds.length > 0) {
            setSelectedExternalId(props.externalIds[0]);
            setShowEditExternalIdForm(true);
            setFormExternalIdsData({
                externalIds: props.externalIds.map(externalId => ({
                    id: externalId.id,
                    medicalOrganizationId: externalId.medicalOrganizationId,
                    divisionId: externalId.divisionId,
                    isDeleted: externalId.isDeleted,
                    externalSystem: externalId.externalSystem,
                    value: externalId.value
                }))
            });
            setFormExternalIdData({
                id: null,
                medicalOrganizationId: null,
                divisionId: id,
                isDeleted: false,
                externalSystem: "",
                value: ""
            });
        } else {
            setSelectedExternalId({
                id: null,
                medicalOrganizationId: null,
                divisionId: "",
                isDeleted: false,
                externalSystem: "",
                value: ""
            });
            setShowEditExternalIdForm(false);
            setFormExternalIdsData({ externalIds: [] });
            setFormExternalIdData({
                id: null,
                medicalOrganizationId: null,
                divisionId: id,
                isDeleted: false,
                externalSystem: "",
                value: ""
            });
        }
    }, [id, props.externalIds]);

    const handleExternalIdInputChange = (event) => {
        const { name, value } = event.target;
        const updatedSelectedExternalId = {
            ...selectedExternalId,
            [name]: name === "isDeleted" ? value === 'true' : value
        };
        setSelectedExternalId(updatedSelectedExternalId);
        setFormExternalIdsData(prevState => ({
            externalIds: prevState.externalIds.map(externalId =>
                externalId.id === updatedSelectedExternalId.id ? updatedSelectedExternalId : externalId
            )
        }));
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

    const handleDeleteExternalIdButton = (id, externalIdId) => {
        dispatch(deleteOneMedicalOrganizationExternalIdsData({ id: id, externalIdId: externalIdId }));
        dispatch(getOneMedicalOrganizationData(id));
    };

    const handleAddExternalIdButton = () => {
        dispatch(addOneMedicalOrganizationExternalIdsData({ id: id, externalIdData: formExternalIdData }))
        setFormExternalIdData({
            id: null,
            medicalOrganizationId: null,
            divisionId: "",
            isDeleted: false,
            externalSystem: "",
            value: ""
        });
        dispatch(getOneMedicalOrganizationData(id));
        setShowAddExternalIdForm(false);
        setShowEditExternalIdForm(true);
    };

    const handleExternalIdSelect = (selectedExternalId) => {
        setSelectedExternalId(selectedExternalId);
        setShowAddExternalIdForm(false);
        setShowEditExternalIdForm(true);
    };

    const handleAddExternalId = () => {
        setShowAddExternalIdForm(true);
        setShowEditExternalIdForm(false);
    };

    return (
        <div className="organization-info-container">
            <div className="organization-info-subtitle">
                Идентификаторы в других системах
            </div>
            <div className="contacts-dropdown-container">
                <ExternalIdsDropdownComponent
                    title={"Список идентификаторов"}
                    externalIdsData={formExternalIdsData.externalIds}
                    onExternalIdSelect={handleExternalIdSelect}
                    onAddExternalId={handleAddExternalId}
                />
            </div>
            {showEditExternalIdForm && (
                <div className="contact-container">
                    <DisabledInputComponent
                        title={"ID"}
                        value={selectedExternalId.id}
                    />
                    <DisabledInputComponent
                        title={"ID Организации"}
                        value={selectedExternalId.medicalOrganizationId}
                    />
                    <DisabledInputComponent
                        title={"ID Подразделения"}
                        value={selectedExternalId.divisionId}
                    />
                    <BoolSelectComponent
                        title={"Удалено"}
                        name={"isDeleted"}
                        value={selectedExternalId.isDeleted}
                        handle={handleExternalIdInputChange}
                    />
                    <EnabledInputComponent
                        title={"Система"}
                        name={"externalSystem"}
                        value={selectedExternalId.externalSystem}
                        handle={handleExternalIdInputChange}
                    />
                    <EnabledInputComponent
                        title={"Значение"}
                        name={"value"}
                        value={selectedExternalId.value}
                        handle={handleExternalIdInputChange}
                    />
                    <button className="organization-info-button control"
                            onClick={() => handleDeleteExternalIdButton(id, selectedExternalId.id)}>Удалить
                    </button>
                </div>
            )}
            {showAddExternalIdForm && (
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
            )}
            <button className="organization-info-button"
                    onClick={handleConfirmButton.bind(this, formExternalIdsData)}>Сохранить
            </button>
        </div>
    )
}

export default ExternalIdsContainerComponent;
