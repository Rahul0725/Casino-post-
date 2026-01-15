
import { Template, PostData } from './types.ts';
import { toBold } from './utils/unicode.ts';

const getVal = (val: string, fallback: string) => val.trim() || fallback;

export const TEMPLATES: Template[] = [
  {
    id: 'aggressive-1',
    name: 'Aggressive Promo',
    category: 'Aggressive',
    content: (d: PostData) => `
${toBold(getVal(d.casinoName, 'CASINO NAME').toUpperCase())} 🔥🔥

🎁 ${toBold('Signup Bonus')} :- ${getVal(d.signupBonus, '₹500')}
🔁 ${toBold('Wager')} :- ${getVal(d.wager, '1x')}
💸 ${toBold('Min Withdraw')} :- ${getVal(d.minWithdrawal, '₹500')}

➡️ ${toBold('Link')} :-
${getVal(d.promoLink, '@OffersGod')}
${getVal(d.promoLink, '@OffersGod')}

✅ ${toBold('Payment Verified')}
🔥 ${toBold('Instant Bonus Add')}
👨‍💻 ${toBold('Support')} :- ${getVal(d.contactId, '@Admin')}
`.trim()
  },
  {
    id: 'loot-1',
    name: 'Free Loot Hindi',
    category: 'Hindi',
    content: (d: PostData) => `
${toBold('NEW LOOT AAGAYI')} 💥💥

${toBold(getVal(d.casinoName, 'NEW CASINO'))} Me Sign-up par ${getVal(d.signupBonus, '₹500')} mil raha hai!
Koi invest mat karna, sirf loot lo! 💸

🔗 ${toBold('Loot Link')}:-
${getVal(d.promoLink, '@OffersGod')}
${getVal(d.promoLink, '@OffersGod')}

✅ ${toBold('Payment Verified Hai')}
🚀 ${toBold('Instant Withdrawal')}

Join Bot for more: ${getVal(d.contactId, '@Admin')}
`.trim()
  },
  {
    id: 'launch-1',
    name: 'New Casino Launch',
    category: 'New',
    content: (d: PostData) => `
📢 ${toBold('BRAND NEW CASINO LAUNCHED')}

${toBold('Name')}: ${getVal(d.casinoName, 'CASINO NAME')}
${toBold('Bonus')}: ${getVal(d.signupBonus, '₹500')} (Signup)
${toBold('Wager')}: ${getVal(d.wager, '1x')} Only
${toBold('Withdraw')}: ${getVal(d.minWithdrawal, '₹500')}

🔗 ${toBold('Registration Link')}:
${getVal(d.promoLink, '@OffersGod')}
${getVal(d.promoLink, '@OffersGod')}

💥 ${toBold('Hurry Up - First 1000 Users Only')} 💥
`.trim()
  },
  {
    id: 'vip-1',
    name: 'VIP High Roller',
    category: 'VIP',
    content: (d: PostData) => `
💎 ${toBold('VIP EXCLUSIVE OFFER')} 💎

👑 ${toBold(getVal(d.casinoName, 'CASINO NAME'))}
💰 ${toBold('Bonus')}: ${getVal(d.signupBonus, '₹1000')}
⚡️ ${toBold('Withdrawal')}: ${getVal(d.paymentType, 'Verified')}
🔥 ${toBold('Min Cashout')}: ${getVal(d.minWithdrawal, '₹500')}

🛡 ${toBold('Trusted & Verified Platform')}

➡️ ${toBold('Direct Access')}:
${getVal(d.promoLink, '@OffersGod')}
${getVal(d.promoLink, '@OffersGod')}

Contact VIP Manager: ${getVal(d.contactId, '@Admin')}
`.trim()
  },
  {
    id: 'instant-1',
    name: 'Instant Withdrawal King',
    category: 'Trust',
    content: (d: PostData) => `
⚡️ ${toBold('INSTANT WITHDRAWAL KING')} ⚡️

💸 ${toBold('Casino')}: ${getVal(d.casinoName, 'CASINO')}
💸 ${toBold('Sign-up')}: ${getVal(d.signupBonus, '₹500')}
💸 ${toBold('Payment')}: ${getVal(d.paymentType, 'Verified')}

${toBold('100% Guaranteed Payouts')} ✅

🔗 ${toBold('Link')}:
${getVal(d.promoLink, '@OffersGod')}
${getVal(d.promoLink, '@OffersGod')}

🔥 ${toBold('Don\'t Miss This Opportunity')} 🔥
`.trim()
  },
  {
    id: 'hindi-loot-2',
    name: 'Badi Loot Offer',
    category: 'Hindi',
    content: (d: PostData) => `
🤑 ${toBold('BADI LOOT AA GAYI BHAIYO')} 🤑

${toBold('Casino Name')} :- ${getVal(d.casinoName, 'NEW CASINO')}
${toBold('Sabko Milega')} :- ${getVal(d.signupBonus, '₹500')}
${toBold('Wager Sirf')} :- ${getVal(d.wager, '1x')}
${toBold('Nikal Lo Jaldi')} :- ${getVal(d.minWithdrawal, '₹500')}

➡️ ${toBold('Link')}:
${getVal(d.promoLink, '@OffersGod')}

✅ ${toBold('Payment Proof ke liye Group Check Karein')}
`.trim()
  }
];

// Filling remaining templates to ensure a robust builder experience
for(let i=7; i<=30; i++) {
  TEMPLATES.push({
    id: `temp-${i}`,
    name: `Template Variation ${i}`,
    category: i % 3 === 0 ? 'VIP' : (i % 2 === 0 ? 'Aggressive' : 'Loot'),
    content: (d: PostData) => `
🔥 ${toBold('BONUS OFFER #' + i)} 🔥
${toBold(getVal(d.casinoName, 'BRAND NAME'))}

💰 ${getVal(d.signupBonus, '₹500')} FREE LOOT
🔗 ${getVal(d.promoLink, '@OffersGod')}
🔗 ${getVal(d.promoLink, '@OffersGod')}

✅ ${toBold('Verified & Tested')}
`.trim()
  });
}
