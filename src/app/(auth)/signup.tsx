import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Image,
    ImageBackground,
    Keyboard,
    Animated,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/configs/firebase";
import { router } from "expo-router";
import { colors } from "@/constants/colors";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // 🔹 SAME keyboard animation pattern
    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
            const h = e.endCoordinates.height;
            Animated.timing(translateY, {
                toValue: -h,
                duration: 220,
                useNativeDriver: true,
            }).start();
        });

        const hideSub = Keyboard.addListener("keyboardDidHide", () => {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 180,
                useNativeDriver: true,
            }).start();
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const handleSignup = async () => {
        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const userCred = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(userCred.user, {
                displayName: name,
            });

            router.replace("/index");
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.screen}>
            {/* 🔹 SAME TOP IMAGE */}
            <ImageBackground
                source={require("../../../assets/images/login-bg.jpg")}
                style={styles.topImage}
            >
                <View style={styles.overlay}>
                    <Image
                        source={require("../../../assets/images/logo.png")}
                        style={{ height: 50, width: 120 }}
                    />
                </View>
            </ImageBackground>

            {/* 🔹 Animated Form */}
            <Animated.View
                style={[
                    styles.formContainer,
                    { transform: [{ translateY }] },
                ]}
            >
                <Text style={styles.title}>Create your account</Text>

                <TextInput
                    placeholder="Full Name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor={colors.textPrimary}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    placeholderTextColor={colors.textPrimary}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor={colors.textPrimary}
                    style={styles.input}
                />

                <Pressable style={styles.button} onPress={handleSignup}>
                    <Text style={styles.buttonText}>
                        {loading ? "Creating..." : "Sign Up"}
                    </Text>
                </Pressable>

                <Pressable onPress={() => router.push("/signin")}>
                    <Text style={styles.link}>
                        Already have an account? Sign in
                    </Text>
                </Pressable>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },

    topImage: {
        flex: 1,
        justifyContent: "flex-start",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        paddingTop: 60,
        paddingLeft: 20,
    },

    formContainer: {
        flex: 0.75,
        paddingVertical: 35,
        paddingHorizontal: 15,
        backgroundColor: colors.appPrimary,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -30,
    },

    title: {
        fontSize: 24,
        marginBottom: 20,
        color: colors.textPrimary,
        fontFamily: "outfit-medium",
    },

    input: {
        borderWidth: 1,
        borderColor: "lightgrey",
        borderRadius: 8,
        padding: 14,
        marginBottom: 15,
        color: colors.textPrimary,
        fontFamily: "outfit",
    },

    button: {
        backgroundColor: colors.appTheme,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },

    buttonText: {
        color: colors.appPrimary,
        fontFamily: "outfit-medium",
        fontSize: 16,
    },

    link: {
        marginTop: 16,
        fontFamily: "outfit-medium",
        color: colors.appTheme,
        textAlign: "center",
    },
});
