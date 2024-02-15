import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";

import BoolSelectComponent from "../../common/boolSelect/component";
import DisabledInputComponent from "../../common/disabledInput/component";

import {updateOneMedicalOrganizationData} from "../../../../state/slices/medicalOrganizationsSlice";

function UseModulesContainerComponent(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isChange, setIsChange] = useState(false);
    
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
        if (props.useModules) {
            setFormModulesData({
                useModules: {
                    id: props.useModules.id,
                    isUseHomeCall: props.useModules.isUseHomeCall,
                    isUseDispanserization: props.useModules.isUseDispanserization,
                    isUseVaccination: props.useModules.isUseVaccination,
                    isUseAppointment: props.useModules.isUseAppointment,
                    isUseDocumentsCallback: props.useModules.isUseDocumentsCallback,
                    isUseNativeSite: props.useModules.isUseNativeSite,
                    isUseDispanserizationNotification: props.useModules.isUseDispanserizationNotification
                }
            });
        }
    }, [props.useModules]);

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

    const handleConfirmButton = (formData) => {
        if (isChange) {
            const data = formData;
            dispatch(updateOneMedicalOrganizationData({ id, data }));
            setIsChange(false);
        }
    };

    return (
        <div className="organization-info-container">
            <div className="organization-info-subtitle">
                Модули
            </div>
            <DisabledInputComponent
                title={"ID"}
                value={props.useModules.id}
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
    )
}

export default UseModulesContainerComponent;