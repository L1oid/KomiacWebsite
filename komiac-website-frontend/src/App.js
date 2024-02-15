import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Layout from "./view/pages/layout/page";
import ScrollToTopComponent from "./view/components/layout/scrollToTop/component";

import MedicalOrganizationsPage from "./view/pages/medicalOrganizations/page";
import MedicalOrganizationPage from "./view/pages/medicalOrganization/page";

function App() {
  return (
      <>
        <ScrollToTopComponent />
        <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<MedicalOrganizationsPage />} />
              <Route path="/medical_organizations/:id" element={<MedicalOrganizationPage />} />
          </Route>
        </Routes>
      </>
  );
}

export default App;