import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUser, faSpinner, faExclamationTriangle, faCreditCard, faSignInAlt, faTimes, faClock, faHeartbeat, faStethoscope, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINTS, API_CONFIG } from '../../config/api';

const MityanaPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userLoginLogs, setUserLoginLogs] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [showPatientsModal, setShowPatientsModal] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [showReferralsModal, setShowReferralsModal] = useState(false);
  const [selectedReferrals, setSelectedReferrals] = useState([]);

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

      // Fetch patients, payments, and user login logs in parallel with timeout
      // Note: Screening data (diabetes, hypertension, monitoring) is already nested in patient objects
      const fetchWithTimeout = (url, timeout = 30000) => {
        return Promise.race([
          fetch(url),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), timeout)
          )
        ]);
      };

      const [patientsResponse, paymentsResponse, loginLogsResponse] = await Promise.all([
        fetchWithTimeout(API_ENDPOINTS.OLD.ALL_PATIENTS, 60000).catch(err => {
          console.error('Patients fetch error:', err);
          return null;
        }),
        fetchWithTimeout(API_ENDPOINTS.OLD.PAYMENTS).catch(err => {
          console.error('Payments fetch error:', err);
          return null;
        }),
        fetchWithTimeout(`${API_CONFIG.BACKEND_URL_OLD}/api/user-login-logs?pagination[limit]=10000`).catch(err => {
          console.error('Login logs fetch error:', err);
          return null;
        })
      ]);
      
      if (!patientsResponse || !patientsResponse.ok) {
        throw new Error(`Failed to fetch patients: ${patientsResponse ? patientsResponse.status : 'Network error or timeout'}`);
      }

      const allUsersData = await patientsResponse.json();
      console.log('Total users from backend:', allUsersData.length);
      console.log('Sample user structure:', allUsersData[0]);
      if (allUsersData[0]?.patients?.length > 0) {
        console.log('Sample patient structure:', allUsersData[0].patients[0]);
      }

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
      console.log('Starting to process users...');

      // Process each user to get patient counts, diabetes, hypertension, follow-ups, and payments
      const processedUsers = mityanaUsers.map(user => {
        const patients = user.patients || [];
        
        console.log(`Processing user ${user.id} (${user.username}) with ${patients.length} patients`);
        
        // Count screenings directly from patients (they're nested in patient objects)
        let diabetesCount = 0;
        let hypertensionCount = 0;
        let followUpCount = 0;
        let referralCount = 0;
        let renalHistoryCount = 0;
        let renalMonitoringCount = 0;
        let rftCount = 0;
        
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
          
          // Count renal health records
          const renalHistories = patient.renal_histories || [];
          renalHistoryCount += renalHistories.length;
          
          const monitorings = patient.monitorings || [];
          renalMonitoringCount += monitorings.length;
          
          const rfts = patient.rfts || [];
          rftCount += rfts.length;
          
          // Count referrals - check for 'Yes' in isReferred field
          if (patient.isReferred === 'Yes' || patient.isReferred === 'yes' || patient.isReferred === true) {
            referralCount++;
            if (user.id === 88) {
              console.log(`User 88 - Referral found: Patient ${patient.id} (${patient.firstName} ${patient.lastName}), isReferred: ${patient.isReferred}`);
            }
          }
          
          if (user.id === 88 && (diabetesScreenings.length > 0 || hypertensionScreenings.length > 0 || monitoringVisits.length > 0)) {
            console.log(`User 88 - Patient ${patient.id}: Diabetes=${diabetesScreenings.length}, Hypertension=${hypertensionScreenings.length}, Follow-ups=${monitoringVisits.length}, isReferred=${patient.isReferred}`);
          }
        });
        
        console.log(`User ${user.id} totals: Diabetes=${diabetesCount}, Hypertension=${hypertensionCount}, Follow-ups=${followUpCount}, Referrals=${referralCount}, Renal=${renalHistoryCount}, Monitoring=${renalMonitoringCount}, RFT=${rftCount}`);

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
          referralCount: referralCount,
          renalHistoryCount: renalHistoryCount,
          renalMonitoringCount: renalMonitoringCount,
          rftCount: rftCount,
          paymentCount: userPayments.length,
          totalPayments: totalPayments,
          loginCount: userLoginLogs.length,
          patients: patients
        };
      });

      // Sort by patient count (descending)
      processedUsers.sort((a, b) => b.patientCount - a.patientCount);

      console.log('Finished processing users, setting state...');
      setUsers(processedUsers);
      
      const endTime = performance.now();
      console.log(`✅ MITYANA PROJECT data loaded successfully in ${((endTime - startTime) / 1000).toFixed(2)} seconds`);
      console.log('Final processed users:', processedUsers.length);
      
    } catch (err) {
      console.error('Error fetching Mityana data:', err);
      setError(err.message);
    } finally {
      console.log('Setting loading to false...');
      setLoading(false);
    }
  };

  const handleLoginClick = async (user) => {
    setSelectedUser(user);
    setShowLoginModal(true);
    setLoadingLogs(true);
    
    try {
      // Fetch login logs for this specific user
      const response = await fetch(
        `${API_CONFIG.BACKEND_URL_OLD}/api/user-login-logs?filters[user_id][$eq]=${user.id}&sort=login_time:desc&pagination[limit]=1000`
      );
      
      if (response.ok) {
        const data = await response.json();
        const logs = data.data || [];
        setUserLoginLogs(logs);
      } else {
        console.error('Failed to fetch login logs');
        setUserLoginLogs([]);
      }
    } catch (err) {
      console.error('Error fetching login logs:', err);
      setUserLoginLogs([]);
    } finally {
      setLoadingLogs(false);
    }
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
    setSelectedUser(null);
    setUserLoginLogs([]);
  };

  const handlePatientsClick = (user) => {
    setSelectedUser(user);
    setSelectedPatients(user.patients || []);
    setShowPatientsModal(true);
  };

  const closePatientsModal = () => {
    setShowPatientsModal(false);
    setSelectedUser(null);
    setSelectedPatients([]);
  };

  const handleReferralsClick = (user) => {
    setSelectedUser(user);
    // Filter patients who are referred
    const referredPatients = (user.patients || []).filter(
      patient => patient.isReferred === 'Yes' || patient.isReferred === 'yes' || patient.isReferred === true
    );
    setSelectedReferrals(referredPatients);
    setShowReferralsModal(true);
  };

  const closeReferralsModal = () => {
    setShowReferralsModal(false);
    setSelectedUser(null);
    setSelectedReferrals([]);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
  const totalReferrals = users.reduce((sum, user) => sum + (user.referralCount || 0), 0);
  const totalRenalScreening = users.reduce((sum, user) => sum + (user.renalHistoryCount || 0), 0);
  const totalRenalMonitoring = users.reduce((sum, user) => sum + (user.renalMonitoringCount || 0), 0);
  const totalRFTs = users.reduce((sum, user) => sum + (user.rftCount || 0), 0);
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
            <FontAwesomeIcon icon={faUser} className="text-3xl text-teal-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Renal Screening</p>
              <p className="text-2xl font-bold text-gray-900">{totalRenalScreening}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUser} className="text-3xl text-cyan-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Renal Monitoring</p>
              <p className="text-2xl font-bold text-gray-900">{totalRenalMonitoring}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUser} className="text-3xl text-sky-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total RFTs</p>
              <p className="text-2xl font-bold text-gray-900">{totalRFTs}</p>
            </div>
          </div>
        </div>

        <div 
          className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => {
            // Collect all referred patients from all users
            const allReferrals = users.reduce((acc, user) => {
              const referredPatients = (user.patients || [])
                .filter(patient => patient.isReferred === 'Yes' || patient.isReferred === 'yes' || patient.isReferred === true)
                .map(patient => ({
                  ...patient,
                  chpName: user.fullName || user.username,
                  chpUsername: user.username
                }));
              return [...acc, ...referredPatients];
            }, []);
            setSelectedUser({ fullName: 'All CHPs', username: 'all-chps' });
            setSelectedReferrals(allReferrals);
            setShowReferralsModal(true);
          }}
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faHandshake} className="text-3xl text-orange-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Referrals</p>
              <p className="text-2xl font-bold text-gray-900">{totalReferrals}</p>
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
                  Phone Number
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
                  Renal Screening
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Renal Monitoring
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  RFTs
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
                    <div 
                      className="flex items-center cursor-pointer hover:bg-green-50 rounded-lg p-2 -m-2 transition-colors"
                      onClick={() => handlePatientsClick(user)}
                      title="Click to view patients"
                    >
                      <span className="text-sm font-medium text-green-600 mr-2 hover:text-green-800">
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
                        {user.renalHistoryCount || 0}
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-teal-500 h-2 rounded-full"
                          style={{
                            width: users.length > 0 ? `${((user.renalHistoryCount || 0) / Math.max(...users.map(u => u.renalHistoryCount || 0), 1)) * 100}%` : '0%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">
                        {user.renalMonitoringCount || 0}
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-cyan-500 h-2 rounded-full"
                          style={{
                            width: users.length > 0 ? `${((user.renalMonitoringCount || 0) / Math.max(...users.map(u => u.renalMonitoringCount || 0), 1)) * 100}%` : '0%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">
                        {user.rftCount || 0}
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-sky-500 h-2 rounded-full"
                          style={{
                            width: users.length > 0 ? `${((user.rftCount || 0) / Math.max(...users.map(u => u.rftCount || 0), 1)) * 100}%` : '0%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div 
                      className="flex items-center cursor-pointer hover:bg-indigo-50 rounded-lg p-2 -m-2 transition-colors"
                      onClick={() => handleLoginClick(user)}
                      title="Click to view login details"
                    >
                      <span className="text-sm font-medium text-indigo-600 mr-2 hover:text-indigo-800">
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

      {/* Login Details Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-indigo-600 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faSignInAlt} className="text-2xl mr-3" />
                <div>
                  <h2 className="text-xl font-bold">Login History</h2>
                  <p className="text-indigo-100 text-sm">
                    {selectedUser?.fullName || selectedUser?.username || 'User'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeLoginModal}
                className="text-white hover:text-indigo-200 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="text-2xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {loadingLogs ? (
                <div className="text-center py-8">
                  <FontAwesomeIcon icon={faSpinner} className="text-3xl text-indigo-600 animate-spin mb-4" />
                  <p className="text-gray-600">Loading login history...</p>
                </div>
              ) : userLoginLogs.length > 0 ? (
                <div>
                  <div className="mb-4 p-4 bg-indigo-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Total Logins:</strong> {userLoginLogs.length}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      <strong>Phone Number:</strong> {selectedUser?.username}
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            #
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Login Time
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone Number
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {userLoginLogs.map((log, index) => {
                          const logData = log.attributes || log;
                          return (
                            <tr key={log.id || index} className="hover:bg-gray-50">
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {index + 1}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                <div className="flex items-center">
                                  <FontAwesomeIcon icon={faClock} className="text-indigo-600 mr-2" />
                                  {formatDateTime(logData.login_time)}
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                {logData.username || 'N/A'}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                {logData.user_name || 'N/A'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FontAwesomeIcon icon={faSignInAlt} className="text-4xl text-gray-400 mb-4" />
                  <p className="text-gray-500">No login history found for this user</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button
                onClick={closeLoginModal}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Patients Details Modal */}
      {showPatientsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-green-600 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUsers} className="text-2xl mr-3" />
                <div>
                  <h2 className="text-xl font-bold">Patients List</h2>
                  <p className="text-green-100 text-sm">
                    {selectedUser?.fullName || selectedUser?.username || 'User'} - {selectedPatients.length} Patient{selectedPatients.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <button
                onClick={closePatientsModal}
                className="text-white hover:text-green-200 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="text-2xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {selectedPatients.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          #
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Village
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Gender
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Age
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <FontAwesomeIcon icon={faStethoscope} className="mr-1 text-blue-600" />
                          Diabetes
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <FontAwesomeIcon icon={faHeartbeat} className="mr-1 text-red-600" />
                          Hypertension
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Follow-ups
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedPatients.map((patient, index) => {
                        const calculateAge = (dob) => {
                          if (!dob) return 'N/A';
                          const birthDate = new Date(dob);
                          const today = new Date();
                          let age = today.getFullYear() - birthDate.getFullYear();
                          const monthDiff = today.getMonth() - birthDate.getMonth();
                          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                            age--;
                          }
                          return age;
                        };

                        const diabetesCount = (patient.diabetes_screenings || []).length;
                        const hypertensionCount = (patient.hypertension_screenings || []).length;
                        const followUpCount = (patient.monitoring_visits || []).length;

                        return (
                          <tr key={patient.id || index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {patient.firstName} {patient.lastName}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                              {patient.phoneNumber || 'N/A'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                              {patient.village || 'N/A'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                              {patient.sex || 'N/A'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                              {calculateAge(patient.dateOfBirth)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                diabetesCount > 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {diabetesCount}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                hypertensionCount > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {hypertensionCount}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                followUpCount > 0 ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {followUpCount}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FontAwesomeIcon icon={faUsers} className="text-4xl text-gray-400 mb-4" />
                  <p className="text-gray-500">No patients found for this user</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button
                onClick={closePatientsModal}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Referrals Modal */}
      {showReferralsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-orange-600 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faHandshake} className="text-2xl mr-3" />
                <div>
                  <h2 className="text-xl font-bold">Referrals</h2>
                  <p className="text-orange-100 text-sm">
                    {selectedUser?.fullName || selectedUser?.username || 'User'} - {selectedReferrals.length} Referral{selectedReferrals.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <button
                onClick={closeReferralsModal}
                className="text-white hover:text-orange-200 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="text-2xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {selectedReferrals.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          #
                        </th>
                        {selectedUser?.username === 'all-chps' && (
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            CHP
                          </th>
                        )}
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Patient Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Village
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Gender
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Age
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Referred By
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <FontAwesomeIcon icon={faStethoscope} className="mr-1 text-blue-600" />
                          Diabetes
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <FontAwesomeIcon icon={faHeartbeat} className="mr-1 text-red-600" />
                          Hypertension
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedReferrals.map((patient, index) => {
                        const calculateAge = (dob) => {
                          if (!dob) return 'N/A';
                          const birthDate = new Date(dob);
                          const today = new Date();
                          let age = today.getFullYear() - birthDate.getFullYear();
                          const monthDiff = today.getMonth() - birthDate.getMonth();
                          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                            age--;
                          }
                          return age;
                        };

                        const diabetesCount = (patient.diabetes_screenings || []).length;
                        const hypertensionCount = (patient.hypertension_screenings || []).length;

                        return (
                          <tr key={patient.id || index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {index + 1}
                            </td>
                            {selectedUser?.username === 'all-chps' && (
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">
                                {patient.chpName}
                              </td>
                            )}
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {patient.firstName} {patient.lastName}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                              {patient.phoneNumber || 'N/A'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                              {patient.village || 'N/A'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                              {patient.sex || 'N/A'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                              {calculateAge(patient.dateOfBirth)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-orange-600">
                              {patient.referredBy || 'N/A'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                diabetesCount > 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {diabetesCount}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                hypertensionCount > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {hypertensionCount}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FontAwesomeIcon icon={faHandshake} className="text-4xl text-gray-400 mb-4" />
                  <p className="text-gray-500">No referrals found</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button
                onClick={closeReferralsModal}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MityanaPage;