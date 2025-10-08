import axios from 'axios';
import { PhoneNumber, OwnedPhoneNumber, SearchFilters, VoiceConfig, SmsConfig } from '@/types/phone-number';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const phoneNumberApi = {
  search: async (filters: SearchFilters): Promise<PhoneNumber[]> => {
    const params = new URLSearchParams();
    if (filters.country) params.append('country', filters.country);
    if (filters.areaCode) params.append('areaCode', filters.areaCode);
    if (filters.city) params.append('city', filters.city);
    if (filters.pattern) params.append('pattern', filters.pattern);
    if (filters.numberType) params.append('numberType', filters.numberType);
    
    const response = await api.get<PhoneNumber[]>(`/numbers/search?${params.toString()}`);
    return response.data;
  },

  purchase: async (numberId: string): Promise<OwnedPhoneNumber> => {
    const response = await api.post<OwnedPhoneNumber>('/numbers/purchase', { numberId });
    return response.data;
  },

  getOwned: async (): Promise<OwnedPhoneNumber[]> => {
    const response = await api.get<OwnedPhoneNumber[]>('/numbers/owned');
    return response.data;
  },

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
    const response = await api.put<OwnedPhoneNumber>(`/numbers/${numberId}/config`, config);
    return response.data;
  },

  release: async (numberId: string): Promise<void> => {
    await api.delete(`/numbers/${numberId}`);
  },
};

export default api;

