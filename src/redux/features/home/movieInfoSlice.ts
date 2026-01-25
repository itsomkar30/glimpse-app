import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPopularMovies, fetchPopularTVShows, fetchTrending, fetchTopRatedMovies, searchAllShows, recommendationsByLang } from "@/services/mediaInfoService"



export const loadPopularMovies = createAsyncThunk(
    "media/loadPopularMovies",
    async () => {
        return await fetchPopularMovies();
    }
);

export const loadTrending = createAsyncThunk(
    "media/loadTrending",
    async () => {
        const data = await fetchTrending();
        return data;
    }
);

export const loadPopularTVShows = createAsyncThunk(
    "media/loadPopularTVShows",
    async () => {
        return await fetchPopularTVShows();
    }
);

export const loadTopRatedMovies = createAsyncThunk(
    "media/loadTopRatedMovies",
    async () => {
        return await fetchTopRatedMovies();
    }
);

export const searchShows = createAsyncThunk(
    "media/searchShows",
    async (query: string) => {
        return await searchAllShows(query);
    }

);

export const loadRecommendationsByLang = createAsyncThunk(
    "media/loadRecommendationsByLang",
    async (language: string) => {
        const data = await recommendationsByLang(language);
        return {
            language,
            data,
        };
    }
);



type MediaState = {
    trending: any[];
    popularMovies: any[];
    popularTVShows: any[];
    topRatedMovies: any[];
    searchResults: any[];
    searchStatus: "idle" | "loading" | "succeeded" | "failed";
    selectedLanguage: string;
    recommendationsByLanguage: any[];
    loading: boolean;
    error: string | null;
};

const initialState: MediaState = {
    trending: [],
    popularMovies: [],
    popularTVShows: [],
    topRatedMovies: [],
    searchResults: [],
    searchStatus: "idle",
    selectedLanguage: "hi",
    recommendationsByLanguage: [],
    loading: false,
    error: null,
};


const movieInfoSlice = createSlice({
    name: "media",
    initialState,
    reducers: {
        clearSearch(state) {
            state.searchResults = [];
            state.searchStatus = "idle";
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(loadTrending.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadTrending.fulfilled, (state, action) => {
                state.loading = false;
                state.trending = action.payload;
            })
            .addCase(loadTrending.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to load trending";
            })

            // Movies
            .addCase(loadPopularMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadPopularMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.popularMovies = action.payload;
            })

            // TV Shows
            .addCase(loadPopularTVShows.fulfilled, (state, action) => {
                state.loading = false;
                state.popularTVShows = action.payload;
            })

            // Top Rated Movies
            .addCase(loadTopRatedMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.topRatedMovies = action.payload;
            })

            //  Search movies and tv
            .addCase(searchShows.pending, (state) => {
                state.searchStatus = "loading";
            })

            .addCase(searchShows.fulfilled, (state, action) => {
                state.searchStatus = "succeeded";
                state.searchResults = action.payload;
            })

            .addCase(searchShows.rejected, (state, action) => {
                state.searchStatus = "failed";
                state.error = action.error.message ?? "Search failed";
            })

            .addCase(loadRecommendationsByLang.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadRecommendationsByLang.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedLanguage = action.payload.language;
                state.recommendationsByLanguage = action.payload.data;
            })
            .addCase(loadRecommendationsByLang.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ?? "Failed to load recommendations by language";
            })

    },
});

export const { clearSearch } = movieInfoSlice.actions;
export default movieInfoSlice.reducer;
