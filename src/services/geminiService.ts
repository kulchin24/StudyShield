import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Source } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Creates a new chat instance with the appropriate model and system instructions.
 * @returns A Chat instance.
 */
export const createFactCheckChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      tools: [{ googleSearch: {} }],
      systemInstruction: 'You are a helpful AI assistant, the Study Shield Agent, an expert in identifying scams related to studying in Japan, specifically for an audience from India. Your responses should be factual, clear, and aimed at helping Indian students navigate the application process safely. When discussing financial matters, assume the user is dealing with Indian Rupees (INR) and mention common payment methods in India. Use the provided search results to ground your answers and always cite your sources when possible.'
    },
  });
};

export interface ChatResponse {
  text: string;
  sources: Source[];
}

/**
 * Sends a message to an existing chat instance.
 * @param chat The Chat instance to send the message to.
 * @param message The user's message text.
 * @returns A promise that resolves to a ChatResponse object.
 */
export const sendMessage = async (chat: Chat, message: string): Promise<ChatResponse> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    
    const text = response.text;
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;

    let sources: Source[] = [];
    if (groundingMetadata?.groundingChunks) {
      sources = groundingMetadata.groundingChunks
        .map((chunk: any) => ({
          uri: chunk?.web?.uri,
          title: chunk?.web?.title,
        }))
        .filter((source): source is Source => !!source.uri && !!source.title);
    }

    return { text, sources };
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key') || error.message.includes('permission denied')) {
            throw new Error('The AI analysis service is temporarily unavailable due to a configuration issue. Please try again later.');
        }
        throw new Error('The AI analysis failed. Please check your internet connection and try again.');
    }
    throw new Error("An unexpected error occurred during the AI analysis.");
  }
};
