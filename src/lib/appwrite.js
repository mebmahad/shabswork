import { Client, Account, Storage, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('66f7bbe80020b10e4340'); // Replace with your project ID

export const account = new Account(client);
export const storage = new Storage(client);
export const databases = new Databases(client);

export { client };

