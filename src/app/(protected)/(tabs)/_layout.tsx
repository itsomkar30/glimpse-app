import { Tabs } from 'expo-router';
import { FontAwesome6, Entypo } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from '@/constants/colors';
import { TouchableOpacity } from 'react-native';


export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            headerStyle: {
                backgroundColor: colors.appPrimary,
            },
            tabBarActiveTintColor: colors.appTheme,
            tabBarStyle: {
                backgroundColor: colors.appPrimary
            },
            headerShown: false
        }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    headerTitleAlign: "center",
                    headerTintColor: colors.appTheme,
                    headerTitleStyle: {
                        fontFamily: "outfit",
                    },
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Entypo name="home" size={18} color={color} />,
                }}
            />

            <Tabs.Screen
                name='search'
                options={{
                    headerTitleAlign: "center",
                    headerTintColor: colors.appTheme,
                    headerTitleStyle: {
                        fontFamily: "outfit",
                    },
                    title: 'Search',
                    tabBarIcon: ({ color }) => <FontAwesome name="search" size={18} color={color} />,
                }}
            />

            <Tabs.Screen
                name='profile'
                options={{
                    headerTitleAlign: "center",
                    headerTintColor: colors.appTheme,
                    headerTitleStyle: {
                        fontFamily: "outfit",
                    },
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome6 name="user-large" size={18} color={color} />,
                }}
            />
        </Tabs>
    );
}
