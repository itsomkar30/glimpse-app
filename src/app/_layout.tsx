import { Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { useFonts } from "expo-font";
import { User } from "firebase/auth";
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from "react-redux";
import store from '../redux/store'
import { setUser as setUserAction, clearUser as clearUserAction } from '../redux/features/auth/authSlice'

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const [fontsLoaded] = useFonts({
        'outfit': require('../../assets/fonts/Outfit-Regular.ttf'),
        'outfit-medium': require('../../assets/fonts/Outfit-Medium.ttf'),
        'outfit-bold': require('../../assets/fonts/Outfit-Bold.ttf')
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (initializing) setInitializing(false);

            if (user) {
                store.dispatch(
                    setUserAction({
                        uid: user.uid,
                        displayName: user.displayName ?? null,
                        email: user.email ?? null,
                        photoURL: user.photoURL ?? null,
                    })
                );
            } else {
                store.dispatch(clearUserAction());
            }

        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!initializing && fontsLoaded) {
            SplashScreen.hideAsync();
            if (user) {
                router.replace("/(protected)/(tabs)");
            } else {
                router.replace("/(auth)/signin");
            }
        }
    }, [user, initializing, fontsLoaded]);

    if (initializing || !fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require("@assets/images/logo.png")} style={{ height: 50, width: 120, marginVertical: 20 }} />
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Provider store={store}>
            <Stack screenOptions={{ headerShown: false }} />
        </Provider>
    );
}