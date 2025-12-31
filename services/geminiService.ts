
import { GoogleGenAI } from "@google/genai";
import { UserSelections } from "../types";

export class GeminiService {
  async transformImage(base64Image: string, selections: UserSelections): Promise<string> {
    // Always create a fresh instance using process.env.API_KEY as per instructions.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // Nano Banana model for fast, high-quality, automatic transformations.
    const model = 'gemini-2.5-flash-image';
    
    const { clothing, background, photoshoot, expression } = selections;

    const base64Data = base64Image.split(',')[1] || base64Image;

    const enhancedPrompt = `
      NANO BANANA IDENTITY LOCK PROTOCOL:
      Source: Uploaded Photo.
      Target: High-end AI transformation.
      
      TRANSFORMATION PARAMETERS:
      - Identity: STRICTLY preserve the person's facial structure, features, eye color, and unique facial mapping.
      - Clothing: ${clothing?.promptSnippet || 'original clothing'}.
      - Environment: ${background?.promptSnippet || 'original background'}.
      - Lighting & Style: ${photoshoot?.promptSnippet || 'natural lighting'}.
      - Expression: ${expression?.promptSnippet || 'original expression'}.
      
      MANDATORY QUALITY RULES:
      1. This is the SAME person. Do not create a new person.
      2. The face must be clearly visible and in focus.
      3. Ultra-realistic skin textures, no AI artifacts.
      4. Masterpiece studio lighting. High definition.
      5. Output ONLY the resulting transformed image.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: 'image/jpeg',
            },
          },
          {
            text: enhancedPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error('Identity-preserving generation failed.');
  }

  async validateFace(base64Image: string): Promise<boolean> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-flash-preview';
    const base64Data = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: 'image/jpeg',
            },
          },
          {
            text: "Is there a single, clear, front-facing human face visible in this image? Respond with ONLY 'true' or 'false'.",
          },
        ],
      },
    });

    return response.text?.toLowerCase().includes('true') || false;
  }
}

export const geminiService = new GeminiService();
