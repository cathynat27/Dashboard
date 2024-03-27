import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function PatientDetails() {
  const location = useLocation();
  const { patient } = location.state || {};
  const [isLoading, setIsLoading] = useState(true);

  if (!patient || !patient.firstName) {
    return <div>No patient data found</div>;
  }

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto py-8 h-full">
      <div className="mainCard">
        <h1 className="text-3xl font-bold mb-4">
          {patient.firstName} {patient.lastName || "N/A"}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Accordion title="Personal Information">
            <table className="table-auto">
              <tbody>
                <tr>
                  <td className="font-bold">Phone Number:</td>
                  <td>{patient.phoneNumber}</td>
                </tr>
                <tr>
                  <td className="font-bold">Primary Language:</td>
                  <td>{patient.primaryLanguage}</td>
                </tr>
                <tr>
                  <td className="font-bold">Next of Kin:</td>
                  <td>{patient.nextOfKin}</td>
                </tr>
                <tr>
                  <td className="font-bold">Next of Kin Contact:</td>
                  <td>{patient.nextOfKinContact}</td>
                </tr>
                <tr>
                  <td className="font-bold">Occupation:</td>
                  <td>{patient.occupation}</td>
                </tr>
                <tr>
                  <td className="font-bold">Height:</td>
                  <td>{patient.height}cm</td>
                </tr>
                <tr>
                  <td className="font-bold">Weight:</td>
                  <td>{patient.weight}kgs</td>
                </tr>
                <tr>
                  <td className="font-bold">Date of Birth:</td>
                  <td>{patient.dateOfBirth}</td>
                </tr>
                <tr>
                  <td className="font-bold">Sex:</td>
                  <td>{patient.sex}</td>
                </tr>
                <tr>
                  <td className="font-bold">Ethnicity:</td>
                  <td>{patient.ethnicity}</td>
                </tr>
              </tbody>
            </table>
          </Accordion>
        </div>
        <Accordion title="Diagnoses">
          <h2 className="text-lg font-semibold">Diagnoses</h2>
          <ul className="mt-4">
            {patient.diagnoses.map((diagnosis, index) => (
              <li key={index} className="mb-4">
                <h3 className="text-md font-semibold">Diagnosis {index + 1}</h3>
                <dl className="grid grid-cols-2 gap-4 mt-2">
                  <div className="font-bold">Condition:</div>
                  <div>{diagnosis.condition}</div>
                  <div className="font-bold">Date of Diagnosis:</div>
                  <div>{diagnosis.dateOfDiagnosis}</div>
                  <div className="font-bold">Diagnosed By:</div>
                  <div>{diagnosis.diagnosedBy}</div>
                  {diagnosis.dosage && (
                    <>
                      <div className="font-bold">Dosage:</div>
                      <div>{diagnosis.dosage}</div>
                    </>
                  )}
                  {diagnosis.drugsPrescribed && (
                    <>
                      <div className="font-bold">Drugs Prescribed:</div>
                      <div>{diagnosis.drugsPrescribed}</div>
                    </>
                  )}
                  {diagnosis.duration && (
                    <>
                      <div className="font-bold">Duration:</div>
                      <div>{diagnosis.duration}</div>
                    </>
                  )}
                  {diagnosis.followUpDate && (
                    <>
                      <div className="font-bold">Follow-up Date:</div>
                      <div>{diagnosis.followUpDate}</div>
                    </>
                  )}
                  {diagnosis.frequency && (
                    <>
                      <div className="font-bold">Frequency:</div>
                      <div>{diagnosis.frequency}</div>
                    </>
                  )}
                  {diagnosis.impression && (
                    <>
                      <div className="font-bold">Impression:</div>
                      <div>{diagnosis.impression}</div>
                    </>
                  )}
                  {diagnosis.isPregnant !== undefined && (
                    <>
                      <div className="font-bold">Is Pregnant:</div>
                      <div>{diagnosis.isPregnant ? "Yes" : "No"}</div>
                    </>
                  )}
                  {diagnosis.labTests && (
                    <>
                      <div className="font-bold">Lab Tests:</div>
                      <div>{diagnosis.labTests}</div>
                    </>
                  )}
                </dl>
              </li>
            ))}
          </ul>
        </Accordion>

        {/* Antenatals Section */}
        <Accordion title="Antenatals">
          <section className="mt-8">
            <h2 className="text-lg font-semibold">Antenatals</h2>
            <ul className="mt-4">
              {patient.antenantals.map((antenatal, index) => (
                <li key={index} className="mb-4">
                  <h3 className="text-md font-semibold">
                    Antenatal {index + 1}
                  </h3>
                  <dl className="grid grid-cols-2 gap-4 mt-2">
                    <div className="font-bold">Expected Date of Delivery:</div>
                    <div>
                      {new Date(
                        antenatal.expectedDateOfDelivery
                      ).toLocaleDateString()}
                    </div>
                    <div className="font-bold">Blood Group:</div>
                    <div>{antenatal.bloodGroup}</div>
                    <div className="font-bold">Next of Kin:</div>
                    <div>{antenatal.nextOfKin}</div>
                    <div className="font-bold">Next of Kin Contact:</div>
                    <div>{antenatal.nextOfKinContact}</div>
                    <div className="font-bold">Pregnancy Status:</div>
                    <div>{antenatal.pregnancyStatus}</div>
                    <div className="font-bold">Prescriptions:</div>
                    <div>{antenatal.prescriptions}</div>
                    <div className="font-bold">Reviewed By:</div>
                    <div>{antenatal.reviewedBy}</div>
                    <div className="font-bold">Routine Visit Date:</div>
                    <div>{antenatal.routineVisitDate}</div>
                    <div className="font-bold">Weight:</div>
                    <div>{antenatal.weight}</div>
                    <div className="font-bold">Published At:</div>
                    <div>{antenatal.publishedAt}</div>
                    <div className="font-bold">Updated At:</div>
                    <div>{antenatal.updatedAt}</div>
                  </dl>
                </li>
              ))}
            </ul>
          </section>
        </Accordion>

        <Accordion title="Vaccinations">
          <section className="mt-8">
            <h2 className="text-lg font-semibold">Vaccinations</h2>
            <ul className="mt-4">
              {patient.vaccinations.map((vaccination, index) => (
                <li key={index} className="mb-4">
                  <h3 className="text-md font-semibold">
                    Vaccination {index + 1}
                  </h3>
                  <dl className="grid grid-cols-2 gap-4 mt-2">
                    <div className="font-bold">Date of Vaccination:</div>
                    <div>{vaccination.dateOfVaccination}</div>
                    <div className="font-bold">Dose:</div>
                    <div>{vaccination.dose}</div>
                    <div className="font-bold">Vaccine Name:</div>
                    <div>{vaccination.vaccineName}</div>
                    <div className="font-bold">Facility:</div>
                    <div>{vaccination.facility}</div>
                    <div className="font-bold">Site Administered:</div>
                    <div>{vaccination.siteAdministered}</div>
                    <div className="font-bold">Date for Next Dose:</div>
                    <div>{vaccination.dateForNextDose}</div>
                    <div className="font-bold">Vaccinated By:</div>
                    <div>{vaccination.vaccinatedBy}</div>
                  </dl>
                </li>
              ))}
            </ul>
          </section>
        </Accordion>

        <Accordion title="Monitorings">
          <section className="mt-8">
            <h2 className="text-lg font-semibold">Monitorings</h2>
            <ul className="mt-4">
              {patient.monitorings.map((monitoring, index) => (
                <li key={index} className="mb-4">
                  {monitoring.monitoringData &&
                    monitoring.monitoringData.length > 0 && (
                      <div>
                        <h3 className="text-md font-semibold">
                          Monitoring {index + 1}
                        </h3>
                        <p className="font-bold">Chemistry:</p>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          {Object.entries(
                            monitoring.monitoringData[0].chemistry
                          ).map(([key, value]) => (
                            <React.Fragment key={key}>
                              <div className="font-bold">{key}:</div>
                              <div>{value}</div>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}
                </li>
              ))}
            </ul>
          </section>
        </Accordion>

        <Accordion title="Renal Histories">
          <section className="mt-8">
            <h2 className="text-lg font-semibold">Renal Histories</h2>
            <ul className="mt-4">
              {patient.renal_histories.map((renalHistory, index) => (
                <li key={index} className="mb-4">
                  <h3 className="text-md font-semibold">
                    Renal History {index + 1}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p>Appearance Color: {renalHistory.appearance.color}</p>
                      <p>
                        Appearance Clarity: {renalHistory.appearance.clarity}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">
                        Urine Chemistry:
                      </h4>
                      <ul className="ml-4">
                        {Object.entries(renalHistory.chemistry).map(
                          ([key, value]) => (
                            <li key={key}>
                              {key}: {value}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                  <h4 className="text-md font-semibold mt-4">UTI HISTORY</h4>
                  <div className="text-sm text-gray-900 ml-4">
                    {renalHistory.historyData && renalHistory.historyData.uti}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </Accordion>

        <Accordion title="Renal Functional Tests">
          {" "}
          <section className="mt-8">
            <h2 className="text-lg font-semibold">
              RFTs (Renal Function Tests)
            </h2>
            <ul className="mt-4">
              {patient.rfts.map((rft, index) => (
                <li key={index} className="mb-4">
                  <h3 className="text-md font-semibold">RFT {index + 1}</h3>
                  <p>Created At: {rft.createdAt}</p>
                  <p>Updated At: {rft.updatedAt}</p>
                  <p className="mt-2">Inspection Data:</p>
                  <ul className="ml-4">
                    <li>BMI: {rft.inspectionData.bmi}</li>
                    <li>Height: {rft.inspectionData.height}</li>
                    <li>Weight: {rft.inspectionData.weight}</li>
                    {/* Add more inspection data fields as needed */}
                  </ul>
                  <p className="mt-2">RFT Data:</p>
                  <ul className="ml-4">
                    <li>eGFR: {rft.rftData.eGFR}</li>
                    <li>Urea: {rft.rftData.urea}</li>
                    <li>Sodium: {rft.rftData.sodium}</li>
                    <li>CKD Stage: {rft.rftData.ckdStage}</li>
                    {/* Add more RFT data fields as needed */}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        </Accordion>
      </div>
    </div>
  );
}

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-4 text-left text-lg font-semibold focus:outline-none"
        onClick={toggleAccordion}
      >
        {title}
        <span className="float-right">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
}
export default PatientDetails;
