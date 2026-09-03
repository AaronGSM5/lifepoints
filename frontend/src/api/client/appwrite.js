import { Account, Client, Databases, Storage } from 'react-native-appwrite';

import 'react-native-url-polyfill/auto';

const client = new Client();

const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
const platform = process.env.EXPO_PUBLIC_APPWRITE_PLATFORM || 'com.lifepoints.app';

if (!endpoint || !projectId) {
  if (process.env.NODE_ENV === 'test') {
    console.warn('Using mock Appwrite credentials for testing.');
  } else {
    throw new Error('Missing required Appwrite environment variables in production/development!');
  }
}

client
  .setEndpoint(endpoint || 'https://cloud.appwrite.io/v1')
  .setProject(projectId || 'mock-project-id')
  .setPlatform(platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;