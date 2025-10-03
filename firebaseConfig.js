import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyANcSl1u-2DPBpt9wobsmHVZqzK-TxKXSc",
    authDomain: "app-for-moms.firebaseapp.com",
    projectId: "app-for-moms",
    storageBucket: "app-for-moms.firebasestorage.app",
    messagingSenderId: "417165676643",
    appId: "1:417165676643:web:8a0fca7dc3a011bd3aa856",
    measurementId: "G-RZYH1PKSZG"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);

export {app, auth, db, storage};