import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'
import movieInfoReducer from './features/home/movieInfoSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        movieInfo: movieInfoReducer
    },
});

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;