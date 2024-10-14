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
  const [diagnosesAfterCutoffCount, setDiagnosesAfterCutoffCount] = useState(0);
  const [vaccinationsAfterCutoffCount, setVaccinationsAfterCutoffCount] = useState(0); // Vaccinations after cutoff date
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

  const [antenantalsAfterCutoffCount, setAntenantalsAfterCutoffCount] = useState(0);
  const [renalHistoriesAfterCutoffCount, setRenalHistoriesAfterCutoffCount] = useState(0);
  const [rftsAfterCutoffCount, setRFTsAfterCutoffCount] = useState(0);
  const [monitoringsAfterCutoffCount, setMonitoringsAfterCutoffCount] = useState(0);
  const [drugsAfterCutoffCount, setDrugsAfterCutoffCount] = useState(0);

  const cutOffDate = new Date("2024-10-07T00:00:00Z");

  const fetchData = async () => {
    try {
      // Fetch the all-patients API
      const patientsResponse = await fetch(
        "https://mk-be-strapi-production.up.railway.app/api/all-patients"
      );
      const patientsData = await patientsResponse.json();

      // Extract and flatten patients data
      const allPatients = patientsData.map((user) => user.patients).flat();
      setTotalPatients(allPatients.length);

      // Filter patients created after the cutoff date
      const filteredNafsProjectData = allPatients.filter((patient) => {
        const patientDate = new Date(patient.createdAt);
        return patientDate >= cutOffDate;
      });

      const totalNafsPatients = filteredNafsProjectData.length;

      // Filter and count diagnoses after the cutoff date
      const diagnosesAfterCutoff = filteredNafsProjectData.reduce((count, patient) => {
        const patientDiagnoses = patient.diagnoses || [];
        const validDiagnoses = patientDiagnoses.filter((diagnosis) => {
          const diagnosisDate = new Date(diagnosis.createdAt);
          return diagnosisDate >= cutOffDate;
        });
        return count + validDiagnoses.length;
      }, 0);
      setDiagnosesAfterCutoffCount(diagnosesAfterCutoff);

      // Filter and count vaccinations after the cutoff date
      const vaccinationsAfterCutoff = filteredNafsProjectData.reduce((count, patient) => {
        const patientVaccinations = patient.vaccinations || [];
        const validVaccinations = patientVaccinations.filter((vaccination) => {
          const vaccinationDate = new Date(vaccination.createdAt);
          return vaccinationDate >= cutOffDate;
        });
        return count + validVaccinations.length;
      }, 0);
      setVaccinationsAfterCutoffCount(vaccinationsAfterCutoff);

      // Filter and count antenatals after the cutoff date
      const antenantalsAfterCutoff = filteredNafsProjectData.reduce((count, patient) => {
        const patientAntenantals = patient.antenantals || [];
        const validAntenantals = patientAntenantals.filter((antenatal) => {
          const antenatalDate = new Date(antenatal.createdAt);
          return antenatalDate >= cutOffDate;
        });
        return count + validAntenantals.length;
      }, 0);
      setAntenantalsAfterCutoffCount(antenantalsAfterCutoff);

      // Filter and count renal histories after the cutoff date
      const renalHistoriesAfterCutoff = filteredNafsProjectData.reduce((count, patient) => {
        const patientRenalHistories = patient.renal_histories || [];
        const validRenalHistories = patientRenalHistories.filter((renalHistory) => {
          const renalHistoryDate = new Date(renalHistory.createdAt);
          return renalHistoryDate >= cutOffDate;
        });
        return count + validRenalHistories.length;
      }, 0);
      setRenalHistoriesAfterCutoffCount(renalHistoriesAfterCutoff);

      // Filter and count RFTs after the cutoff date
      const rftsAfterCutoff = filteredNafsProjectData.reduce((count, patient) => {
        const patientRFTs = patient.rfts || [];
        const validRFTs = patientRFTs.filter((rft) => {
          const rftDate = new Date(rft.createdAt);
          return rftDate >= cutOffDate;
        });
        return count + validRFTs.length;
      }, 0);
      setRFTsAfterCutoffCount(rftsAfterCutoff);

      // Filter and count monitorings after the cutoff date
      const monitoringsAfterCutoff = filteredNafsProjectData.reduce((count, patient) => {
        const patientMonitorings = patient.monitorings || [];
        const validMonitorings = patientMonitorings.filter((monitoring) => {
          const monitoringDate = new Date(monitoring.createdAt);
          return monitoringDate >= cutOffDate;
        });
        return count + validMonitorings.length;
      }, 0);
      setMonitoringsAfterCutoffCount(monitoringsAfterCutoff);

      // Filter and count drugs after the cutoff date
      const drugsAfterCutoff = filteredNafsProjectData.reduce((count, patient) => {
        const patientDrugs = patient.drugs || [];
        const validDrugs = patientDrugs.filter((drug) => {
          const drugDate = new Date(drug.createdAt);
          return drugDate >= cutOffDate;
        });
        return count + validDrugs.length;
      }, 0);
      setDrugsAfterCutoffCount(drugsAfterCutoff);

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

      // Combine both total patients and total data into the NAFS data array
      setNafsProjectData([
        { title: "Total Patients", count: totalNafsPatients },
        { title: "Total Diagnoses (After Cutoff)", count: diagnosesAfterCutoff },
        { title: "Total Vaccinations (After Cutoff)", count: vaccinationsAfterCutoff },
        { title: "Total Antenatals (After Cutoff)", count: antenantalsAfterCutoff },
        { title: "Total Renal Histories (After Cutoff)", count: renalHistoriesAfterCutoff },
        { title: "Total RFTs (After Cutoff)", count: rftsAfterCutoff },
        { title: "Total Monitorings (After Cutoff)", count: monitoringsAfterCutoff },
        { title: "Total Drugs (After Cutoff)", count: drugsAfterCutoff },
      ]);


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

  const overallData = [
    {
      title: "Total Patients",
      count: totalPatients,
    },
    {
      title: "Total Female Patients",
      count: femaleCount,
    },
    {
      title: "Total Male Patients",
      count: maleCount,
    },
    {
      title: "Total Monitoring",
      count: monitoringCount,
    },
    {
      title: "Total Screening",
      count: screeningCount,
    },
    {
      title: "Total RFTs",
      count: rftCount,
    },
    {
      title: "Total Vaccinations",
      count: vaccinationsCount,
    },
    {
      title: "Total Diagnoses",
      count: diagnosesCount,
    },
  ];

  const nafsData = [
    {
      title: "Total Vaccinations",
      count: vaccinationsCount,
    },
    {
      title: "Total Antenantals",
      count: nafsProjectData.reduce((acc, patient) => acc + (patient.antenantals ? patient.antenantals.length : 0), 0),
    },
    {
      title: "Total Renal Histories",
      count: nafsProjectData.reduce((acc, patient) => acc + (patient.renal_histories ? patient.renal_histories.length : 0), 0),
    },
    {
      title: "Total Diagnoses",
      count: diagnosesCount,
    },
    {
      title: "Total Monitorings",
      count: monitoringCount,
    },
    {
      title: "Total RFTs",
      count: rftCount,
    },
    {
      title: "Total Drugs",
      count: nafsProjectData.reduce((acc, patient) => {
        return acc + (patient.drugs ? patient.drugs.length : 0);
      }, 0),
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

        {/* NAFS PROJECT Section */}
        <div className="px-2 mx-auto mainCard"> {/* Reduced mt-10 to mt-6 */}
          {/* Subheading */}
          <h2 className="text-blue-500 font-bold text-sm md:text-base mb-2">
            Click on a project to view
          </h2>

          <h1
            className="text-slate-500 pb-3 text-base md:text-lg cursor-pointer"
            onClick={() => setShowNafs(!showNafs)}
          >
            NAFS Project
          </h1>
          {nafsProjectData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nafsProjectData.map((data, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg text-white">{data.title}</h3>
                  <p className="text-2xl text-white">{data.count}</p>
                </div>
              ))}
            </div>
          )}
        </div>


        {/* Overall Activity Section */}
        <div className="px-2 mx-auto mainCard"> {/* Reduced mt-10 to mt-6 */}
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

      </main>

    </>
  );
}

export default Dashboard;
