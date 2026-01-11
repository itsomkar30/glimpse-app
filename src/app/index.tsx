import { View, Text, Pressable } from "react-native";
import { auth } from "../configs/firebase";
import { signOut } from "firebase/auth";

export default function Home() {
    const user = auth.currentUser;

    return (
        <View style={{ padding: 24 }}>
            <Text style={{ fontSize: 24, marginBottom: 16 }}>
                Hello {user?.displayName || "User"} 👋
            </Text>

            <Pressable
                onPress={() => signOut(auth)}
                style={{
                    backgroundColor: "#145da0",
                    padding: 14,
                    borderRadius: 8,
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "#fff" }}>Logout</Text>
            </Pressable>
        </View>
    );
}
