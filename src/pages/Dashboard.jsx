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

  const [sidebarToggle] = useOutletContext();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://mk-be-strapi-production.up.railway.app/api/all-patients`
      );
      const data = await response.json();
      setTotalPatients(data.length);
  
      // Calculate current month count
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
      const monthlyData = data.filter(patient => {
        const patientDate = new Date(patient.date); // Assuming there's a date property in your patient data
        return patientDate.getMonth() + 1 === currentMonth;
      });
      setMonthlyCount(monthlyData.length);
  
      // Calculate weekly count
      const currentWeekStart = new Date();
      currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay()); // Get start of current week (Sunday)
      const currentWeekEnd = new Date(currentWeekStart);
      currentWeekEnd.setDate(currentWeekEnd.getDate() + 6); // Get end of current week (Saturday)
      const weeklyData = data.filter(patient => {
        const patientDate = new Date(patient.date); // Assuming there's a date property in your patient data
        return patientDate >= currentWeekStart && patientDate <= currentWeekEnd;
      });
      setWeeklyCount(weeklyData.length);
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
      title: "Total Enrollments",
      count: totalPatients,
      color: "cardInfo",
    },
    {
      title: "Monthly Enrollments",
      count: monthlyCount,
      color: "cardWarning",
    },
    {
      title: "Weekly Enrollments",
      count: weeklyCount,
      color: "cardDanger",
    },
    {
      title: "Monthly Enrollments",
      count: monthlyCount,
      color: "cardWarning",
    },
    {
      title: "Total Enrollments",
      count: totalPatients,
      color: "cardInfo",
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
            Critical Patients
          </h1>

          <div className="flex flex-row gap-x-4 overflow-hidden overflow-x-auto justify-between no-scrollbar">
            {dataOS?.map((data, index) => (
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
