
export interface PostData {
  casinoName: string;
  signupBonus: string;
  wager: string;
  minWithdrawal: string;
  paymentType: string;
  promoLink: string;
  contactId: string;
}

export interface Template {
  id: string;
  name: string;
  category: 'Aggressive' | 'Hindi' | 'Loot' | 'VIP' | 'New' | 'Trust';
  content: (data: PostData) => string;
  isPremium?: boolean;
}

export enum View {
  HOME = 'home',
  BUILDER = 'builder',
  STYLES = 'styles',
  AI = 'ai',
  PREMIUM = 'premium'
}
