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
        `${TMDB_BASE_URL}/trending/tv/day?api_key=${TMDB_API_KEY}`
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

export async function fetchTopRatedMovies() {
    const res = await fetch(
        `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`
    );
    const data = await res.json();
    return data.results;
}

export async function searchAllShows(query: string) {
    if (!query) return [];

    const res = await fetch(
        `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
    );

    const data = await res.json();

    return data.results.filter(
        (item: any) => item.media_type === "movie" || item.media_type === "tv"
    );
}

export async function recommendationsByLang(language: string) {
    if (!language) return [];

    const res = await fetch(
        `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=${language}`
    );

    const data = await res.json();

    return data.results
}