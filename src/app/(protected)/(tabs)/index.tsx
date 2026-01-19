import { View, Text, Pressable, StyleSheet, FlatList, Dimensions } from 'react-native';
import React, { useRef } from 'react';
import { auth } from '../../../configs/firebase';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import MediaHomescreenItem from '@/components/MediaHomescreenItem';
import { useDispatch, useSelector } from "react-redux";
import { loadTrending } from '@/redux/features/home/movieInfoSlice'
import { RootState, AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { TMDB_IMAGE_BASE_URL } from "@/constants/tmdb";

const { width } = Dimensions.get('window');

export default function index() {
    const user = auth.currentUser;
    const flatListRef = useRef<FlatList>(null);
    const scrollIndex = useRef(0);

    const handleLogout = async () => {
        await signOut(auth);
        router.replace('/(auth)/signin');
    };

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(loadTrending());
    }, []);


    const trending = useSelector(
        (state: RootState) => state.movieInfo.trending
    );

    useEffect(() => {
        if (trending?.length) {
            console.log("Trending count:", trending.length);
            console.log("Trending data:", trending);
        }
    }, [trending]);

    useEffect(() => {
        if (!trending?.length) return;

        const interval = setInterval(() => {
            scrollIndex.current = (scrollIndex.current + 1) % trending.length;
            flatListRef.current?.scrollToIndex({
                index: scrollIndex.current,
                animated: true,
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [trending]);


    const hero = trending?.[2];

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={trending}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={true}
                keyExtractor={(item) => item.id.toString()}
                onScrollToIndexFailed={() => { }}
                renderItem={({ item }) => (
                    <View style={{ width }}>
                        <MediaHomescreenItem
                            backdropUrl={`${TMDB_IMAGE_BASE_URL}${item.backdrop_path}`}
                            title={item.title || item.name}
                            meta={`⭐ ${item.vote_average.toFixed(1)} • ${item.first_air_date?.slice(0, 4) || item.release_date?.slice(0, 4)
                                }`}
                            onPress={() => router.push(`/(protected)/media/${item.id}`)}
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.appPrimary

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