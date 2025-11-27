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
        systemInstruction: "Você é a Onzy, uma assistente de IA útil para uma agência de web design premium e futurista. Você tem conhecimento sobre desenvolvimento web, design 3D, WebGL e marketing digital. Seja conciso, profissional, criativo e amigável. Responda sempre em Português do Brasil.",
      },
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Desculpe, não consegui gerar uma resposta.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Ocorreu um erro ao conectar com a IA.";
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