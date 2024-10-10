import React, { useEffect, useState } from "react";
import StatisticWidget from "../components/Widget/Statistic.jsx";
import AchievementWidget from "../components/Widget/Achievment.jsx";
import DashboardHeader from "../components/Other/DashboardHeader.jsx";
import ScrolledCard from "../components/Widget/ScrolledCard.jsx";
import { useOutletContext } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../context/AuthContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../assets/images/avatar.jpg";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [monthlyCount, setMonthlyCount] = useState(0);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [dailyCount, setDailyCount] = useState(0);
  const [error, setError] = useState(null);
  const [totalPatients, setTotalPatients] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [monitoringCount, setMonitoringCount] = useState(0);
  const [screeningCount, setScreeningCount] = useState(0);
  const [rftCount, setRftCount] = useState(0);
  const [vaccinationsCount, setVaccinationsCount] = useState(0);
  const [diagnosesCount, setDiagnosesCount] = useState(0);
  const { userNames } = useAuth();

  const [sidebarToggle] = useOutletContext();
  const [nafsProjectData, setNafsProjectData] = useState([]);
  const [showOverall, setShowOverall] = useState(false);
  const [showNafs, setShowNafs] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://mk-be-strapi-production.up.railway.app/api/all-patients"
      );
      const data = await response.json();

      const allPatients = data.map((user) => user.patients).flat();
      setTotalPatients(allPatients.length);

      // Filter out patients created after October 7, 2024
      const cutOffDate = new Date("2024-10-07T00:00:00Z");
      const filteredNafsProjectData = allPatients.filter((patient) => {
        const patientDate = new Date(patient.createdAt);
        return patientDate >= cutOffDate;
      });
      setNafsProjectData(filteredNafsProjectData);

      // Existing calculations for counts
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const monthlyData = allPatients.filter((patient) => {
        const patientDate = new Date(patient.createdAt);
        return patientDate.getMonth() + 1 === currentMonth;
      });
      setMonthlyCount(monthlyData.length);

      // Calculate weekly count
      const currentWeekStart = new Date(currentDate);
      currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay());
      currentWeekStart.setHours(0, 0, 0);
      const endOfWeek = new Date(currentWeekStart);
      endOfWeek.setDate(currentWeekStart.getDate() + 6);
      endOfWeek.setHours(23, 59, 59);

      const weeklyData = allPatients.filter((patient) => {
        const patientDate = new Date(patient.createdAt);
        return patientDate >= currentWeekStart && patientDate <= endOfWeek;
      });
      setWeeklyCount(weeklyData.length);

      // Calculate daily count
      const startOfDay = new Date(currentDate);
      startOfDay.setHours(0, 0, 0);
      const endOfDay = new Date(currentDate);
      endOfDay.setHours(23, 59, 59);

      const dailyData = allPatients.filter((patient) => {
        const patientDate = new Date(patient.createdAt);
        return patientDate >= startOfDay && patientDate <= endOfDay;
      });
      setDailyCount(dailyData.length);

      // Gender Count
      const malePatients = allPatients.filter(
        (patient) => patient.sex === "Male"
      );
      setMaleCount(malePatients.length);

      const femalePatients = allPatients.filter(
        (patient) => patient.sex === "Female"
      );
      setFemaleCount(femalePatients.length);

      // Calculate patients under monitoring, screening, and RFT
      let monitoring = 0;
      let screening = 0;
      let rft = 0;
      let vaccination = 0;
      let diagnosis = 0;
      allPatients.forEach((patient) => {
        monitoring += patient.monitorings ? patient.monitorings.length : 0;
        screening += patient.renal_histories
          ? patient.renal_histories.length
          : 0;
        rft += patient.rfts ? patient.rfts.length : 0;
        vaccination += patient.vaccinations ? patient.vaccinations.length : 0;
        diagnosis += patient.diagnoses ? patient.diagnoses.length : 0;
      });
      setMonitoringCount(monitoring);
      setScreeningCount(screening);
      setRftCount(rft);
      setVaccinationsCount(vaccination);
      setDiagnosesCount(diagnosis);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const avatar =
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  const dataOS = [
    {
      title: "Daily Enrollments",
      count: dailyCount,
      color: "cardSuccess",
    },
    {
      title: "Monthly Enrollments",
      count: monthlyCount,
      color: "cardWarning",
    },
    {
      title: "Weekly Enrollments",
      count: weeklyCount,
      color: "cardLime",
    },
    {
      title: "Female Patients",
      count: femaleCount,
      color: "cardDanger",
    },
    {
      title: "Male Patients",
      count: maleCount,
      color: "cardInfo",
    },
  ];

  const servicesOs = [
    {
      title: "Number of Monitorings",
      count: monitoringCount,
      color: "cardLime",
    },
    {
      title: "Renal Functional Tests",
      count: rftCount,
      color: "cardDanger",
    },
    {
      title: "Number of Screenings",
      count: screeningCount,
      color: "cardSuccess",
    },
    {
      title: "Number of Vaccinations",
      count: vaccinationsCount,
      color: "cardInfo",
    },
    {
      title: "Number of Diagnoses",
      count: diagnosesCount,
      color: "cardWarning",
    },
  ];

  return (
    <>
      <main className="h-full">
        <DashboardHeader
          toggle={sidebarToggle}
          avatar={Avatar}
          user={{ name: userNames }}
        />
        <div className="px-2 mx-auto mainCard">
          <div className="w-full overflow-hidden text-slate-700 md:grid gap-4 grid md:grid-cols-6">
            <StatisticWidget className="col-span-4 col-start-1 bg-white" />
            <AchievementWidget />
          </div>
        </div>

        {/* Overall Activity Section */}
        <div className="px-2 mx-auto mainCard mt-10">
          <h1
            className="text-slate-500 pb-3 text-base md:text-lg cursor-pointer"
            onClick={() => setShowOverall(!showOverall)}
          >
            Overall Activity
          </h1>

          {showOverall && (
            <div className="flex flex-row gap-x-4 overflow-hidden overflow-x-auto justify-between no-scrollbar">
              {dataOS?.map((data, index) => (
                <ScrolledCard key={index} data={data} />
              ))}
            </div>
          )}
        </div>

        {/* NAFS PROJECT Section */}
        <div className="px-2 mx-auto mainCard mt-10">
          <h1
            className="text-slate-500 pb-3 text-base md:text-lg cursor-pointer"
            onClick={() => setShowNafs(!showNafs)}
          >
            NAFS PROJECT
          </h1>

          {showNafs && (
            <div className="flex flex-row gap-x-4 overflow-hidden overflow-x-auto justify-between no-scrollbar">
              {nafsProjectData.length > 0 ? (
                nafsProjectData.map((patient, index) => (
                  <ScrolledCard key={index} data={{ title: patient.name, count: patient.createdAt }} />
                ))
              ) : (
                <div>No data available for NAFS PROJECT</div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;
