import { PhoneNumber, OwnedPhoneNumber, SearchFilters } from '@/types/phone-number';

// Mock data for testing without a real API
const mockAvailableNumbers: PhoneNumber[] = [
  {
    id: '1',
    phoneNumber: '+14155551234',
    friendlyNumber: '+1 (415) 555-1234',
    country: 'US',
    region: 'California',
    city: 'San Francisco',
    areaCode: '415',
    capabilities: { voice: true, sms: true, mms: true },
    monthlyPrice: 1.00,
    currency: 'USD',
    numberType: 'local',
  },
  {
    id: '2',
    phoneNumber: '+14155555555',
    friendlyNumber: '+1 (415) 555-5555',
    country: 'US',
    region: 'California',
    city: 'San Francisco',
    areaCode: '415',
    capabilities: { voice: true, sms: true, mms: false },
    monthlyPrice: 2.50,
    currency: 'USD',
    numberType: 'local',
  },
  {
    id: '3',
    phoneNumber: '+18005551000',
    friendlyNumber: '+1 (800) 555-1000',
    country: 'US',
    region: 'California',
    city: 'San Francisco',
    areaCode: '800',
    capabilities: { voice: true, sms: false, mms: false },
    monthlyPrice: 5.00,
    currency: 'USD',
    numberType: 'toll-free',
  },
  {
    id: '4',
    phoneNumber: '+12125559876',
    friendlyNumber: '+1 (212) 555-9876',
    country: 'US',
    region: 'New York',
    city: 'New York',
    areaCode: '212',
    capabilities: { voice: true, sms: true, mms: true },
    monthlyPrice: 1.50,
    currency: 'USD',
    numberType: 'local',
  },
  {
    id: '5',
    phoneNumber: '+14155552200',
    friendlyNumber: '+1 (415) 555-2200',
    country: 'US',
    region: 'California',
    city: 'San Francisco',
    areaCode: '415',
    capabilities: { voice: true, sms: true, mms: true },
    monthlyPrice: 1.00,
    currency: 'USD',
    numberType: 'local',
  },
  {
    id: '6',
    phoneNumber: '+442071234567',
    friendlyNumber: '+44 20 7123 4567',
    country: 'GB',
    region: 'England',
    city: 'London',
    areaCode: '20',
    capabilities: { voice: true, sms: true, mms: false },
    monthlyPrice: 2.00,
    currency: 'USD',
    numberType: 'local',
  },
  {
    id: '7',
    phoneNumber: '+14165558888',
    friendlyNumber: '+1 (416) 555-8888',
    country: 'CA',
    region: 'Ontario',
    city: 'Toronto',
    areaCode: '416',
    capabilities: { voice: true, sms: true, mms: true },
    monthlyPrice: 1.25,
    currency: 'USD',
    numberType: 'local',
  },
  {
    id: '8',
    phoneNumber: '+18885551234',
    friendlyNumber: '+1 (888) 555-1234',
    country: 'US',
    region: 'California',
    city: 'San Francisco',
    areaCode: '888',
    capabilities: { voice: true, sms: true, mms: false },
    monthlyPrice: 4.00,
    currency: 'USD',
    numberType: 'toll-free',
  },
  {
    id: '9',
    phoneNumber: '+14155550000',
    friendlyNumber: '+1 (415) 555-0000',
    country: 'US',
    region: 'California',
    city: 'San Francisco',
    areaCode: '415',
    capabilities: { voice: true, sms: true, mms: true },
    monthlyPrice: 3.00,
    currency: 'USD',
    numberType: 'local',
  },
  {
    id: '10',
    phoneNumber: '+61285551234',
    friendlyNumber: '+61 2 8555 1234',
    country: 'AU',
    region: 'New South Wales',
    city: 'Sydney',
    areaCode: '2',
    capabilities: { voice: true, sms: true, mms: true },
    monthlyPrice: 2.50,
    currency: 'USD',
    numberType: 'local',
  },
];

let mockOwnedNumbers: OwnedPhoneNumber[] = [];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockPhoneNumberApi = {
  search: async (filters: SearchFilters): Promise<PhoneNumber[]> => {
    await delay(800);
    
    let results = [...mockAvailableNumbers];

    if (filters.country) {
      results = results.filter(n => n.country === filters.country);
    }
    if (filters.areaCode) {
      results = results.filter(n => n.areaCode.includes(filters.areaCode!));
    }
    if (filters.city) {
      results = results.filter(n => 
        n.city.toLowerCase().includes(filters.city!.toLowerCase())
      );
    }
    if (filters.pattern) {
      const pattern = filters.pattern.replace(/\*/g, '.*');
      const regex = new RegExp(pattern, 'i');
      results = results.filter(n => regex.test(n.friendlyNumber));
    }
    if (filters.numberType) {
      results = results.filter(n => n.numberType === filters.numberType);
    }

    // Remove already owned numbers
    const ownedIds = mockOwnedNumbers.map(n => n.id);
    results = results.filter(n => !ownedIds.includes(n.id));

    return results;
  },

  purchase: async (numberId: string): Promise<OwnedPhoneNumber> => {
    await delay(500);
    
    const number = mockAvailableNumbers.find(n => n.id === numberId);
    if (!number) {
      throw new Error('Number not found');
    }

    const ownedNumber: OwnedPhoneNumber = {
      ...number,
      voiceEnabled: true,
      smsEnabled: true,
      purchasedAt: new Date().toISOString(),
    };

    mockOwnedNumbers.push(ownedNumber);
    return ownedNumber;
  },

  getOwned: async (): Promise<OwnedPhoneNumber[]> => {
    await delay(300);
    return [...mockOwnedNumbers];
  },

  updateConfig: async (
    numberId: string,
    config: Partial<OwnedPhoneNumber>
  ): Promise<OwnedPhoneNumber> => {
    await delay(400);
    
    const index = mockOwnedNumbers.findIndex(n => n.id === numberId);
    if (index === -1) {
      throw new Error('Number not found');
    }

    mockOwnedNumbers[index] = {
      ...mockOwnedNumbers[index],
      ...config,
    };

    return mockOwnedNumbers[index];
  },

  release: async (numberId: string): Promise<void> => {
    await delay(400);
    
    mockOwnedNumbers = mockOwnedNumbers.filter(n => n.id !== numberId);
  },
};

// To use mock API in development, update src/lib/api.ts:
// import { mockPhoneNumberApi as phoneNumberApi } from './mock-api';

