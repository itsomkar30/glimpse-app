import { View, Text, StyleSheet, TextInput, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { clearSearch, searchShows, loadRecommendationsByLang } from '@/redux/features/home/movieInfoSlice'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '@/redux/store';
import MediaItem from '@/components/MediaItem';
import { LanguageItem } from '@/components/LanguageItem';
import { router } from 'expo-router';
import { TMDB_IMAGE_BASE_URL, languages } from '@/constants/tmdb';
import SearchMediaItem from '@/components/SearchMediaItem';
import Feather from '@expo/vector-icons/Feather';

export default function profile() {
    const [searchValue, setSearchValue] = useState<string>("")
    const dispatch = useDispatch<AppDispatch>();
    const { searchResults, searchStatus } = useSelector(
        (state: RootState) => state.movieInfo
    );
    const {
        recommendationsByLanguage,
        selectedLanguage,
        loading,
    } = useSelector((state: RootState) => state.movieInfo);


    useEffect(() => {
        if (!searchValue.trim() || searchValue.length < 3) {
            dispatch(clearSearch());
            return;
        }

        const timeout = setTimeout(() => {
            dispatch(searchShows(searchValue));
        }, 400);

        return () => clearTimeout(timeout);
    }, [searchValue]);


    useEffect(() => {
        console.log('status:', searchStatus);
        console.log('results:', searchResults);
    }, [searchStatus, searchResults]);

    useEffect(() => {
        loadLanguageRecommnedations("hi")
    }, []);

    const loadLanguageRecommnedations = (language: string) => {
        dispatch(loadRecommendationsByLang(language));
    };


    return (
        <SafeAreaView style={styles.container} >
            <View style={{
                width: '100%',
                paddingHorizontal: 10
            }}>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    marginVertical: 10,
                    backgroundColor: colors.appPrimary,
                    borderWidth: 1,
                    borderColor: colors.appTheme,
                    borderRadius: 5,
                    paddingHorizontal: 10,

                }} >
                    <Ionicons name="search" size={24} color={colors.textPrimary} />
                    <TextInput placeholder="Search"
                        style={{ fontFamily: 'outfit', paddingVertical: 10, flex: 1, color: colors.textPrimary }}
                        value={searchValue}
                        placeholderTextColor={colors.textPrimary}
                        onChangeText={(text) => setSearchValue(text)}
                    />
                    {searchValue && (
                        <Ionicons name="close-sharp" size={24} color={colors.textPrimary} onPress={() => setSearchValue("")} />
                    )}


                </View>

                {searchStatus === 'succeeded' && (
                    <Text style={styles.sectionHeader}>Top Results</Text>
                )}

                {searchStatus === 'loading' && (
                    <Text style={styles.sectionHeader}>Loading...</Text>
                )}

                {searchStatus === 'succeeded' && (
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingRight: 10 }}
                        renderItem={({ item }) => (
                            <SearchMediaItem
                                backdropUrl={`${TMDB_IMAGE_BASE_URL}${item.backdrop_path}`}
                                title={item.title || item.name}
                                meta={`⭐ ${item.vote_average.toFixed(1)}`}
                                onPress={() =>
                                    router.push(`/(protected)/media/${item.id}`)
                                }
                            />
                        )}
                    />
                )}


                {searchStatus === 'succeeded' && searchResults.length === 0 && (
                    <Text style={styles.sectionHeader}>No results found</Text>
                )}


                <View style={{
                    flexDirection: 'row',
                    gap: 4,
                    alignItems: 'center'
                }}>
                    <Text style={styles.sectionHeader}>Trending in </Text>
                    <Feather name="trending-up" size={16} color={colors.textPrimary} />
                </View>


                <View style={styles.languageContainer}>
                    <FlatList
                        data={languages}
                        keyExtractor={(item) => item.code}
                        renderItem={({ item }) => (
                            <LanguageItem
                                label={item.label}
                                language={item.code}
                                selected={item.code === selectedLanguage}
                                onPress={loadLanguageRecommnedations}
                            />

                        )}
                        contentContainerStyle={styles.languageContainer}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />

                </View>

                {loading && (
                    <Text style={styles.sectionHeader}>Loading recommendations...</Text>
                )}

                {!loading && recommendationsByLanguage.length > 0 && (
                    <FlatList
                        data={recommendationsByLanguage}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingRight: 10 }}
                        renderItem={({ item }) => (
                            <SearchMediaItem
                                backdropUrl={`${TMDB_IMAGE_BASE_URL}${item.backdrop_path}`}
                                title={item.title || item.name}
                                meta={`⭐ ${item.vote_average.toFixed(1)}`}
                                onPress={() =>
                                    router.push(`/(protected)/media/${item.id}`)
                                }
                            />
                        )}
                    />
                )}


            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.appPrimary,
        flex: 1,
        alignItems: 'center',
    },
    sectionHeader: {
        fontFamily: 'outfit-medium',
        fontSize: 16,
        color: colors.textPrimary,
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 5,

    },
    languageContainer: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 10,
        gap: 10,
    },
    languageSelector: {
        backgroundColor: "grey",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
    }
})