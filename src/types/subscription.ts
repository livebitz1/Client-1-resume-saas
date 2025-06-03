
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'annual';
  features: string[];
  resumeCredits?: number;
  autoApply: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  status: 'active' | 'canceled' | 'expired';
  resumeCredits?: number;
}
