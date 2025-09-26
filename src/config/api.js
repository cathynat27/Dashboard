// API Configuration
export const API_CONFIG = {
  BACKEND_URL_OLD: process.env.REACT_APP_BACKEND_URL_OLD || 'https://mk-be-strapi-production.up.railway.app',
  BACKEND_URL_NEW: process.env.REACT_APP_BACKEND_URL_NEW || 'http://localhost:1337',
};

// API Endpoints
export const API_ENDPOINTS = {
  // Old backend endpoints
  OLD: {
    ALL_PATIENTS: `${API_CONFIG.BACKEND_URL_OLD}/api/all-patients`,
    AUTH_REGISTER: `${API_CONFIG.BACKEND_URL_OLD}/api/auth/local/register`,
    PAYMENTS: `${API_CONFIG.BACKEND_URL_OLD}/api/payments`,
    PAYMENTS_BY_USER: `${API_CONFIG.BACKEND_URL_OLD}/api/payments/user`,
  },
  // New backend endpoints  
  NEW: {
    USERS: `${API_CONFIG.BACKEND_URL_NEW}/api/users`,
    ALL_PATIENTS: `${API_CONFIG.BACKEND_URL_NEW}/api/all-patients`,
    PATIENTS_BASE: `${API_CONFIG.BACKEND_URL_NEW}/api/patients`,
    USERS_WITH_PATIENTS: `${API_CONFIG.BACKEND_URL_NEW}/api/patients/users-with-patients`,
    PATIENTS_BY_USER: `${API_CONFIG.BACKEND_URL_NEW}/api/patients/by-user`,
  }
};
