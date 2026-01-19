import { View, Text, Pressable, StyleSheet } from 'react-native';
import { auth } from '../../../configs/firebase';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';

export default function profile() {
    const user = auth.currentUser;

    const handleLogout = async () => {
        await signOut(auth);
        router.replace('/(auth)/signin');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, {user?.displayName || user?.email}!</Text>
            <Pressable style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontFamily: 'outfit-bold',
        marginBottom: 24,
    },
    button: {
        backgroundColor: colors.appTheme,
        padding: 16,
        borderRadius: 8,
        minWidth: 120,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.appPrimary,
        fontFamily: 'outfit-medium',
        fontSize: 16,
    },
});