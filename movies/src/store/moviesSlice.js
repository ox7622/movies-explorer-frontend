import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { myMoviesApi } from "../utils/MainApi";
import { moviesApi } from '../utils/MoviesApi'
import * as Filter from '../utils/Filter'

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async function (_, { rejectWithValue }) {
        try {
            const prevSearch = window.localStorage.getItem('moviesData');

            let data = [];

            if (prevSearch) {
                data = JSON.parse(prevSearch);
            }
            else {
                data = await moviesApi.getMoviesData();
                if (data) {
                    window.localStorage.setItem('moviesData', JSON.stringify(data));
                }
            }
            console.log(data)
            return data;

        } catch (err) {
            return rejectWithValue(err.message)
        }

    }
)

export const setLike = createAsyncThunk(
    'movies/setLike',
    async function (movie, { rejectWithValue }) {
        try {
            const newMovie = await myMoviesApi.createMovie({
                imageURL: `https://api.nomoreparties.co${movie.image.url}`,
                thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`, ...movie,
            });
            // const movies = [newMovie, ...state.savedMovies];

            // setSavedMovies(movieUpd);
            // setSavedMoviesAll(movieUpd);
            // window.localStorage.setItem('savedMovies', JSON.stringify(movieUpd));
            return newMovie

        } catch (err) {
            return rejectWithValue(err.message)
        }

    }
)

export const deleteLike = createAsyncThunk(
    'movies/deleteLike',
    async function (movie, { rejectWithValue }) {
        try {


          const movieDel =   await myMoviesApi.deleteMovie(movie._id);

            // const filtered = filterById(savedMoviesAll, findMovie);
            // setSavedMovies(filtered);
            // setSavedMoviesAll(filtered);
            console.log(movieDel)
            return movieDel;

        }
        catch (err) {
            return rejectWithValue(err.message)
        }
    }
)


const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        initialMovies: [],
        savedMovies: [],
        searchDone: false,
        status: null,
        error: null,

    },

    reducers: {
        searchMovies(state, action) {
            state.movies = Filter.movieFilter(state.movies, action.payload);
            window.localStorage.setItem('input', JSON.stringify(action.payload));
            state.initialMovies = state.movies;
            window.localStorage.setItem('moviesData', JSON.stringify(state.movies));

            state.searchDone = true
        },
        durationFilterMovies(state, action) {
            console.log(state.movies, action.payload)

            state.movies = Filter.durationFilter(state.movies, state.initialMovies, action.payload);
            console.log(state.movies)
            window.localStorage.setItem('checked', JSON.stringify(action.payload));
        }

    },

    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
        })
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
            state.initialMovies = action.payload;
            state.status = 'completed';
        })
        builder.addCase(fetchMovies.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload
        })


        builder.addCase(setLike.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
        })
        builder.addCase(setLike.fulfilled, (state, action) => {
            state.savedMovies = [action.payload, ...state.savedMovies];
            state.status = 'completed';
        })
        builder.addCase(setLike.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload
        })

        builder.addCase(deleteLike.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
        })
        builder.addCase(deleteLike.fulfilled, (state, action) => {
            state.savedMovies = Filter.filterById(state.savedMovies, action.payload);
            state.status = 'completed';
        })
        builder.addCase(deleteLike.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload
        })


    }

})

export const { searchMovies, durationFilterMovies } = moviesSlice.actions;
export default moviesSlice.reducer;

