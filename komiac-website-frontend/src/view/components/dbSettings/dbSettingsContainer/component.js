import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import DisabledInputComponent from "../../common/disabledInput/component";
import EnabledInputComponent from "../../common/enabledInput/component";
import DbSettingsDropdownComponent from "../dbSettingsDropdown/component";
import DbSettingsSelectComponent from "../dbSettingsSelect/component";
import {
    clearNetworksData,
    getNetworksData,
    updateOneMedicalOrganizationData
} from "../../../../state/slices/medicalOrganizationsSlice";

function DbSettingsComponent(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isChange, setIsChange] = useState(false);

    const networksData = useSelector((state) => state.medicalOrganizations.networksData);
    
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

    useEffect(() => {
        dispatch(getNetworksData());
        return () => {
            dispatch(clearNetworksData());
        };
    }, [dispatch]);

    useEffect(() => {
        if (props.dbSettings) {
            setFormDbData({
                dbSettings: {
                    id: props.dbSettings.id,
                    vipnetSettings: {
                        id: props.dbSettings.vipnetSettings.id,
                        name: props.dbSettings.vipnetSettings.name,
                        address: props.dbSettings.vipnetSettings.address
                    },
                    pathToDb: props.dbSettings.pathToDb,
                    login: props.dbSettings.login,
                    password: props.dbSettings.password,
                    provider: props.dbSettings.provider
                }
            });
        }
    }, [props.dbSettings]);


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

    const handleNetworkSelect = (networkData) => {
        setFormDbData(prevState => ({
            ...prevState,
            dbSettings: {
                ...prevState.dbSettings,
                vipnetSettings: {
                    id: networkData.id,
                    name: networkData.name,
                    address: networkData.address
                }
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
                Параметры базы данных
            </div>
            <DisabledInputComponent
                title={"ID"}
                value={props.dbSettings.id}
            />
            <DbSettingsDropdownComponent
                title={"Сеть"}
                networksData={networksData}
                vipnetSettings={props.dbSettings.vipnetSettings}
                handle={handleNetworkSelect}
            />
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
            <DbSettingsSelectComponent
                title={"Система"}
                value={formDbData.dbSettings.provider}
                handle={handleDbInputChange}
            />
            <button className="organization-info-button"
                    onClick={handleConfirmButton.bind(this, formDbData)}>Сохранить
            </button>
        </div>
    )
}

export default DbSettingsComponent;