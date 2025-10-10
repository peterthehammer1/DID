import axios from 'axios';
import { PhoneNumber, OwnedPhoneNumber, SearchFilters, VoiceConfig, SmsConfig } from '@/types/phone-number';

const api = axios.create({
  baseURL: '/api', // Use relative path for same domain
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 75ed96a60a80df0c25ea0e940d4d83f475a67ec7ef975e246006659c66d8e500',
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
    
    // Transform API response to match frontend interface
    return response.data.map((item: any) => ({
      id: item.id.toString(),
      phoneNumber: item.phone_number,
      friendlyNumber: item.phone_number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
      country: item.country,
      region: item.province_state,
      city: item.city,
      areaCode: item.phone_number.substring(0, 3),
      capabilities: {
        voice: true,
        sms: true,
        mms: false,
      },
      monthlyPrice: parseFloat(item.monthly_fee),
      currency: 'CAD',
      numberType: 'local' as const,
    }));
  },

  // Provision new DID
  purchase: async (numberId: string): Promise<OwnedPhoneNumber> => {
    const response = await api.post('/dids', { 
      phone_number: numberId,
      customer_id: 1, // Default test customer
      retell_agent_id: 'agent_0cfd3019a03f3f2e7a1e18c867', // Default agent
      description: `Port This DID - ${numberId}`,
      city: 'Vancouver',
      province_state: 'BC',
      country: 'Canada'
    });
    
    // Transform the response to match frontend interface
    const item = response.data.did || response.data;
    return {
      id: item.id.toString(),
      phoneNumber: item.phone_number,
      friendlyNumber: item.phone_number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
      country: item.country,
      region: item.province_state,
      city: item.city,
      areaCode: item.phone_number.substring(0, 3),
      capabilities: {
        voice: true,
        sms: true,
        mms: false,
      },
      monthlyPrice: parseFloat(item.monthly_fee),
      currency: 'CAD',
      numberType: 'local' as const,
      friendlyName: item.description,
      voiceEnabled: true,
      smsEnabled: true,
      voiceConfig: {
        forwardToWebhook: item.retell_agent_id ? `agent_${item.retell_agent_id}` : undefined,
        voicemailEnabled: false,
      },
      smsConfig: {
        autoReplyEnabled: false,
      },
      purchasedAt: item.created_at,
    };
  },

  // Get customer's DIDs
  getOwned: async (): Promise<OwnedPhoneNumber[]> => {
    const response = await api.get('/dids');
    
    // Transform API response to match frontend interface
    return response.data.map((item: any) => ({
      id: item.id.toString(),
      phoneNumber: item.phone_number,
      friendlyNumber: item.phone_number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
      country: item.country,
      region: item.province_state,
      city: item.city,
      areaCode: item.phone_number.substring(0, 3),
      capabilities: {
        voice: true,
        sms: true,
        mms: false,
      },
      monthlyPrice: parseFloat(item.monthly_fee),
      currency: 'CAD',
      numberType: 'local' as const,
      friendlyName: item.description,
      voiceEnabled: true,
      smsEnabled: true,
      voiceConfig: {
        forwardToWebhook: item.retell_agent_id ? `agent_${item.retell_agent_id}` : undefined,
        voicemailEnabled: false,
      },
      smsConfig: {
        autoReplyEnabled: false,
      },
      purchasedAt: item.created_at,
    }));
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

