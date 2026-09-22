import { Plan } from './types';

export const DEFAULT_TRACKING_ID = 'FBI-INTL-0926-874512';
export const DEFAULT_VERIFICATION_NUMBER = 'VCN-473829';

export const TRACKING_AGENT = {
  name: 'Robert Harrington',
  role: 'Live Tracking Agent',
  phone: '+1 276-694-9259',
  messagingApp: 'Signal',
  signalUrl: 'https://signal.me/#eu/weWmgtMv2ESqaXDS_KmehSCu4Q1mfzP5w5C003eM9-jlBMMcvFhIUoyEJ35OKQ-7'
};

export const PLANS: Plan[] = [
  {
    id: 'fast',
    title: 'Fast Tracking',
    durationMs: 3 * 24 * 60 * 60 * 1000,
    durationLabel: '3 days',
    priceLabel: '$320'
  },
  {
    id: 'medium',
    title: 'Medium Tracking',
    durationMs: 10 * 24 * 60 * 60 * 1000,
    durationLabel: '1–2 weeks',
    priceLabel: '$220'
  },
  {
    id: 'slow',
    title: 'Slow Tracking',
    durationMs: 21 * 24 * 60 * 60 * 1000,
    durationLabel: '2–4 weeks',
    priceLabel: '$120'
  }
];
