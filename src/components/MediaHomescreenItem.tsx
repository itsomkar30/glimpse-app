import { View, Text, Image, StyleSheet, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '@/constants/colors'

type MediaHomeScreenItemProps = {
    backdropUrl: string;
    title: string;
    meta: string;
    onPress?: () => void;
};

export default function MediaHomescreenItem({
    backdropUrl,
    title,
    meta,
    onPress,
}: MediaHomeScreenItemProps) {
    return (
        <View
            style={{
                height: '50%',
                width: '100%',
                overflow: 'hidden',
                backgroundColor: colors.appPrimary,
            }}
        >
            <ImageBackground
                source={{
                    uri: backdropUrl,
                }}
                style={{
                    width: '100%',
                    height: '100%',
                }}

            >

                <LinearGradient
                    colors={[
                        'rgba(0,0,0,0.95)',
                        'rgba(0,0,0,0.85)',
                        'rgba(0,0,0,0.6)',
                        'rgba(0,0,0,0.3)',
                        'rgba(0,0,0,0)'
                    ]}
                    locations={[0, 0.3, 0.5, 0.75, 1]}
                    start={{ x: 0.5, y: 1 }} // bottom
                    end={{ x: 0.5, y: 0 }}   // top
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                    }}
                />
                <Text numberOfLines={2} style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 30,
                    color: colors.textPrimary,
                    position: 'absolute',
                    bottom: 120,
                    alignSelf: 'center',
                    zIndex: 5,
                    textAlign: 'center'

                }}>{title}</Text>

                {/* <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 15,
                    color: colors.textPrimary,
                    position: 'absolute',
                    bottom: 90,
                    alignSelf: 'center',
                    zIndex: 5
                }}>2013 • English • 5 Seasons • 89% </Text> */}

                <Text style={styles.meta}>{meta}</Text>

                <Pressable style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>Watch now</Text>
                </Pressable>
            </ImageBackground>






        </View>
    );
}



const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.appTheme,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        maxWidth: 160,
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 30,
        zIndex: 5
    },
    buttonText: {
        color: colors.appPrimary,
        fontFamily: 'outfit-medium',
        fontSize: 16,
    },
    meta: {
        fontFamily: "outfit-medium",
        fontSize: 15,
        color: colors.textPrimary,
        position: "absolute",
        bottom: 90,
        alignSelf: "center",
    },
})