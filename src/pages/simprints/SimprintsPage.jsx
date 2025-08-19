import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUser, faSpinner, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINTS, API_CONFIG } from '../../config/api';

const SimprintsPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching from URL:', API_ENDPOINTS.NEW.USERS);
      console.log('API Config:', API_CONFIG);

      // Fetch users from the new backend
      const usersResponse = await fetch(API_ENDPOINTS.NEW.USERS);
      if (!usersResponse.ok) {
        throw new Error(`Failed to fetch users: ${usersResponse.status}`);
      }
      const usersData = await usersResponse.json();
      console.log('Users data:', usersData);

      // Try different patient endpoints to get patient data
      let allPatientsData = [];
      
      try {
        // Try patients endpoint with populated user data - fetch all pages
        let page = 1;
        let hasMorePages = true;
        
        while (hasMorePages) {
          const patientsResponse = await fetch(`${API_CONFIG.BACKEND_URL_NEW}/api/patients?populate=users_permissions_user&pagination[pageSize]=100&pagination[page]=${page}`);
          if (patientsResponse.ok) {
            const pageData = await patientsResponse.json();
            console.log(`Fetched page ${page}:`, pageData);
            
            if (pageData.data && pageData.data.length > 0) {
              allPatientsData = allPatientsData.concat(pageData.data);
              
              // Check if there are more pages
              if (pageData.meta?.pagination) {
                const { pageCount } = pageData.meta.pagination;
                hasMorePages = page < pageCount;
                page++;
              } else {
                hasMorePages = false;
              }
            } else {
              hasMorePages = false;
            }
          } else {
            hasMorePages = false;
          }
        }
        
        console.log(`Total patients fetched: ${allPatientsData.length}`);
        
      } catch (err) {
        console.warn('patients endpoint failed, trying alternatives...');
        
        // Try all-patients endpoint as alternative
        try {
          const patientsResponse = await fetch(API_ENDPOINTS.NEW.ALL_PATIENTS);
          if (patientsResponse.ok) {
            const patientsData = await patientsResponse.json();
            allPatientsData = patientsData.data || patientsData;
          }
        } catch (err2) {
          console.warn('all-patients endpoint also failed');
        }
      }

      // Count patients per user - handle Strapi data structure
      const userPatientCounts = {};
      
      console.log('All patients data:', allPatientsData);
      
      if (Array.isArray(allPatientsData)) {
        console.log('Processing', allPatientsData.length, 'patients');
        
        allPatientsData.forEach((patient, index) => {
          console.log(`Patient ${index + 1}:`, patient);
          
          // Handle Strapi format with populated user data
          let userId = null;
          if (patient.attributes?.users_permissions_user?.id) {
            userId = patient.attributes.users_permissions_user.id;
            console.log(`Found user ID ${userId} for patient ${patient.attributes?.firstName} ${patient.attributes?.lastName}`);
          } else if (patient.attributes?.user?.data?.id) {
            userId = patient.attributes.user.data.id;
            console.log(`Found user ID ${userId} (via user.data) for patient ${patient.attributes?.firstName}`);
          } else if (patient.attributes?.createdBy?.id) {
            userId = patient.attributes.createdBy.id;
            console.log(`Found user ID ${userId} (via createdBy) for patient ${patient.attributes?.firstName}`);
          } else {
            console.log(`No user found for patient ${patient.attributes?.firstName} ${patient.attributes?.lastName}`);
          }
          
          if (userId) {
            userPatientCounts[userId] = (userPatientCounts[userId] || 0) + 1;
            console.log(`User ${userId} now has ${userPatientCounts[userId]} patients`);
          }
        });
      }
      
      console.log('Final patient counts per user:', userPatientCounts);

      // Combine user data with patient counts
      const usersWithPatientCounts = usersData.map(user => ({
        ...user,
        patientCount: userPatientCounts[user.id] || 0,
        fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'N/A'
      }));

      // Sort by patient count (descending)
      usersWithPatientCounts.sort((a, b) => b.patientCount - a.patientCount);

      setUsers(usersWithPatientCounts);
    } catch (err) {
      console.error('Error fetching data:', err);
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

  const totalPatients = users.reduce((sum, user) => sum + user.patientCount, 0);

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
            <FontAwesomeIcon icon={faUsers} className="text-3xl text-purple-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Patients/User</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.length > 0 ? (totalPatients / users.length).toFixed(1) : '0'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Users and Patient Counts</h2>
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
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
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
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.blocked 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.blocked ? 'Blocked' : 'Active'}
                    </span>
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
