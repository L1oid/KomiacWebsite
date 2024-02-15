import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";

import BoolSelectComponent from "../../common/boolSelect/component";
import DisabledInputComponent from "../../common/disabledInput/component";
import EnabledInputComponent from "../../common/enabledInput/component";
import ScheduleOptionsSelectComponent from "../scheduleOptionsSelect/component";

import {updateOneMedicalOrganizationData} from "../../../../state/slices/medicalOrganizationsSlice";

function ScheduleOptionsContainerComponent(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isChange, setIsChange] = useState(false);
    
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
    
    useEffect(() => {
        if (props.scheduleOptions) {
            setFormScheduleOptionsData({
                scheduleOptions: {
                    id: props.scheduleOptions.id,
                    patientSearch: props.scheduleOptions.patientSearch,
                    isOnlyAttachment: props.scheduleOptions.isOnlyAttachment,
                    displayTickets: props.scheduleOptions.displayTickets,
                    daysRange: props.scheduleOptions.daysRange,
                    isDoctorArea: props.scheduleOptions.isDoctorArea,
                    isAllowCreateCard: props.scheduleOptions.isAllowCreateCard,
                    isHasOnlyOneTicketToSpeciality: props.scheduleOptions.isHasOnlyOneTicketToSpeciality
                }
            });
        }
    }, [props.scheduleOptions]);

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
                Параметры расписания
            </div>
            <DisabledInputComponent
                title={"ID"}
                value={props.scheduleOptions.id}
            />
            <ScheduleOptionsSelectComponent
                title={"Поиск пациента"}
                name={"patientSearch"}
                value={formScheduleOptionsData.scheduleOptions.patientSearch}
                handle={handleScheduleOptionsInputChange}
            />
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
    )
}

export default ScheduleOptionsContainerComponent;