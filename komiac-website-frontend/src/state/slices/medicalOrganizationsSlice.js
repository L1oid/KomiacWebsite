import {createSlice} from "@reduxjs/toolkit";
import {data_medical_organizations} from "../../data/data";


const medicalOrganizationsSlice = createSlice({
    name: "medicalOrganizations",
    initialState: {
        organizationsData: [],
        organizationData: {}
    },
    reducers: {
        getMedicalOrganizationsData(state) {
            state.organizationsData.push(...data_medical_organizations);
        },
        clearMedicalOrganizationsData(state) {
            state.organizationsData.splice(0, state.organizationsData.length);
        },
        getOneMedicalOrganizationData(state, action) {
            const foundOrganization = data_medical_organizations.find(organization => organization.id.toLowerCase().includes(action.payload.toLowerCase()));
            state.organizationData = foundOrganization || {};
        },
        updateOneMedicalOrganizationMainData(state, action) {
            const organizationIndex = data_medical_organizations.findIndex(
                (organization) => organization.id === action.payload.id
            );
            if (organizationIndex !== -1) {
                data_medical_organizations[organizationIndex] = {
                    ...data_medical_organizations[organizationIndex],
                    ...action.payload.data,
                };
            }
        }
    }
})

export const {
    getMedicalOrganizationsData,
    clearMedicalOrganizationsData,
    getOneMedicalOrganizationData,
    updateOneMedicalOrganizationMainData} = medicalOrganizationsSlice.actions;
export default medicalOrganizationsSlice.reducer;