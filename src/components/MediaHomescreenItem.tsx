import { View, Text, Image, StyleSheet, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '@/constants/colors'

export default function MediaHomescreenItem() {
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
                    uri: 'https://m.media-amazon.com/images/M/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
                }}
                style={{
                    width: '100%',
                    height: '100%',
                }}

            >

                <LinearGradient
                    colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0)']}
                    start={{ x: 0.5, y: 1 }} // bottom
                    end={{ x: 0.5, y: 0 }}   // top
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '50%', // 
                    }}
                />
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 30,
                    color: colors.textPrimary,
                    position: 'absolute',
                    bottom: 120,
                    alignSelf: 'center',
                    zIndex: 5
                }}>Breaking Bad</Text>

                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 15,
                    color: colors.textPrimary,
                    position: 'absolute',
                    bottom: 90,
                    alignSelf: 'center',
                    zIndex: 5
                }}>2013 • English • 5 Seasons • 89% </Text>


                <Pressable style={styles.button}>
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
})