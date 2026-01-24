import { View, Text, Image, StyleSheet } from 'react-native'
import { colors } from '@/constants/colors'
import React, { useEffect, useState } from 'react'

type MediaItemProps = {
    backdropUrl: string
    title: string
    meta: string
    onPress?: () => void
}

export default function SearchMediaItem({
    backdropUrl,
    title,
    meta,
    onPress,
}: MediaItemProps) {

    return (
        <View
            style={[
                styles.container,
            ]}
        >
            <View
                style={[
                    styles.imageContainer,
                ]}
            >
                <Image
                    source={{ uri: backdropUrl }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.description}>
                <Text numberOfLines={1} style={styles.titleText}>
                    {title}
                </Text>
                <Text style={styles.ratingText}>{meta}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: 200,
        marginRight: 10,
    },

    imageContainer: {
        height: 120,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#111',
    },

    imageLandscape: {
        height: 120,
    },

    image: {
        width: '100%',
        height: '100%',
    },

    titleText: {
        color: colors.textPrimary,
        fontFamily: 'outfit-medium',
        fontSize: 16,
        marginTop: 8,
    },

    ratingText: {
        color: colors.textPrimary,
        fontFamily: 'outfit',
        fontSize: 11,
        marginTop: 4,
    },

    description: {
        height: 50,
    },
})
