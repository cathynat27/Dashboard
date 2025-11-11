import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUser, faSpinner, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINTS, API_CONFIG } from '../../config/api';
import { testApiConnection } from '../../utils/apiTest';

const SimprintsPage = () => {
  const [data, setData] = useState({ users: [], doseCounts: { dose1: 0, dose2: 0, dose3: 0, dose4: 0 } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    const startTime = performance.now();
    try {
      setLoading(true);
      setError(null);

      console.log('🔧 Environment Configuration:');
      console.log('- REACT_APP_BACKEND_URL_NEW:', process.env.REACT_APP_BACKEND_URL_NEW);
      console.log('- API_CONFIG.BACKEND_URL_NEW:', API_CONFIG.BACKEND_URL_NEW);
      console.log('- Users endpoint:', API_ENDPOINTS.NEW.USERS);
      console.log('- Users with patients endpoint:', `${API_CONFIG.BACKEND_URL_NEW}/api/patients/users-with-patients`);
      console.log('Starting data fetch at:', new Date().toISOString());
      
      // Run API connection test for diagnostics
      await testApiConnection();

      // Add timeout to prevent hanging requests
      const fetchWithTimeout = (url, timeout = 30000) => {
        return Promise.race([
          fetch(url),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), timeout)
          )
        ]);
      };

      // Use the all-patients endpoint which includes vaccination and diagnosis data
      console.log('🚀 Using all-patients endpoint with full data...');
      
      try {
        const [usersResponse, allPatientsResponse] = await Promise.all([
          fetchWithTimeout(API_ENDPOINTS.NEW.USERS),
          fetchWithTimeout(API_ENDPOINTS.NEW.ALL_PATIENTS)
        ]);
        
        if (!usersResponse.ok) {
          throw new Error(`Failed to fetch users: ${usersResponse.status}`);
        }

        const usersData = await usersResponse.json();
        console.log('✅ Users data:', usersData);
        
        let allPatientsData = [];
        if (allPatientsResponse.ok) {
          const patientsData = await allPatientsResponse.json();
          allPatientsData = patientsData; // all-patients returns array directly, not wrapped in data
          console.log(`✅ All patients data: ${allPatientsData.length} patients`);
        } else {
          console.warn('Failed to fetch all-patients, will show users with 0 counts');
        }

        // Process the data to count patients, vaccinations, diagnoses and doses per user
        const userStats = {};
        const doseCounts = { dose1: 0, dose2: 0, dose3: 0, dose4: 0 };
        
        if (Array.isArray(allPatientsData)) {
          allPatientsData.forEach((userWithPatients) => {
            const userId = userWithPatients.id;
            const patients = userWithPatients.patients || [];
            
            let vaccinationCount = 0;
            let diagnosisCount = 0;
            
            patients.forEach(patient => {
              // Count vaccinations for this patient
              if (patient.vaccinations && Array.isArray(patient.vaccinations)) {
                vaccinationCount += patient.vaccinations.length;
                
                // Count doses - check multiple possible fields
                patient.vaccinations.forEach(vaccination => {
                  // Check various possible field names for dose
                  const dose = vaccination.dose || 
                               vaccination.attributes?.dose || 
                               vaccination.doseNumber ||
                               vaccination.attributes?.doseNumber ||
                               vaccination.dose_number ||
                               vaccination.attributes?.dose_number;
                  
                  // Log first few vaccinations to understand structure
                  if (doseCounts.dose1 === 0 && doseCounts.dose2 === 0 && doseCounts.dose3 === 0) {
                    console.log('Sample vaccination:', vaccination);
                  }
                  
                  const doseNum = parseInt(dose);
                  if (doseNum === 1 || dose === '1' || dose === '1st') doseCounts.dose1++;
                  else if (doseNum === 2 || dose === '2' || dose === '2nd') doseCounts.dose2++;
                  else if (doseNum === 3 || dose === '3' || dose === '3rd') doseCounts.dose3++;
                  else if (doseNum === 4 || dose === '4' || dose === '4th') doseCounts.dose4++;
                });
              }
              
              // Count diagnoses for this patient
              if (patient.diagnoses && Array.isArray(patient.diagnoses)) {
                diagnosisCount += patient.diagnoses.length;
              }
            });
            
            userStats[userId] = {
              patientCount: patients.length,
              vaccinationCount,
              diagnosisCount
            };
          });
        }
        
        console.log('💉 Vaccination Dose Counts:', doseCounts);
        
        console.log('📊 User statistics calculated:', userStats);
        
        // Combine user data with statistics
        const enhancedUsers = usersData.map(user => {
          const stats = userStats[user.id] || { patientCount: 0, vaccinationCount: 0, diagnosisCount: 0 };
          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            patientCount: stats.patientCount,
            vaccinationCount: stats.vaccinationCount,
            diagnosisCount: stats.diagnosisCount,
            fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'N/A'
          };
        });
        
        // Sort by patient count (descending)
        enhancedUsers.sort((a, b) => b.patientCount - a.patientCount);
        
        // Calculate and log final statistics
        const totalPatients = enhancedUsers.reduce((sum, user) => sum + user.patientCount, 0);
        const totalVaccinations = enhancedUsers.reduce((sum, user) => sum + user.vaccinationCount, 0);
        const totalDiagnoses = enhancedUsers.reduce((sum, user) => sum + user.diagnosisCount, 0);
        
        console.log('📊 Final Statistics:');
        console.log(`- Total Users: ${enhancedUsers.length}`);
        console.log(`- Total Patients: ${totalPatients}`);
        console.log(`- Total Vaccinations: ${totalVaccinations}`);
        console.log(`- Total Diagnoses: ${totalDiagnoses}`);
        console.log(`- Dose Breakdown: 1st: ${doseCounts.dose1}, 2nd: ${doseCounts.dose2}, 3rd: ${doseCounts.dose3}, 4th: ${doseCounts.dose4}`);
        
        // Show top users
        console.log('🏆 Top 5 users by patient count:');
        enhancedUsers.slice(0, 5).forEach((user, index) => {
          console.log(`${index + 1}. ${user.fullName}: ${user.patientCount} patients, ${user.vaccinationCount} vaccinations, ${user.diagnosisCount} diagnoses`);
        });
        
        setData({ users: enhancedUsers, doseCounts });
        
      } catch (err) {
        console.error('Error fetching SIMPRINTS data:', err);
        setError(err.message);
      }
      
      const endTime = performance.now();
      console.log(`✅ SIMPRINTS data loaded successfully in ${((endTime - startTime) / 1000).toFixed(2)} seconds`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-600 animate-spin mb-4" />
          <p className="text-lg text-gray-600">Loading SIMPRINTS data...</p>
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
            onClick={fetchUsersData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const users = data.users;
  const doseCounts = data.doseCounts;
  const totalPatients = users.reduce((sum, user) => sum + user.patientCount, 0);
  const totalVaccinations = users.reduce((sum, user) => sum + (user.vaccinationCount || 0), 0);
  const totalDiagnoses = users.reduce((sum, user) => sum + (user.diagnosisCount || 0), 0);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          <FontAwesomeIcon icon={faUsers} className="mr-3 text-blue-600" />
          SIMPRINTS 2025
        </h1>
        <p className="text-gray-600">Overview of users and their patient assignments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUsers} className="text-3xl text-blue-600 mr-4" />
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
          <div>
            <p className="text-sm font-medium text-gray-600 mb-3">Vaccination Doses</p>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">1st Dose:</span>
                <span className="text-sm font-bold text-blue-600">{doseCounts.dose1}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">2nd Dose:</span>
                <span className="text-sm font-bold text-green-600">{doseCounts.dose2}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">3rd Dose:</span>
                <span className="text-sm font-bold text-orange-600">{doseCounts.dose3}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">4th Dose:</span>
                <span className="text-sm font-bold text-purple-600">{doseCounts.dose4}</span>
              </div>
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
                  No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
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
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
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
                          className="bg-blue-600 h-2 rounded-full"
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
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimprintsPage;
