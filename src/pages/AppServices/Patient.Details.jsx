import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function PatientDetails() {
  const location = useLocation();
  const { patient } = location.state || {};
  const [isLoading, setIsLoading] = useState(true);

  if (!patient ) {
    return <div>No patient data found</div>;
  }

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto py-8 h-full">
      <div className="mainCard">
        <div className="border border-gray-200 bg-white p-4 rounded-md">
          <h1 className="text-2xl font-bold mb-4 px-6 py-3 text-black-900 uppercase tracking-wider">
            Patient Name: {patient.firstName} {patient.lastName || "N/A"}
          </h1>
          <div>
            <Accordion title="Personal Information">
              <div className="mt-4">
                {patient.phoneNumber !== "" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Phone Number:
                    </div>
                    <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                      {patient.phoneNumber}
                    </div>
                  </div>
                )}
                {patient.primaryLanguage !== "" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Primary Language:
                    </div>
                    <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                      {patient.primaryLanguage}
                    </div>
                  </div>
                )}
                {patient.nextOfKin !== "" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Next of Kin:
                    </div>
                    <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                      {patient.nextOfKin}
                    </div>
                  </div>
                )}
                {patient.nextOfKinContact !== "" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Next of Kin Contact:
                    </div>
                    <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                      {patient.nextOfKinContact}
                    </div>
                  </div>
                )}
                {patient.occuptation !== "" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Occupation:
                    </div>
                    <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                      {patient.occuptation}
                    </div>
                  </div>
                )}
                {patient.height !== "" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Height:
                    </div>
                    <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                      {patient.height}cm
                    </div>
                  </div>
                )}
                {patient.weight !== "" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Weight:
                    </div>
                    <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                      {patient.weight}kgs
                    </div>
                  </div>
                )}
                {patient.dateOfBirth !== "" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Date of Birth:
                    </div>
                    <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                      {patient.dateOfBirth}
                    </div>
                  </div>
                )}
                {patient.sex !== "" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Sex:
                    </div>
                    <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                      {patient.sex}
                    </div>
                  </div>
                )}
                {patient.ethinicity !== "" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Ethnicity:
                    </div>
                    <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                      {patient.ethinicity}
                    </div>
                  </div>
                )}
                {patient.maritalStatus !== "" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Marital Status:
                    </div>
                    <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                      {patient.maritalStatus}
                    </div>
                  </div>
                )}
                {patient.primaryLanguage !== "" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Primary Language:
                    </div>
                    <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                      {patient.primaryLanguage}
                    </div>
                  </div>
                )}
              </div>
            </Accordion>
          </div>

          <Accordion title="Diagnoses">
            <ul className="mt-4">
              {patient.diagnoses.map((diagnosis, index) => (
                <li key={index} className="mb-4">
                  <h3 className="px-6 py-3 text-left text-xl font-bold text-black-900 capitalize tracking-wider">
                    Diagnosis {index + 1}
                  </h3>
                  <dl className="grid grid-cols-2 gap-4 mt-2">
                    {diagnosis.condition !== "" && (
                      <>
                        <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Condition:
                        </div>
                        <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                          {diagnosis.condition}
                        </div>
                      </>
                    )}
                    {diagnosis.dateOfDiagnosis !== "" && (
                      <>
                        <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Date of Diagnosis:
                        </div>
                        <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                          {diagnosis.dateOfDiagnosis}
                        </div>
                      </>
                    )}
                    {diagnosis.diagnosedBy !== "" && (
                      <>
                        <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Diagnosed By:
                        </div>
                        <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                          {diagnosis.diagnosedBy}
                        </div>
                      </>
                    )}
                    {diagnosis.dosage !== "" && (
                      <>
                        <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Dosage:
                        </div>
                        <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                          {diagnosis.dosage}
                        </div>
                      </>
                    )}
                    {/* Similarly, add conditional rendering for other fields */}
                  </dl>
                </li>
              ))}
            </ul>
          </Accordion>

          {/* Antenatals Section */}
          <Accordion title="Antenatals">
            <section className="mt-8">
              <h2 className="px-6 py-3 text-left text-xl font-bold text-black-900 capitalize tracking-wider">
                Antenatals
              </h2>
              <ul className="mt-4">
                {patient.antenantals.map((antenatal, index) => (
                  <li key={index} className="mb-4">
                    <dl className="grid grid-cols-2 gap-4 mt-2">
                      {antenatal.expectedDateOfDelivery !== "" && (
                        <>
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Expected Date of Delivery:
                          </div>
                          <div>
                            {new Date(
                              antenatal.expectedDateOfDelivery
                            ).toLocaleDateString()}
                          </div>
                        </>
                      )}
                      {antenatal.bloodGroup !== "" && (
                        <>
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Blood Group:
                          </div>
                          <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                            {antenatal.bloodGroup}
                          </div>
                        </>
                      )}
                      {antenatal.nextOfKin !== "" && (
                        <>
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Next of Kin:
                          </div>
                          <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                            {antenatal.nextOfKin}
                          </div>
                        </>
                      )}
                      {antenatal.nextOfKinContact !== "" && (
                        <>
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Next of Kin Contact:
                          </div>
                          <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                            {antenatal.nextOfKinContact}
                          </div>
                        </>
                      )}
                      {antenatal.pregnancyStatus !== "" && (
                        <>
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Pregnancy Status:
                          </div>
                          <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                            {antenatal.pregnancyStatus}
                          </div>
                        </>
                      )}
                      {antenatal.prescriptions !== "" && (
                        <>
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Prescriptions:
                          </div>
                          <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                            {antenatal.prescriptions}
                          </div>
                        </>
                      )}
                      {antenatal.reviewedBy !== "" && (
                        <>
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Reviewed By:
                          </div>
                          <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                            {antenatal.reviewedBy}
                          </div>
                        </>
                      )}
                      {antenatal.routineVisitDate !== "" && (
                        <>
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Routine Visit Date:
                          </div>
                          <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                            {antenatal.routineVisitDate}
                          </div>
                        </>
                      )}
                      {antenatal.weight !== "" && (
                        <>
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Weight:
                          </div>
                          <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                            {antenatal.weight} kgs
                          </div>
                        </>
                      )}
                      {antenatal.publishedAt !== "" && (
                        <>
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Published At:
                          </div>
                          <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                            {antenatal.publishedAt}
                          </div>
                        </>
                      )}
                      {antenatal.updatedAt !== "" && (
                        <>
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Updated At:
                          </div>
                          <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                            {antenatal.updatedAt}
                          </div>
                        </>
                      )}
                    </dl>
                  </li>
                ))}
              </ul>
            </section>
          </Accordion>

          <Accordion title="Vaccinations">
            <section className="mt-2">
              <ul className="mt-4">
                {patient.vaccinations.map((vaccination, index) => (
                  <li key={index} className="mb-4">
                    {vaccination.dateOfVaccination !== "" && (
                      <h3 className="text-lg font-semibold underline underline-offset-1 text-red-500">
                        Vaccination {index + 1}
                      </h3>
                    )}
                    <dl className="grid grid-cols-2 gap-4 mt-2">
                      {vaccination.dateOfVaccination !== "" && (
                        <>
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Date of Vaccination:
                          </div>
                          <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                            {vaccination.dateOfVaccination}
                          </div>
                        </>
                      )}
                      {vaccination.dose !== "" && (
                        <>
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Dose:
                          </div>
                          <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                            {vaccination.dose}
                          </div>
                        </>
                      )}
                      {vaccination.vaccineName !== "" && (
                        <>
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Vaccine Name:
                          </div>
                          <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                            {vaccination.vaccineName}
                          </div>
                        </>
                      )}
                      {vaccination.facility !== "" && (
                        <>
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Facility:
                          </div>
                          <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                            {vaccination.facility}
                          </div>
                        </>
                      )}
                      {vaccination.siteAdministered !== "" && (
                        <>
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Site Administered:
                          </div>
                          <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                            {vaccination.siteAdministered}
                          </div>
                        </>
                      )}
                      {vaccination.dateForNextDose !== "" && (
                        <>
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Date for Next Dose:
                          </div>
                          <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                            {vaccination.dateForNextDose}
                          </div>
                        </>
                      )}
                      {vaccination.vaccinatedBy !== "" && (
                        <>
                          <div className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Vaccinated By:
                          </div>
                          <div className="px-6 py-3 text-left text-base font-bold text-gray-900 capitalize tracking-wider">
                            {vaccination.vaccinatedBy}
                          </div>
                        </>
                      )}
                    </dl>
                  </li>
                ))}
              </ul>
            </section>
          </Accordion>

          <Accordion title="Renal Monitorings">
            <section className="mt-2">
              <ul className="mt-4">
                {patient.monitorings.map((monitoring, index) => (
                  <li key={index} className="mb-4">
                    {monitoring.monitoringData &&
                      monitoring.monitoringData.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold underline underline-offset-1 text-red-500">
                            Monitoring {index + 1}
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <p className="px-6 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider">
                                Chemistry:
                              </p>
                              <ul>
                                {Object.entries(
                                  monitoring.monitoringData[0].chemistry
                                ).map(
                                  ([key, value]) =>
                                    value !== "" && (
                                      <li key={key}>
                                        <div className="px-6 py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider">
                                          {key}: {value}
                                        </div>
                                      </li>
                                    )
                                )}
                              </ul>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <p className="px-6 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider">
                                Appearance:
                              </p>
                              <ul>
                                {Object.entries(
                                  monitoring.monitoringData[0].appearance
                                ).map(
                                  ([key, value]) =>
                                    value !== "" && (
                                      <li key={key}>
                                        <div className="px-6 py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider">
                                          {key}: {value}
                                        </div>
                                      </li>
                                    )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                  </li>
                ))}
              </ul>
            </section>
          </Accordion>

          <Accordion title="Renal Screening">
            <section className="mt-8">
              <ul className="mt-2">
                {patient.renal_histories.map((renalHistory, index) => (
                  <li key={index} className="mb-4">
                    <h3 className="text-lg font-semibold underline underline-offset-1 text-red-500">
                      Renal Screening {index + 1}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <h4 className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Patient History:
                        </h4>
                        <ul className="grid grid-cols-2 gap-2 mt-2">
                          {Object.entries(renalHistory.historyData).map(
                            ([key, value]) =>
                              value !== "" && ( // Check if the value is not an empty string
                                <li key={key}>
                                  <div className="px-6 py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider">
                                    {key}: {value}
                                  </div>
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <p className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Urine Apperance:
                        </p>
                        <p className="px-6 py-3  text-left text-sm font-bold text-black-500 uppercase tracking-wider">
                          CLARITY: {renalHistory.appearance.clarity}
                          <br />
                          COLOR: {renalHistory.appearance.color}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <h4 className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Urine Chemistry:
                        </h4>
                        <ul className="grid grid-cols-2 gap-2 mt-2">
                          {Object.entries(renalHistory.chemistry).map(
                            ([key, value]) =>
                              value !== "" && ( // Check if the value is not an empty string
                                <li key={key}>
                                  <div className="px-6 py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider">
                                    {key}: {value}
                                  </div>
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <h4 className="px-6 py-3  text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                          Inspection Data
                        </h4>

                        {renalHistory.inspectionData && (
                          <div>
                            <ul>
                              {renalHistory.inspectionData.bloodPressure && (
                                <li>
                                  <div className="px-6 py-3  text-left text-sm font-bold text-black-500 uppercase tracking-wider">
                                    Heart Pulse:{" "}
                                    {
                                      renalHistory.inspectionData.bloodPressure
                                        .heartPulse
                                    }{" "}
                                    beats /minute
                                  </div>
                                </li>
                              )}
                              {renalHistory.inspectionData.bloodPressure && (
                                <li>
                                  <div className="px-6 py-3  text-left text-sm font-bold text-black-500 uppercase tracking-wider">
                                    Systolic Pressure:{" "}
                                    {
                                      renalHistory.inspectionData.bloodPressure
                                        .systolicPressure
                                    }
                                  </div>
                                </li>
                              )}
                              {renalHistory.inspectionData.bloodPressure && (
                                <li>
                                  <div className="px-6 py-3  text-left text-sm font-bold text-black-500 uppercase tracking-wider">
                                    Diastolic Pressure:{" "}
                                    {
                                      renalHistory.inspectionData.bloodPressure
                                        .diastolicPressure
                                    }
                                  </div>
                                </li>
                              )}
                              {renalHistory.inspectionData.signsAndSymptoms && (
                                <li>
                                  <div className="px-6 py-3  text-left text-sm font-bold text-black-500 uppercase tracking-wider">
                                    Signs And Symptoms:{" "}
                                    {
                                      renalHistory.inspectionData
                                        .signsAndSymptoms
                                    }
                                  </div>
                                </li>
                              )}
                              {renalHistory.inspectionData.bmi && (
                                <li>
                                  <div className="px-6 py-3  text-sm font-bold text-black-500 uppercase tracking-wider">
                                    BMI: {renalHistory.inspectionData.bmi}
                                  </div>
                                </li>
                              )}
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
              <ul className="mt-4">
                {patient.rfts.map((rft, index) => (
                  <li key={index} className="mb-4">
                    <h3 className="text-left text-lg font-bold text-red-500 uppercase tracking-wider underline underline-offset-1 ">
                      Renal Function Test - {index + 1}
                    </h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <p className="py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider">
                        Inspection Data:
                      </p>

                      <ul>
                        {rft.inspectionData && (
                          <>
                            {rft.inspectionData.bmi !== "" && (
                              <li>
                                <div className="px-6 py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider">
                                  BMI: {rft.inspectionData.bmi}
                                </div>
                              </li>
                            )}
                            {rft.inspectionData.bloodPressure && (
                              <>
                                {rft.inspectionData.bloodPressure
                                  .diastolicPressure !== "" && (
                                  <li className="py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider">
                                    Dialostic Pressure:{" "}
                                    {
                                      rft.inspectionData.bloodPressure
                                        .diastolicPressure
                                    }
                                  </li>
                                )}
                                {rft.inspectionData.bloodPressure
                                  .systolicPressure !== "" && (
                                  <li className="py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider">
                                    Systolic Pressure:{" "}
                                    {
                                      rft.inspectionData.bloodPressure
                                        .systolicPressure
                                    }
                                  </li>
                                )}
                                {rft.inspectionData.bloodPressure.heartPulse !==
                                  "" && (
                                  <li className="py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider">
                                    Heart Pluse:{" "}
                                    {
                                      rft.inspectionData.bloodPressure
                                        .heartPulse
                                    }{" "}
                                    beats per minute
                                  </li>
                                )}
                              </>
                            )}
                            {rft.inspectionData.signsAndSymptoms !== "" && (
                              <li className="py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider">
                                Signs and Symptoms:{" "}
                                {rft.inspectionData.signsAndSymptoms}
                              </li>
                            )}
                          </>
                        )}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <p className="py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider">
                        RFT Data:
                      </p>
                      <ul>
                        {rft.rftData && (
                          <>
                            {rft.rftData.eGFR !== "" && (
                              <li className="px-6 py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider">
                                eGFR: {rft.rftData.eGFR}
                              </li>
                            )}
                            {rft.rftData.urea !== "" && (
                              <li className="px-6 py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider">
                                Urea: {rft.rftData.urea}
                              </li>
                            )}
                            {rft.rftData.sodium !== "" && (
                              <li className="px-6 py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider">
                                Sodium: {rft.rftData.sodium}
                              </li>
                            )}
                            {rft.rftData.creatinine !== "" && (
                              <li className="px-6 py-3 text-left text-sm font-bold text-red-500 uppercase tracking-wider">
                                Creatinine: {rft.rftData.creatinine}
                              </li>
                            )}
                            {rft.rftData.ckdStage !== "" && (
                              <li className="px-6 py-3 text-left text-sm font-bold text-red-500 uppercase tracking-wider">
                                CKD Stage: {rft.rftData.ckdStage}
                              </li>
                            )}
                          </>
                        )}
                      </ul>
                    </div>
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
        className="w-full py-4 text-left text-base font-semibold focus:outline-none uppercase tracking-wider"
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