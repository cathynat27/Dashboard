// API Connection Test Utility
import { API_ENDPOINTS, API_CONFIG } from '../config/api';

export const testApiConnection = async () => {
  console.log('🔄 Testing API connections...');
  console.log('Backend URL:', API_CONFIG.BACKEND_URL_NEW);
  
  const tests = [
    { name: 'Users Endpoint', url: API_ENDPOINTS.NEW.USERS },
    { name: 'Patients Sample', url: `${API_CONFIG.BACKEND_URL_NEW}/api/patients?pagination[pageSize]=1` },
  ];
  
  for (const test of tests) {
    try {
      const startTime = performance.now();
      const response = await fetch(test.url);
      const endTime = performance.now();
      
      if (response.ok) {
        console.log(`✅ ${test.name}: OK (${(endTime - startTime).toFixed(0)}ms)`);
      } else {
        console.log(`❌ ${test.name}: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ${error.message}`);
    }
  }
};