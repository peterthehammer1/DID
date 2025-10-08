export type NumberType = 'local' | 'toll-free' | 'mobile';

export interface PhoneNumberCapabilities {
  voice: boolean;
  sms: boolean;
  mms: boolean;
}

export interface PhoneNumber {
  id: string;
  phoneNumber: string; // E.164 format
  friendlyNumber: string; // Human-readable format
  country: string;
  region: string;
  city: string;
  areaCode: string;
  capabilities: PhoneNumberCapabilities;
  monthlyPrice: number;
  currency: string;
  numberType: NumberType;
}

export interface OwnedPhoneNumber extends PhoneNumber {
  friendlyName?: string;
  voiceEnabled: boolean;
  smsEnabled: boolean;
  voiceConfig?: VoiceConfig;
  smsConfig?: SmsConfig;
  purchasedAt: string;
}

export interface VoiceConfig {
  forwardToSip?: string;
  forwardToWebhook?: string;
  voicemailEnabled: boolean;
  voicemailGreeting?: string;
}

export interface SmsConfig {
  webhookUrl?: string;
  autoReplyEnabled: boolean;
  autoReplyMessage?: string;
}

export interface SearchFilters {
  country?: string;
  areaCode?: string;
  city?: string;
  pattern?: string;
  numberType?: NumberType;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}

