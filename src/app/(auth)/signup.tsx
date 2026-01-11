import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/configs/firebase";
import { router } from "expo-router";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            // 1️⃣ Create account
            const userCred = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // 2️⃣ Save name in Firebase Auth
            await updateProfile(userCred.user, {
                displayName: name,
            });

            // 3️⃣ Go to home
            router.replace("/index");
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <TextInput
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={styles.input}
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            <Pressable style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>
                    {loading ? "Creating..." : "Sign Up"}
                </Text>
            </Pressable>

            <Pressable onPress={() => router.push("/signin")}>
                <Text style={styles.link}>Already have an account? Sign in</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 24 },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 24 },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 14,
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#145da0",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: { color: "#fff", fontWeight: "600" },
    link: { marginTop: 16, color: "#145da0", textAlign: "center" },
});
