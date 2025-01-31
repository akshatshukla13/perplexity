import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Source } from "../types";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY!;
const SEARCH_ENGINE_ID = import.meta.env.VITE_SEARCH_ENGINE_ID!;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY!;

if (!GOOGLE_API_KEY || !SEARCH_ENGINE_ID || !GEMINI_API_KEY) {
  throw new Error("Missing required API keys in environment variables.");
}

export async function searchGoogle(query: string): Promise<Source[]> {
  try {
    const response = await fetch(
`https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&num=5&fields=items(title,link,snippet,pagemap)`

    );

    if (!response.ok) {
      throw new Error(`Google Search API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.items) {
      throw new Error("No search results found.");
    }

    return data.items.map((item: any) => ({
      title: item.title,
      link: item.link,
    }));
  } catch (error) {
    console.error("Error in searchGoogle:", error);
    throw new Error("Failed to fetch search results.");
  }
}

export async function getGeminiResponse(query: string, context: string): Promise<string> {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log(query);
    
    const prompt = `
      You are a helpful AI assistant providing information based on search results.

      User Query: "${query}"

      Below are relevant search results to help answer the query:
      ${context}
      Response format:
      - use numerical key-points with [1] [2] [3] etc for the results for user's question

      NOTE: just tell the ans of users ques ${query} and not where he/she will get the ans. Be precise.
    `;

    const result = await model.generateContent(prompt);
    const textResponse = result.response?.text() ?? "No response generated.";

    return textResponse;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate response.");
  }
}
