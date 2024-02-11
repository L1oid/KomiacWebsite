import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Layout from "./view/pages/layout/page";
import ScrollToTopComponent from "./view/components/scrollToTop/component";

import MainPage from "./view/pages/main/page";
import MedicalOrganizationsPage from "./view/pages/medicalOrganizations/page";
import MedicalOrganizationPage from "./view/pages/medicalOrganization/page";

function App() {
  return (
      <>
        <ScrollToTopComponent />
        <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="/medical_organizations/" element={<MedicalOrganizationsPage />} />
              <Route path="/medical_organizations/:id" element={<MedicalOrganizationPage />} />
          </Route>
        </Routes>
      </>
  );
}

export default App;