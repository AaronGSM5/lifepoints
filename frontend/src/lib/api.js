// @/lib/api.js
import { account } from "@/lib/appwrite";

const BACKEND_URL = process.env.API_URL;

export async function apiRequest(endpoint, options = {}, body) {
  try {
    let { jwt } = await account.createJWT();

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}HALLO`,
      ...options.headers
    };

    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      ...options,
      headers,
      body
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Backend API request failed:", error);
    throw error;
  }
}
