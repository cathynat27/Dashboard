import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Table from "./pages/Table";
import AuthLayout from "./components/Layout/AuthLayout";
import GuestLayout from "./components/Layout/GuestLayout";
import Login from "./pages/auth/Login";
import Blank from "./pages/Blank";
import NotFound from "./pages/NotFound";
import Form from "./pages/Form";
import RegisterIndex from "./pages/auth/Register";
import RenalTable from "./pages/AppServices/RFTTable";
import VaccinationTable from "./pages/AppServices/VaccinationTable";
import DiagnosisTable from "./pages/AppServices/DiagnosisTable";
import AntenantalTable from "./pages/AppServices/AntenantalTable";
import Footer from "./components/Footer";
import RenalScreening from "./pages/AppServices/ScreeningTable";
import RenalMonitoring from "./pages/AppServices/MonitoringTable";
import UserActivity from "./pages/ChpActivity/user.activity";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/table" element={<Table />}></Route>
          <Route path="/renal" element={<RenalTable />}></Route>
          <Route path="/vaccination" element={<VaccinationTable />}></Route>
          <Route path="/diagnosis" element={<DiagnosisTable />}></Route>
          <Route path="/antenantal" element={<AntenantalTable />}></Route>
          <Route path="/screening" element={<RenalScreening />}></Route>
          <Route path="/monitoring" element={<RenalMonitoring />}></Route>
          <Route path="/chpactivity" element={<UserActivity />}></Route>
          <Route path="/blank" element={<Blank />}></Route>
          <Route path="/404" element={<NotFound />}></Route>
          <Route path="/form" element={<Form />}></Route>
          <Route path="/profile" element={<Blank />}></Route>
        </Route>
        <Route path="/auth" element={<GuestLayout />}>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/register" element={<RegisterIndex />}></Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
