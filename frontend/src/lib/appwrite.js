import { Client, Account, Databases, Storage } from 'react-native-appwrite';
import 'react-native-url-polyfill/auto';

const client = new Client();

client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;