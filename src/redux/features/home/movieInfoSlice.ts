import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPopularMovies, fetchPopularTVShows, fetchTrending } from "@/services/mediaInfoService"

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

type MediaState = {
    trending: any[];
    popularMovies: any[];
    popularTVShows: any[];
    loading: boolean;
    error: string | null;
};

const initialState: MediaState = {
    trending: [],
    popularMovies: [],
    popularTVShows: [],
    loading: false,
    error: null,
};


const movieInfoSlice = createSlice({
    name: "media",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 🔥 Trending (HERO)
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
            });
    },
});
export default movieInfoSlice.reducer;
