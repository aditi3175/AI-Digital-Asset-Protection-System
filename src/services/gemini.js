import { GoogleGenerativeAI } from '@google/generative-ai';

const getGeminiClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return null;
  }

  return new GoogleGenerativeAI(apiKey);
};

/**
 * Generate a short explanation for a detection result using Gemini.
 * @param {{ similarity: number, type: string, source: string }} result
 * @returns {Promise<string>} A 2–3 sentence explanation.
 */
export async function generateExplanation(result) {
  const client = getGeminiClient();

  if (!client) {
    throw new Error('API key not configured. Add your Gemini key to the .env file.');
  }

  const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `You are an AI digital asset protection analyst. A user uploaded an image and the system returned these detection results:

- Similarity score: ${result.similarity}%
- Detection type: ${result.type}
- Source: ${result.source}

Write a short, professional explanation (2-3 sentences) of what this result means for the user. Explain whether their asset appears original or potentially modified/copied, and what the similarity percentage indicates. Be concise and direct.`;

  try {
    const response = await model.generateContent(prompt);
    return response.response.text();
  } catch (err) {
    // Handle rate limiting (429)
    if (err?.status === 429 || err?.message?.includes('429') || err?.message?.includes('quota')) {
      throw new Error('Gemini API rate limit reached. Please wait a minute and try again.');
    }
    // Handle auth errors
    if (err?.status === 401 || err?.status === 403 || err?.message?.includes('API key')) {
      throw new Error('Invalid Gemini API key. Please check your .env file.');
    }
    // Generic network/other errors
    throw new Error('Could not generate AI explanation. Please try again later.');
  }
}
