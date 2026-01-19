import { View, Text, Pressable, StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native';
import React, { useRef } from 'react';
import { auth } from '../../../configs/firebase';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import MediaHomescreenItem from '@/components/MediaHomescreenItem';
import { useDispatch, useSelector } from "react-redux";
import { loadTrending, loadPopularMovies } from '@/redux/features/home/movieInfoSlice'
import { RootState, AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { getFirstGenre, TMDB_IMAGE_BASE_URL } from "@/constants/tmdb";
import { TMDB_LANGUAGE_MAP, getLanguageName } from '@/constants/tmdb'
import MediaItem from '@/components/MediaItem';

const { width } = Dimensions.get('window');

export default function index() {
    const user = auth.currentUser;
    const flatListRef = useRef<FlatList>(null);
    const scrollIndex = useRef(0);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(loadPopularMovies());
        dispatch(loadTrending());
    }, []);


    const popular = useSelector(
        (state: RootState) => state.movieInfo.popularMovies
    );

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
        if (!popular?.length) return;

        const interval = setInterval(() => {
            scrollIndex.current = (scrollIndex.current + 1) % popular.length;
            flatListRef.current?.scrollToIndex({
                index: scrollIndex.current,
                animated: true,
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [popular]);




    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{ backgroundColor: colors.appPrimary }}
                showsVerticalScrollIndicator={false}>

                <FlatList
                    ref={flatListRef}
                    data={popular}
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
                                meta={`⭐ ${item.vote_average.toFixed(1)} • ${item.first_air_date?.slice(0, 4) ||
                                    item.release_date?.slice(0, 4)
                                    } • ${getLanguageName(item.original_language)}`}

                                onPress={() => router.push(`/(protected)/media/${item.id}`)}
                            />
                        </View>
                    )}
                />





                <Text style={styles.sectionHeader}>Trending now</Text>


                <FlatList
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5
                    }}
                    data={trending}
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    keyExtractor={(item) => item.id.toString()}
                    onScrollToIndexFailed={() => { }}
                    renderItem={({ item }) => (

                        <MediaItem
                            backdropUrl={`${TMDB_IMAGE_BASE_URL}${item.backdrop_path}`}
                            title={item.title || item.name}
                            meta={getFirstGenre(item.genre_ids)}


                            onPress={() => router.push(`/(protected)/media/${item.id}`)} />

                    )}
                />


                <Text style={styles.sectionHeader}>Trending now</Text>


                <FlatList
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5
                    }}
                    data={trending}
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    keyExtractor={(item) => item.id.toString()}
                    onScrollToIndexFailed={() => { }}
                    renderItem={({ item }) => (

                        <MediaItem
                            backdropUrl={`${TMDB_IMAGE_BASE_URL}${item.backdrop_path}`}
                            title={item.title || item.name}
                            meta={`⭐ ${item.vote_average.toFixed(1)} • ${item.first_air_date?.slice(0, 4) ||
                                item.release_date?.slice(0, 4)
                                } • ${getLanguageName(item.original_language)}`}

                            onPress={() => router.push(`/(protected)/media/${item.id}`)} />

                    )}
                />

            </ScrollView>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: colors.appPrimary,

    },
    carouselContainer: {
        flex: 0.5,
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
    sectionHeader: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
        color: colors.textPrimary,
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 10,

    }
});