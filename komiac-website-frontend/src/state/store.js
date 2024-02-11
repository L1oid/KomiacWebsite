import {configureStore} from "@reduxjs/toolkit";

import medicalOrganizationsReducer from "./slices/medicalOrganizationsSlice"

export default configureStore({
    reducer: {
        medicalOrganizations: medicalOrganizationsReducer
    }
});