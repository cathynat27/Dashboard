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
        <div className="border border-gray-200 bg-white p-4 rounded-md">
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
            <ul className="mt-4">
              {patient.diagnoses.map((diagnosis, index) => (
                <li key={index} className="mb-4">
                  <h3 className="px-6 py-3  text-left text-xl font-bold text-black-900 capitalize tracking-wider">
                    Diagnosis {index + 1}
                  </h3>
                  <dl className="grid grid-cols-2 gap-4 mt-2">
                    <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Condition:
                    </div>
                    <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                      {diagnosis.condition}
                    </div>
                    <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Date of Diagnosis:
                    </div>
                    <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                      {diagnosis.dateOfDiagnosis}
                    </div>
                    <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Diagnosed By:
                    </div>
                    <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                      {diagnosis.diagnosedBy}
                    </div>
                    {diagnosis.dosage && (
                      <>
                        <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Dosage:
                        </div>
                        <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                          {diagnosis.dosage}
                        </div>
                      </>
                    )}
                    {diagnosis.drugsPrescribed && (
                      <>
                        <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Drugs Prescribed:
                        </div>
                        <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                          {diagnosis.drugsPrescribed}
                        </div>
                      </>
                    )}
                    {diagnosis.duration && (
                      <>
                        <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Duration:
                        </div>
                        <div>{diagnosis.duration}</div>
                      </>
                    )}
                    {diagnosis.followUpDate && (
                      <>
                        <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Follow-up Date:
                        </div>
                        <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                          {diagnosis.followUpDate}
                        </div>
                      </>
                    )}
                    {diagnosis.frequency && (
                      <>
                        <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Frequency:
                        </div>
                        <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                          {diagnosis.frequency}
                        </div>
                      </>
                    )}
                    {diagnosis.impression && (
                      <>
                        <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Impression:
                        </div>
                        <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                          {diagnosis.impression}
                        </div>
                      </>
                    )}
                    {diagnosis.isPregnant !== undefined && (
                      <>
                        <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Is Pregnant:
                        </div>
                        <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                          {diagnosis.isPregnant ? "Yes" : "No"}
                        </div>
                      </>
                    )}
                    {diagnosis.labTests && (
                      <>
                        <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Lab Tests:
                        </div>
                        <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                          {diagnosis.labTests}
                        </div>
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
              <h2 className="px-6 py-3  text-left text-xl font-bold text-black-900 capitalize tracking-wider">
                Antenatals
              </h2>
              <ul className="mt-4">
                {patient.antenantals.map((antenatal, index) => (
                  <li key={index} className="mb-4">
                    <dl className="grid grid-cols-2 gap-4 mt-2">
                      <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Expected Date of Delivery:
                      </div>
                      <div>
                        {new Date(
                          antenatal.expectedDateOfDelivery
                        ).toLocaleDateString()}
                      </div>
                      <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Blood Group:
                      </div>
                      <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                        {antenatal.bloodGroup}
                      </div>
                      <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Next of Kin:
                      </div>
                      <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                        {antenatal.nextOfKin}
                      </div>
                      <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Next of Kin Contact:
                      </div>
                      <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                        {antenatal.nextOfKinContact}
                      </div>
                      <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Pregnancy Status:
                      </div>
                      <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                        {antenatal.pregnancyStatus}
                      </div>
                      <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Prescriptions:
                      </div>
                      <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                        {antenatal.prescriptions}
                      </div>
                      <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Reviewed By:
                      </div>
                      <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                        {antenatal.reviewedBy}
                      </div>
                      <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Routine Visit Date:
                      </div>
                      <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                        {antenatal.routineVisitDate}
                      </div>
                      <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Weight:
                      </div>
                      <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                        {antenatal.weight}
                      </div>
                      <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Published At:
                      </div>
                      <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                        {antenatal.publishedAt}
                      </div>
                      <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Updated At:
                      </div>
                      <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                        {antenatal.updatedAt}
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            </section>
          </Accordion>

          <Accordion title="Vaccinations">
            <section className="mt-8">
              <h2 className="px-6 py-3  text-left text-xl font-bold text-black-900 capitalize tracking-wider">
                Vaccinations
              </h2>
              <ul className="mt-4">
                {patient.vaccinations.map((vaccination, index) => (
                  <li key={index} className="mb-4">
                    <h3 className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize">
                      Vaccination {index + 1}
                    </h3>
                    <dl className="grid grid-cols-2 gap-4 mt-2">
                      <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Date of Vaccination:
                      </div>
                      <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                        {vaccination.dateOfVaccination}
                      </div>
                      <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Dose:
                      </div>
                      <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                        {vaccination.dose}
                      </div>
                      <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Vaccine Name:
                      </div>
                      <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                        {vaccination.vaccineName}
                      </div>
                      <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Facility:
                      </div>
                      <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                        {vaccination.facility}
                      </div>
                      <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Site Administered:
                      </div>
                      <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                        {vaccination.siteAdministered}
                      </div>
                      <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Date for Next Dose:
                      </div>
                      <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                        {vaccination.dateForNextDose}
                      </div>
                      <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Vaccinated By:
                      </div>
                      <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                        {vaccination.vaccinatedBy}
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            </section>
          </Accordion>

          <Accordion title="Monitorings">
            <section className="mt-8">
              <h2 className="px-6 py-3  text-left text-xl font-bold text-black-900 capitalize tracking-wider">
                Monitorings
              </h2>
              <ul className="mt-4">
                {patient.monitorings.map((monitoring, index) => (
                  <li key={index} className="mb-4">
                    {monitoring.monitoringData &&
                      monitoring.monitoringData.length > 0 && (
                        <div>
                          <h3 className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize">
                            Monitoring {index + 1}
                          </h3>
                          <p className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Chemistry:
                          </p>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            {Object.entries(
                              monitoring.monitoringData[0].chemistry
                            ).map(([key, value]) => (
                              <React.Fragment key={key}>
                                <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                                  {key}:
                                </div>
                                <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                                  {value}
                                </div>
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
              <h2 className="px-6 py-3  text-left text-xl font-bold text-black-900 capitalize tracking-wider">
                Renal Histories
              </h2>
              <ul className="mt-4">
                {patient.renal_histories.map((renalHistory, index) => (
                  <li key={index} className="mb-4">
                    <h3 className="text-lg font-semibold underline underline-offset-1">
                      Renal History {index + 1}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <p className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Appearance Color:
                        </p>
                        <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                          {renalHistory.appearance.color}
                        </div>
                        <p className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Appearance Clarity:
                        </p>
                        <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                          {renalHistory.appearance.clarity}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <h4>Urine Chemistry:</h4>
                        <ul className="grid grid-cols-2 gap-2 mt-2">
                          {Object.entries(renalHistory.chemistry).map(
                            ([key, value]) => (
                              <li key={key}>
                                <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                                  {key}
                                </div>
                                <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                                  {value}
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <h4 className="text-md font-semibold mt-4">
                          Inspection Data
                        </h4>

                        {renalHistory.inspectionData && (
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            <ul>
                              <li>
                                <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                                  Heart Pulse:
                                </div>
                                <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                                  {
                                    renalHistory.inspectionData.bloodPressure
                                      .heartPulse
                                  }{" "}
                                  beats /minute
                                </div>
                              </li>
                              <li>
                                <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                                  Systolic Pressure:
                                </div>
                                <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                                  {
                                    renalHistory.inspectionData.bloodPressure
                                      .systolicPressure
                                  }
                                </div>
                              </li>
                              <li>
                                <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                                  Diastolic Pressure:
                                </div>
                                <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                                  {
                                    renalHistory.inspectionData.bloodPressure
                                      .diastolicPressure
                                  }
                                </div>
                              </li>

                              <li>
                                <div className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                                  Signs And Symptoms:
                                </div>
                                <div className="px-6 py-3  text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                                  {renalHistory.inspectionData.signsAndSymptoms}
                                </div>
                              </li>

                              <li>
                                <div className="px-6 py-3  text-sm font-bold text-gray-500 uppercase tracking-wider">
                                  BMI
                                </div><div className="px-6 py-3 text-base font-bold text-gray-900 capitalize tracking-wider">{renalHistory.inspectionData.bmi}</div>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </Accordion>

          <Accordion title="Renal Functional Tests">
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
