import { Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);

    // 1. Capture the boolean return value here
    const [fontsLoaded] = useFonts({
        'outfit': require('../../assets/fonts/Outfit-Regular.ttf'),
        'outfit-medium': require('../../assets/fonts/Outfit-Medium.ttf'),
        'outfit-bold': require('../../assets/fonts/Outfit-Bold.ttf')
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (initializing) setInitializing(false);
        });

        return unsubscribe;
    }, []); // Removed 'initializing' dependency to prevent unnecessary re-runs

    useEffect(() => {
        // 2. Add !fontsLoaded to this check so we don't navigate before fonts are ready
        if (!initializing && fontsLoaded) {
            SplashScreen.hideAsync();
            if (user) {
                router.replace("/(tabs)/home"); // Or wherever your main app is
            } else {
                router.replace("/(auth)/signin");
            }
        }
    }, [user, initializing, fontsLoaded]);

    // 3. Show Loading screen if EITHER Auth is initializing OR Fonts are not loaded
    if (initializing || !fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}