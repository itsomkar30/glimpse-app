import { View, Text, Image, StyleSheet, ImageBackground, Pressable } from 'react-native'
import { colors } from '@/constants/colors'
import React from 'react'
import { TMDB_IMAGE_BASE_URL } from '@/constants/tmdb';

type MediaItemProps = {
    backdropUrl: string;
    title: string;
    meta: string;
    onPress?: () => void;
};

export default function MediaItem(
    { backdropUrl, title, meta, onPress }: MediaItemProps
) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: backdropUrl }}
                    style={{ height: "100%", width: "100%", resizeMode: 'cover', borderRadius: 4 }}
                />
            </View>

            <View style={styles.description}>
                <Text numberOfLines={1} style={styles.titleText}>{title}</Text>
                <Text style={styles.ratingText}>{meta}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 110,
        marginRight: 10,

    },
    imageContainer: {
        height: 175,
        width: 110,
        borderRadius: 10,
    },
    titleText: {
        color: colors.textPrimary,
        fontFamily: 'outfit-medium',
        fontSize: 16,
        marginTop: 8,
        maxWidth: 110,
    },
    ratingText: {
        color: colors.textPrimary,
        fontFamily: 'outfit',
        fontSize: 11,
        marginTop: 8,
        maxWidth: 110,
    },
    description: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 50
    }
})