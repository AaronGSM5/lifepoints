import { account } from "@/api/client/appwrite";

const BACKEND_URL = process.env.API_URL || 'http://localhost:6767/api/v1';

export async function apiRequest(endpoint, options = {}) {
  try {
    const { jwt } = await account.createJWT();

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
      ...options.headers
    };

    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      ...options,
      headers
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error("API Fehler-Antwort:", responseText);
      throw new Error(`API error: ${response.status}`);
    }

    try {
      return JSON.parse(responseText);
    } catch {
      console.error("Konnte Antwort nicht als JSON parsen. Raw Data:", responseText);
      throw new Error("Server hat keine gültige JSON-Antwort gesendet.");
    }
  } catch (error) {
    console.error("Backend API request failed:", error);
    throw error;
  }
}
