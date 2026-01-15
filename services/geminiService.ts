
import { GoogleGenAI } from "@google/genai";
import { PostData } from "../types";

export const generateAiPost = async (data: PostData): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `
    Generate a high-conversion Telegram casino bonus post in Hinglish based on these details:
    - Casino Name: ${data.casinoName}
    - Signup Bonus: ${data.signupBonus}
    - Wager: ${data.wager}
    - Min Withdrawal: ${data.minWithdrawal}
    - Payment Type: ${data.paymentType}
    - Link: ${data.promoLink}
    - Contact: ${data.contactId}

    Rules:
    - Use Unicode bold characters (like 𝗕𝗼𝗹𝗱) for key terms.
    - Use plenty of relevant emojis (🔥, 💰, 🚀, 💎).
    - Repeat the link at least twice for trust.
    - Keep it optimized for Telegram (no markdown that breaks, use plain unicode formatting).
    - Include a "trust signal" like "Payment Verified".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Failed to generate AI content.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI service. Please try manually.";
  }
};
