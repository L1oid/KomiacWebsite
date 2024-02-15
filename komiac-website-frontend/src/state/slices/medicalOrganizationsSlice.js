import {createSlice} from "@reduxjs/toolkit";
import {data_medical_organizations} from "../../data/data";
import {networks_list} from "../../data/networks";


const medicalOrganizationsSlice = createSlice({
    name: "medicalOrganizations",
    initialState: {
        organizationsData: [],
        organizationData: {},
        networksData: []
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
        updateOneMedicalOrganizationData(state, action) {
            const organizationIndex = data_medical_organizations.findIndex(
                (organization) => organization.id === action.payload.id
            );
            if (organizationIndex !== -1) {
                data_medical_organizations[organizationIndex] = {
                    ...data_medical_organizations[organizationIndex],
                    ...action.payload.data,
                };
            }
        },
        deleteOneMedicalOrganizationContactsData(state, action) {
            const { id, contactId } = action.payload;
            const organizationIndex = data_medical_organizations.findIndex(
                (organization) => organization.id === id
            );
            if (organizationIndex !== -1) {
                data_medical_organizations[organizationIndex] = {
                    ...data_medical_organizations[organizationIndex],
                    contacts: data_medical_organizations[organizationIndex].contacts.filter(contact => contact.id !== contactId)
                };
            }
        },
        addOneMedicalOrganizationContactsData(state, action) {
            const { id, contactData } = action.payload;
            const organizationIndex = data_medical_organizations.findIndex(
                (organization) => organization.id === id
            );
            if (organizationIndex !== -1) {
                data_medical_organizations[organizationIndex] = {
                    ...data_medical_organizations[organizationIndex],
                    contacts: [...data_medical_organizations[organizationIndex].contacts, contactData]
                };
            }
        },
        deleteOneMedicalOrganizationExternalIdsData(state, action) {
            const { id, externalIdId } = action.payload;
            const organizationIndex = data_medical_organizations.findIndex(
                (organization) => organization.id === id
            );
            if (organizationIndex !== -1) {
                data_medical_organizations[organizationIndex] = {
                    ...data_medical_organizations[organizationIndex],
                    externalIds: data_medical_organizations[organizationIndex].externalIds.filter(externalId => externalId.id !== externalIdId)
                };
            }
        },
        addOneMedicalOrganizationExternalIdsData(state, action) {
            const { id, externalIdData } = action.payload;
            const organizationIndex = data_medical_organizations.findIndex(
                (organization) => organization.id === id
            );
            if (organizationIndex !== -1) {
                data_medical_organizations[organizationIndex] = {
                    ...data_medical_organizations[organizationIndex],
                    externalIds: [...data_medical_organizations[organizationIndex].externalIds, externalIdData]
                };
            }
        },
        getNetworksData(state) {
            state.networksData.push(...networks_list);
        },
        clearNetworksData(state) {
            state.networksData.splice(0, state.networksData.length);
        }
    }
})

export const {
    getMedicalOrganizationsData,
    clearMedicalOrganizationsData,
    getOneMedicalOrganizationData,
    updateOneMedicalOrganizationData,
    deleteOneMedicalOrganizationContactsData,
    addOneMedicalOrganizationContactsData,
    deleteOneMedicalOrganizationExternalIdsData,
    addOneMedicalOrganizationExternalIdsData,
    getNetworksData,
    clearNetworksData} = medicalOrganizationsSlice.actions;
export default medicalOrganizationsSlice.reducer;