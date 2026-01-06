import { initializeApp } from "firebase/app";
import {
    initializeAuth,
    getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyAVB96BU9dzTg01zAu8NtOyY4d4yfHv3uo",
    authDomain: "glimpse-react-native.firebaseapp.com",
    projectId: "glimpse-react-native",
    storageBucket: "glimpse-react-native.appspot.com",
    messagingSenderId: "362269296858",
    appId: "1:362269296858:web:3fab8a42d14933aab0bde3",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
