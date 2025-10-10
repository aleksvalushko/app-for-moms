import {Account, Avatars, Client} from "react-native-appwrite";

export const client: Client = new Client();
client
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject('68e3939900393dc231a8')
    .setPlatform('dev.jokerproject.appformoms');

export const account: Account = new Account(client);
export const avatars: Avatars = new Avatars(client);