import { TMDB_API_KEY, TMDB_BASE_URL } from "@/constants/tmdb";

export async function fetchPopularMovies() {
    const res = await fetch(
        `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
    );
    const data = await res.json();
    return data.results;
}

export async function fetchPopularTVShows() {
    const res = await fetch(
        `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`
    );
    const data = await res.json();
    return data.results;
}

export async function fetchTrending() {
    const res = await fetch(
        `${TMDB_BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}`
    );
    const data = await res.json();
    return data.results;
}