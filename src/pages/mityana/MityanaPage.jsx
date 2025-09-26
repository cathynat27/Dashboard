import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUser, faSpinner, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINTS, API_CONFIG } from '../../config/api';

const MityanaPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the user ID range for Mityana Project (197-213)
  const MITYANA_USER_IDS = Array.from({ length: 17 }, (_, i) => 197 + i);

  useEffect(() => {
    fetchMityanaData();
  }, []);

  const fetchMityanaData = async () => {
    const startTime = performance.now();
    try {
      setLoading(true);
      setError(null);

      console.log('🏥 MITYANA PROJECT - Fetching data for users 197-213');
      console.log('Using OLD Backend URL:', API_CONFIG.BACKEND_URL_OLD);
      console.log('Target User IDs:', MITYANA_USER_IDS);

      // Fetch all patients data from the old backend
      const patientsResponse = await fetch(API_ENDPOINTS.OLD.ALL_PATIENTS);
      
      if (!patientsResponse.ok) {
        throw new Error(`Failed to fetch patients: ${patientsResponse.status}`);
      }

      const allUsersData = await patientsResponse.json();
      console.log('Total users from backend:', allUsersData.length);

      // Filter users by the Mityana Project user IDs (197-213)
      const mityanaUsers = allUsersData.filter(user => 
        MITYANA_USER_IDS.includes(user.id)
      );

      console.log('Filtered Mityana users:', mityanaUsers.length);

      // Process each user to get patient counts, vaccinations, and diagnoses
      const processedUsers = mityanaUsers.map(user => {
        const patients = user.patients || [];
        
        // Count vaccinations across all patients for this user
        let totalVaccinations = 0;
        let totalDiagnoses = 0;

        patients.forEach(patient => {
          // Count vaccinations for this patient
          if (patient.vaccinations && Array.isArray(patient.vaccinations)) {
            totalVaccinations += patient.vaccinations.length;
          }
          
          // Count diagnoses for this patient  
          if (patient.diagnoses && Array.isArray(patient.diagnoses)) {
            totalDiagnoses += patient.diagnoses.length;
          }
        });

        return {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'N/A',
          patientCount: patients.length,
          vaccinationCount: totalVaccinations,
          diagnosisCount: totalDiagnoses,
          patients: patients
        };
      });

      // Sort by patient count (descending)
      processedUsers.sort((a, b) => b.patientCount - a.patientCount);

      setUsers(processedUsers);
      
      const endTime = performance.now();
      console.log(`✅ MITYANA PROJECT data loaded successfully in ${((endTime - startTime) / 1000).toFixed(2)} seconds`);
      console.log('Final processed users:', processedUsers);
      
    } catch (err) {
      console.error('Error fetching Mityana data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-600 animate-spin mb-4" />
          <p className="text-lg text-gray-600">Loading MITYANA PROJECT data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-red-600 mb-4" />
          <p className="text-lg text-red-600 mb-2">Error loading data</p>
          <p className="text-sm text-gray-600">{error}</p>
          <button
            onClick={fetchMityanaData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const totalPatients = users.reduce((sum, user) => sum + user.patientCount, 0);
  const totalVaccinations = users.reduce((sum, user) => sum + (user.vaccinationCount || 0), 0);
  const totalDiagnoses = users.reduce((sum, user) => sum + (user.diagnosisCount || 0), 0);
  const avgPatientsPerUser = users.length > 0 ? (totalPatients / users.length).toFixed(1) : 0;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          <FontAwesomeIcon icon={faUsers} className="mr-3 text-green-600" />
          MITYANA PROJECT
        </h1>
        <p className="text-gray-600">Overview of Mityana Project users (IDs 197-213) and their patient assignments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUsers} className="text-3xl text-green-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUser} className="text-3xl text-green-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">{totalPatients}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUser} className="text-3xl text-orange-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Vaccinations</p>
              <p className="text-2xl font-bold text-gray-900">{totalVaccinations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUser} className="text-3xl text-red-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Diagnoses</p>
              <p className="text-2xl font-bold text-gray-900">{totalDiagnoses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUsers} className="text-3xl text-purple-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Patients/User</p>
              <p className="text-2xl font-bold text-gray-900">{avgPatientsPerUser}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Users, Patient Counts, Vaccinations, and Diagnoses</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vaccinations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Diagnoses
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {user.fullName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.username || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">
                        {user.patientCount}
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: totalPatients > 0 ? `${(user.patientCount / Math.max(...users.map(u => u.patientCount))) * 100}%` : '0%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">
                        {user.vaccinationCount || 0}
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{
                            width: totalVaccinations > 0 ? `${((user.vaccinationCount || 0) / Math.max(...users.map(u => u.vaccinationCount || 0), 1)) * 100}%` : '0%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">
                        {user.diagnosisCount || 0}
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{
                            width: totalDiagnoses > 0 ? `${((user.diagnosisCount || 0) / Math.max(...users.map(u => u.diagnosisCount || 0), 1)) * 100}%` : '0%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="text-center py-8">
            <FontAwesomeIcon icon={faUsers} className="text-4xl text-gray-400 mb-4" />
            <p className="text-gray-500">No Mityana Project users found (IDs 197-213)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MityanaPage;