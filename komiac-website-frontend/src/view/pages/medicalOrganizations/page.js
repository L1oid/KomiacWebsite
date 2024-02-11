import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./style.css"
import {getMedicalOrganizationsData, clearMedicalOrganizationsData} from "../../../state/slices/medicalOrganizationsSlice";

function MedicalOrganizationsPage() {
    const [countOrganizations, setCountOrganizations] = useState(6);
    const [searchNameInput, setSearchNameInput] = useState("");
    const [searchTerritoryCodeInput, setSearchTerritoryCodeInput] = useState("");
    const [searchDivisionCodeInput, setSearchDivisionCodeInput] = useState("");
    const dispatch = useDispatch();
    const dataMedicalOrganizations = useSelector(state => state.medicalOrganizations.organizationsData);

    useEffect(() => {
        dispatch(getMedicalOrganizationsData());
        return () => {
            dispatch(clearMedicalOrganizationsData());
        };
    }, [dispatch])

    const moreCountOrganizations = () => {
        if ((countOrganizations + 6) >= dataMedicalOrganizations.length ) {
            setCountOrganizations(dataMedicalOrganizations.length);
        } else {
            setCountOrganizations(countOrganizations + 6);
        }
    }

    const filteredOrganizations = dataMedicalOrganizations.filter(organization => {
        const nameMatch = organization.name.toLowerCase().includes(searchNameInput.toLowerCase());
        const territoryCodeMatch = organization.territoryCode.toString().includes(searchTerritoryCodeInput);
        const divisionCodeMatch = organization.divisionCode.toString().includes(searchDivisionCodeInput);
        return nameMatch && territoryCodeMatch && divisionCodeMatch;
    });

    const resetSearchInputs = () => {
        setSearchNameInput("");
        setSearchTerritoryCodeInput("");
        setSearchDivisionCodeInput("");
        setCountOrganizations(6);
    }

    const resetCountOrganizations = () => {
        setCountOrganizations(6);
    }

    return (
        <div className="page-container">
            <div className="organizations-page-container">
                <div className="search-container">
                    <p className="search-title">Поиск</p>
                    <input
                        className="search-input"
                        type="text"
                        placeholder="По названию"
                        value={searchNameInput}
                        onChange={(event) => {
                            setSearchNameInput(event.target.value);
                            resetCountOrganizations();
                        }}
                    />
                    <input
                        className="search-input"
                        type="text"
                        placeholder="По коду территории"
                        value={searchTerritoryCodeInput}
                        onChange={(event) => {
                            setSearchTerritoryCodeInput(event.target.value);
                            resetCountOrganizations();
                        }}
                    />
                    <input
                        className="search-input"
                        type="text"
                        placeholder="По коду подразделения"
                        value={searchDivisionCodeInput}
                        onChange={(event) => {
                            setSearchDivisionCodeInput(event.target.value);
                            resetCountOrganizations();
                        }}
                    />
                    <button className="search-button" onClick={resetSearchInputs}>Сбросить</button>
                </div>
                <div className="organizations-container">
                    {filteredOrganizations.slice(0, countOrganizations).map((organization, organizationIndex) => (
                        <div className="organization-item" key={organizationIndex}>
                            <div className="organization-item-info">
                                <p className="organization-item-title">
                                    {organization.name}
                                </p>
                                <p className="organization-item-content">
                                    {"Код территории: " + organization.territoryCode}
                                </p>
                                <p className="organization-item-content">
                                    {"Код подразделения: " + organization.divisionCode}
                                </p>
                            </div>
                            <Link className="organization-item-button" to={"/medical_organizations/" + organization.id}>Подробнее</Link>
                        </div>
                    ))}
                    <div className="organizations-load-more" onClick={moreCountOrganizations}>Загрузить ещё</div>
                </div>
            </div>
        </div>
    )
}

export default MedicalOrganizationsPage;