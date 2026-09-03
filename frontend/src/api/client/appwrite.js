import { Account, Client, Databases, Storage } from 'react-native-appwrite';

import 'react-native-url-polyfill/auto';


const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
const platform = process.env.EXPO_PUBLIC_APPWRITE_PLATFORM || 'com.lifepoints.app';

if (!endpoint || !projectId) {
  throw new Error('Missing required Appwrite environment variables. Check your .env file.');
}

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;