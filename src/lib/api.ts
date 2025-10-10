import axios from 'axios';
import { PhoneNumber, OwnedPhoneNumber, SearchFilters, VoiceConfig, SmsConfig } from '@/types/phone-number';

const api = axios.create({
  baseURL: '/api', // Use relative path for same domain
  headers: {
    'Content-Type': 'application/json',
  },
});

export const phoneNumberApi = {
  // Search available DIDs
  search: async (filters: SearchFilters): Promise<PhoneNumber[]> => {
    const params = new URLSearchParams();
    if (filters.country) params.append('country', filters.country);
    if (filters.areaCode) params.append('area_code', filters.areaCode);
    if (filters.city) params.append('city', filters.city);
    if (filters.pattern) params.append('pattern', filters.pattern);
    if (filters.numberType) params.append('type', filters.numberType);
    
    const response = await api.get(`/dids/search?${params.toString()}`);
    return response.data;
  },

  // Provision new DID
  purchase: async (numberId: string): Promise<OwnedPhoneNumber> => {
    const response = await api.post('/dids', { 
      number: numberId,
      customer_id: 'default', // You may need to handle customer selection
    });
    return response.data;
  },

  // Get customer's DIDs
  getOwned: async (): Promise<OwnedPhoneNumber[]> => {
    const response = await api.get('/dids');
    return response.data;
  },

  // Update DID configuration
  updateConfig: async (
    numberId: string,
    config: {
      friendlyName?: string;
      voiceEnabled?: boolean;
      smsEnabled?: boolean;
      voiceConfig?: VoiceConfig;
      smsConfig?: SmsConfig;
    }
  ): Promise<OwnedPhoneNumber> => {
    const response = await api.put(`/dids/${numberId}`, config);
    return response.data;
  },

  // Release DID
  release: async (numberId: string): Promise<void> => {
    await api.delete(`/dids/${numberId}`);
  },

  // Health check
  health: async (): Promise<any> => {
    const response = await api.get('/health');
    return response.data;
  },

  // Get customers
  getCustomers: async (): Promise<any[]> => {
    const response = await api.get('/customers');
    return response.data;
  },
};

export default api;

