import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Table from "./pages/Table";
import AuthLayout from "./components/Layout/AuthLayout";
import GuestLayout from "./components/Layout/GuestLayout";
import Login from "./pages/auth/Login";
import Blank from "./pages/Blank";
import NotFound from "./pages/NotFound";
import Form from "./pages/Form";
import RenalTable from "./pages/rft/RFTTable";
import VaccinationTable from "./pages/vaccinations/VaccinationTable";
import DiagnosisTable from "./pages/diagnosis/DiagnosisTable";
import Footer from "./components/Footer";
import RenalScreening from "./pages/screening/ScreeningTable";
import ScreeningDetails from "./pages/AppServices/patient.details";
import RenalMonitoring from "./pages/monitoring/MonitoringTable";
import UserActivity from "./pages/ChpActivity/user.activity";
import { useAuth } from "./context/AuthContext";
import AntenatalTable from "./pages/antenatal/AntenantalTable";
function App() {
  const { isLoggedIn, userRole } = useAuth();

  const renderDashboardRoute = () => {
    // Check if user is logged in and their role is not "Authenticated"
    if (isLoggedIn && userRole !== "Authenticated") {
      return <Route path="/dashboard" element={<Dashboard />} />;
    } else {
      return (
        <Route
          path="/dashboard"
          element={<Navigate to="/need-access" replace />}
        />
      );
    }
  };
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<GuestLayout />}>
          <Route path="/auth/login" element={<Login />}></Route>
          {/* <Route path="/auth/register" element={<RegisterIndex />}></Route> */}
        </Route>
        <Route
          path="/"
          element={
            isLoggedIn ? <AuthLayout /> : <Navigate replace to="/auth/login" />
          }
        >
          <Route path="/" element={<Navigate to="/auth/login" />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/table" element={<Table />}></Route>
          <Route path="/renal" element={<RenalTable />}></Route>
          <Route path="/vaccination" element={<VaccinationTable />}></Route>
          <Route path="/diagnosis" element={<DiagnosisTable />}></Route>
          <Route path="/antenantal" element={<AntenatalTable />}></Route>
          <Route path="/screening" element={<RenalScreening />}></Route>
          <Route path="/patient/:patientId" element={<ScreeningDetails />}></Route>
          <Route path="/monitoring" element={<RenalMonitoring />}></Route>
          <Route path="/chpactivity" element={<UserActivity />}></Route>
          <Route path="/blank" element={<Blank />}></Route>
          <Route path="/404" element={<NotFound />}></Route>
          <Route path="/form" element={<Form />}></Route>
          <Route path="/profile" element={<Blank />}></Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
