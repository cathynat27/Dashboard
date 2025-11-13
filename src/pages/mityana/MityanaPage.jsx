import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUser, faSpinner, faExclamationTriangle, faCreditCard, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINTS, API_CONFIG } from '../../config/api';

const MityanaPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the user IDs for Mityana Project (197-217, 226, 88)
  const MITYANA_USER_IDS = [...Array.from({ length: 21 }, (_, i) => 197 + i), 226, 88];

  useEffect(() => {
    fetchMityanaData();
  }, []);

  const fetchMityanaData = async () => {
    const startTime = performance.now();
    try {
      setLoading(true);
      setError(null);

      console.log('🏥 MITYANA PROJECT - Fetching data for users 197-217, 226, 88');
      console.log('Using OLD Backend URL:', API_CONFIG.BACKEND_URL_OLD);
      console.log('Target User IDs:', MITYANA_USER_IDS);

      // Fetch patients, payments, and user login logs in parallel
      // Note: Screening data (diabetes, hypertension, monitoring) is already nested in patient objects
      const [patientsResponse, paymentsResponse, loginLogsResponse] = await Promise.all([
        fetch(API_ENDPOINTS.OLD.ALL_PATIENTS),
        fetch(API_ENDPOINTS.OLD.PAYMENTS),
        fetch(`${API_CONFIG.BACKEND_URL_OLD}/api/user-login-logs?pagination[limit]=10000`)
      ]);
      
      if (!patientsResponse.ok) {
        throw new Error(`Failed to fetch patients: ${patientsResponse.status}`);
      }

      const allUsersData = await patientsResponse.json();
      console.log('Total users from backend:', allUsersData.length);

      // Process payments data
      let allPayments = [];
      if (paymentsResponse.ok) {
        const paymentsData = await paymentsResponse.json();
        allPayments = paymentsData.data || paymentsData || [];
        console.log('Total payments from backend:', allPayments.length);
      } else {
        console.warn('Failed to fetch payments data:', paymentsResponse.status);
      }

      // Process login logs data
      let allLoginLogs = [];
      if (loginLogsResponse.ok) {
        const loginLogsData = await loginLogsResponse.json();
        allLoginLogs = loginLogsData.data || loginLogsData || [];
        console.log('Total login logs from backend:', allLoginLogs.length);
      } else {
        console.warn('Failed to fetch login logs:', loginLogsResponse.status);
      }

      // Filter users by the Mityana Project user IDs (197-217, 226, 88)
      const mityanaUsers = allUsersData.filter(user => 
        MITYANA_USER_IDS.includes(user.id)
      );

      console.log('Filtered Mityana users:', mityanaUsers.length);

      // Process each user to get patient counts, diabetes, hypertension, follow-ups, and payments
      const processedUsers = mityanaUsers.map(user => {
        const patients = user.patients || [];
        
        console.log(`Processing user ${user.id} (${user.username}) with ${patients.length} patients`);
        
        // Count screenings directly from patients (they're nested in patient objects)
        let diabetesCount = 0;
        let hypertensionCount = 0;
        let followUpCount = 0;
        
        patients.forEach(patient => {
          // Count diabetes screenings
          const diabetesScreenings = patient.diabetes_screenings || [];
          diabetesCount += diabetesScreenings.length;
          
          // Count hypertension screenings
          const hypertensionScreenings = patient.hypertension_screenings || [];
          hypertensionCount += hypertensionScreenings.length;
          
          // Count monitoring visits (follow-ups)
          const monitoringVisits = patient.monitoring_visits || [];
          followUpCount += monitoringVisits.length;
          
          if (user.id === 88 && (diabetesScreenings.length > 0 || hypertensionScreenings.length > 0 || monitoringVisits.length > 0)) {
            console.log(`User 88 - Patient ${patient.id}: Diabetes=${diabetesScreenings.length}, Hypertension=${hypertensionScreenings.length}, Follow-ups=${monitoringVisits.length}`);
          }
        });
        
        console.log(`User ${user.id} totals: Diabetes=${diabetesCount}, Hypertension=${hypertensionCount}, Follow-ups=${followUpCount}`);

        // Calculate total payments for this user
        // Match payments by user_name with user's names or username
        const userName = user.username;
        const firstName = user.firstName || '';
        const lastName = user.lastName || '';
        const fullName = `${firstName} ${lastName}`.trim();
        
        const userPayments = allPayments.filter(payment => {
          if (!payment.attributes && !payment.user_name) return false;
          
          const paymentUserName = payment.attributes?.user_name || payment.user_name;
          if (!paymentUserName) return false;
          
          // Match by username, full name, or individual names
          return paymentUserName.toLowerCase() === userName?.toLowerCase() ||
                 paymentUserName.toLowerCase() === fullName.toLowerCase() ||
                 paymentUserName.toLowerCase().includes(firstName.toLowerCase()) ||
                 paymentUserName.toLowerCase().includes(lastName.toLowerCase());
        });

        const totalPayments = userPayments.reduce((sum, payment) => {
          const amount = payment.attributes?.amount || payment.amount || 0;
          return sum + parseFloat(amount);
        }, 0);

        console.log(`User ${userName} (${fullName}) has ${userPayments.length} payments totaling ${totalPayments} UGX`);

        // Count login logs for this user
        const userLoginLogs = allLoginLogs.filter(log => {
          const logUserId = log.attributes?.user_id || log.user_id;
          return logUserId === user.id;
        });

        return {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: fullName || user.username || 'N/A',
          patientCount: patients.length,
          diabetesCount: diabetesCount,
          hypertensionCount: hypertensionCount,
          followUpCount: followUpCount,
          paymentCount: userPayments.length,
          totalPayments: totalPayments,
          loginCount: userLoginLogs.length,
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
  const totalDiabetes = users.reduce((sum, user) => sum + (user.diabetesCount || 0), 0);
  const totalHypertension = users.reduce((sum, user) => sum + (user.hypertensionCount || 0), 0);
  const totalFollowUps = users.reduce((sum, user) => sum + (user.followUpCount || 0), 0);
  const totalLogins = users.reduce((sum, user) => sum + (user.loginCount || 0), 0);
  const totalPayments = users.reduce((sum, user) => sum + (user.totalPayments || 0), 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          <FontAwesomeIcon icon={faUsers} className="mr-3 text-green-600" />
          MITYANA PROJECT
        </h1>
        <p className="text-gray-600">Overview of Mityana Project CHPs</p>
      </div>

      {/* Mityana Image Banner */}
      <div className="mb-8">
        <img 
          src="/mityana.png" 
          alt="Mityana Project" 
          className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUsers} className="text-3xl text-green-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total CHPs</p>
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
            <FontAwesomeIcon icon={faUser} className="text-3xl text-blue-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Diabetes</p>
              <p className="text-2xl font-bold text-gray-900">{totalDiabetes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUser} className="text-3xl text-red-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Hypertension</p>
              <p className="text-2xl font-bold text-gray-900">{totalHypertension}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUser} className="text-3xl text-purple-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Follow ups</p>
              <p className="text-2xl font-bold text-gray-900">{totalFollowUps}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faSignInAlt} className="text-3xl text-indigo-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Logins</p>
              <p className="text-2xl font-bold text-gray-900">{totalLogins}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCreditCard} className="text-3xl text-green-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900">{totalPayments.toLocaleString()} UGX</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">CHPs, Patient Counts, Diabetes, Hypertension, and Follow-ups</h2>
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
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Diabetes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hypertension
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Follow-ups
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Logins
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payments (UGX)
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
                        {user.diabetesCount || 0}
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: totalDiabetes > 0 ? `${((user.diabetesCount || 0) / Math.max(...users.map(u => u.diabetesCount || 0), 1)) * 100}%` : '0%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">
                        {user.hypertensionCount || 0}
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{
                            width: totalHypertension > 0 ? `${((user.hypertensionCount || 0) / Math.max(...users.map(u => u.hypertensionCount || 0), 1)) * 100}%` : '0%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">
                        {user.followUpCount || 0}
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{
                            width: totalFollowUps > 0 ? `${((user.followUpCount || 0) / Math.max(...users.map(u => u.followUpCount || 0), 1)) * 100}%` : '0%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">
                        {user.loginCount || 0}
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-indigo-500 h-2 rounded-full"
                          style={{
                            width: users.length > 0 ? `${((user.loginCount || 0) / Math.max(...users.map(u => u.loginCount || 0), 1)) * 100}%` : '0%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">
                        {user.totalPayments ? user.totalPayments.toLocaleString() : '0'}
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: totalPayments > 0 ? `${((user.totalPayments || 0) / Math.max(...users.map(u => u.totalPayments || 0), 1)) * 100}%` : '0%'
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
            <p className="text-gray-500">No Mityana Project CHPs found (IDs 197-217, 226, 88)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MityanaPage;