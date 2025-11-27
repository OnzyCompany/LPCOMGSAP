import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ImageSize } from "../types";

// Initialize the Gemini AI client
// The API key is injected via process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Sends a message to the chatbot using gemini-3-pro-preview
 */
export const sendMessageToChat = async (history: { role: string; parts: { text: string }[] }[], message: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      history: history,
      config: {
        systemInstruction: "You are Lumina, a helpful AI assistant for a premium web design agency. You are knowledgeable about web development, 3D design, and digital marketing. Be concise, professional, and friendly.",
      },
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "An error occurred while connecting to the AI.";
  }
};

/**
 * Generates an image using gemini-3-pro-image-preview
 */
export const generateImage = async (prompt: string, size: ImageSize): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          imageSize: size,
          aspectRatio: "1:1",
        }
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};

/**
 * Fast text generation using gemini-flash-lite-latest
 */
export const fastGenerate = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: prompt,
    });
    return response.text || "";
  } catch (error) {
    console.error("Fast Gen Error:", error);
    return "";
  }
};
