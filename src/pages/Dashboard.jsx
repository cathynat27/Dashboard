import React, { useEffect, useState } from "react";
import StatisticWidget from "../components/Widget/Statistic.jsx";
import AchievementWidget from "../components/Widget/Achievment.jsx";
import DashboardHeader from "../components/Other/DashboardHeader.jsx";
import ScrolledCard from "../components/Widget/ScrolledCard.jsx";
import { useOutletContext } from "react-router-dom";
import Footer from "../components/Footer.jsx";

function Dashboard() {
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

  const [sidebarToggle] = useOutletContext();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://mk-be-strapi-production.up.railway.app/api/all-patients`
      );
      const data = await response.json();

      // Assuming 'data' contains an array of user objects
      // Iterate over each user object and extract the patients array
      const allPatients = data.map((user) => user.patients).flat();

      setTotalPatients(allPatients.length);

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
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        {/* Welcome Header */}
        <DashboardHeader
          toggle={sidebarToggle}
          avatar={avatar}
          user={{ name: "Doctor Ibra" }}
        />

        {/* Laba */}
        <div className="px-2 mx-auto mainCard">
          <div className="w-full overflow-hidden text-slate-700 md:grid gap-4 grid md:grid-cols-6">
            <StatisticWidget className="col-span-4 col-start-1 bg-white" />
            <AchievementWidget />
          </div>
        </div>

        {/* OS Kredit */}
        <div className="px-2 mx-auto mainCard">
          <h1 className="text-slate-500 pb-3 text-base md:text-lg">
            Renal Beneficiaries
          </h1>

          <div className="flex flex-row gap-x-4 overflow-hidden overflow-x-auto justify-between no-scrollbar">
            {dataOS?.map((data, index) => (
              <ScrolledCard key={index} data={data} />
            ))}
          </div>

          <div className="flex flex-row gap-x-4 overflow-hidden overflow-x-auto justify-between no-scrollbar mt-10">
            {servicesOs?.map((data, index) => (
              <ScrolledCard key={index} data={data} />
            ))}
          </div>

          <div className="lg:w-full w-[1024px] overflow-hidden flex flex-row justify-between text-slate-700 gap-2 lg:max-h-screen overflow-x-auto whitespace-nowrap"></div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;
