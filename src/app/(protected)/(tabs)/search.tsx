import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { clearSearch, searchShows } from '@/redux/features/home/movieInfoSlice'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '@/redux/store';

export default function profile() {
    const [searchValue, setSearchValue] = useState<string>("")
    const dispatch = useDispatch<AppDispatch>();
    const { searchResults, searchStatus } = useSelector(
        (state: RootState) => state.movieInfo
    );

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

                <Text style={styles.sectionHeader}>Top Results</Text>
                {searchStatus === 'loading' && (
                    <Text style={{ color: colors.textPrimary }}>Loading...</Text>
                )}

                {searchStatus === 'succeeded' &&
                    searchResults.map((item, index) => (
                        <Text
                            key={index}
                            style={{ color: colors.textPrimary, paddingVertical: 4 }}
                        >
                            {item.title || item.name}
                        </Text>
                    ))}

                {searchStatus === 'succeeded' && searchResults.length === 0 && (
                    <Text style={{ color: colors.textPrimary }}>No results found</Text>
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
        paddingHorizontal: 10,

    }
})