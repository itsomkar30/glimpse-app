import { View, Text, TextInput, Pressable, StyleSheet, Image } from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs/firebase";
import { router } from "expo-router";
import { ImageBackground } from "react-native";
import { colors } from "@/constants/colors";


export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignin = async () => {
        if (!email || !password) {
            alert("Enter email and password");
            return;
        }

        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            router.replace("/index");
        } catch (error: any) {
            alert("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.screen}>
            {/* Top background */}
            <ImageBackground
                source={require("../../../assets/images/login-bg.jpg")}
                style={styles.topImage}
                resizeMode="cover"
            >


                <View style={styles.overlay}>
                    <Image source={require("../../../assets/images/logo.png")} style={{ height: 50, width: 120 }} />
                </View>
            </ImageBackground>

            {/*Signin container */}
            <View style={styles.formContainer}>
                <Text numberOfLines={1} style={styles.title}>Dive into endless entertainment</Text>

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

                <Pressable style={styles.button} onPress={handleSignin}>
                    <Text style={styles.buttonText}>
                        {loading ? "Signing in..." : "Sign In"}
                    </Text>
                </Pressable>

                <Pressable onPress={() => router.push("/signup")}>
                    <Text style={styles.link}>Create new account</Text>
                </Pressable>
            </View>
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
        flex: 0.7,
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
        borderRadius: 10,
        padding: 14,
        marginBottom: 15,
        color: colors.textPrimary,
        fontFamily: "outfit"
    },

    button: {
        backgroundColor: colors.appTheme,
        padding: 12,
        borderRadius: 6,
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
