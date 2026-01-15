
import { GoogleGenAI } from "@google/genai";
import { PostData } from "../types.ts";

export const generateAiPost = async (data: PostData): Promise<string> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("API_KEY is missing. Please ensure it is set in your environment variables.");
  }

  // Always initialize fresh to ensure current API key is used
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Create a viral, high-conversion Telegram casino bonus post in Hinglish for:
    Casino: ${data.casinoName}
    Signup Bonus: ${data.signupBonus}
    Wager: ${data.wager}
    Min Withdraw: ${data.minWithdrawal}
    Payment: ${data.paymentType}
    Link: ${data.promoLink}
    Admin/Bot: ${data.contactId}

    REQUIREMENTS:
    - Use Unicode bold (𝗕𝗼𝗹𝗱) for all amounts and casino names.
    - Mix Hindi and English (Hinglish) like "Loot lo jaldi", "Sabko milega".
    - Use lots of emojis like 🤑🔥💰✅.
    - Repeat the link ${data.promoLink} multiple times.
    - Focus on "Instant Payment" and "Verified" trust signals.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a professional Telegram loot channel admin. You speak Hinglish and use bold unicode text to make posts stand out.",
        temperature: 0.9,
      },
    });

    return response.text || "⚠️ AI generated an empty response. Try changing your inputs.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Rethrow to be caught by the UI component
    throw error;
  }
};
