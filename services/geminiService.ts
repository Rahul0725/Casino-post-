
import { GoogleGenAI } from "@google/genai";
import { PostData } from "../types.ts";

export const generateAiPost = async (data: PostData): Promise<string> => {
  // Always initialize fresh to ensure current API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Create a viral, high-conversion Telegram casino bonus post for:
    Casino: ${data.casinoName}
    Signup Bonus: ${data.signupBonus}
    Wager: ${data.wager}
    Min Withdraw: ${data.minWithdrawal}
    Payment: ${data.paymentType}
    Link: ${data.promoLink}
    Admin/Bot: ${data.contactId}

    REQUIREMENTS:
    1. Language: Hinglish (Hindi written in English script) mixed with English.
    2. Styling: Use Unicode bold (𝗕𝗼𝗹𝗱) for key amounts and titles.
    3. Emojis: Use 🤑, 🔥, 🚀, 💰, ✅, 💥 extensively.
    4. Trust: Include phrases like "Payment Proof Verified", "Loot lo jaldi", "Instant Payout".
    5. Link: Repeat the link "${data.promoLink}" at least 2 times.
    6. Urgency: Add "Limited Time Offer" or "First 500 users only".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: "You are an expert Telegram affiliate marketer and casino promoter who specializes in viral 'loot' posts for an Indian audience. You use Unicode bold characters and Hinglish to drive maximum engagement.",
        temperature: 0.8,
        topP: 0.95,
      },
    });

    return response.text || "⚠️ AI could not generate content. Please check your inputs and try again.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Return a user-friendly error message
    if (error.message?.includes('API_KEY')) return "❌ Invalid API Key. Please contact support.";
    return "❌ Connection Error: AI is currently busy. Please try the standard templates or try again in a moment.";
  }
};
