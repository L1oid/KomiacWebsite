import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";

import BoolSelectComponent from "../../common/boolSelect/component";
import DisabledInputComponent from "../../common/disabledInput/component";
import EnabledInputComponent from "../../common/enabledInput/component";

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
        if (props.externalIds) {
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
        }
    }, [id, props.externalIds]);

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
            <button className="organization-info-button"
                    onClick={handleConfirmButton.bind(this, formExternalIdsData)}>Сохранить
            </button>
        </div>
    )
}

export default ExternalIdsContainerComponent;