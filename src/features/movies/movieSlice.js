import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/api/movieApi";
import { APIKey } from "../../common/api/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
	"movies/fetchAsyncMovies",
	async (search) => {
		const response = await movieApi.get(
			`?apiKey=${APIKey}&s=${search}&type=movie`
		);
		console.log(response);
		return response.data;
	}
);

export const fetchAsyncSeries = createAsyncThunk(
	"movies/fetchAsyncSeries",
	async (search) => {
		const response = await movieApi.get(
			`?apiKey=${APIKey}&s=${search}&type=series`
		);
		console.log(response);
		return response.data;
	}
);

export const fetchAsyncMovieOrSeriesDetail = createAsyncThunk(
	"movies/fetchAsyncMovieOrSeriesDetail",
	async (id) => {
		const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
		console.log(response);
		return response.data;
	}
);

const initialState = {
	movies: {},
	series: {},
	selectedMovieOrSeries: {},
};

const movieSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		removeSelectedMovieOrSeries: (state) => {
			state.selectedMovieOrSeries = {};
		},
	},
	extraReducers: {
		[fetchAsyncMovies.pending]: () => {
			console.log("Pending");
		},
		[fetchAsyncMovies.fulfilled]: (state, { payload }) => {
			console.log("Fetched Successfully!");
			return { ...state, movies: payload };
		},
		[fetchAsyncMovies.rejected]: () => {
			console.log("Rejected!");
		},
		[fetchAsyncSeries.fulfilled]: (state, { payload }) => {
			console.log("Fetched Successfully!");
			return { ...state, series: payload };
		},
		[fetchAsyncMovieOrSeriesDetail.fulfilled]: (state, { payload }) => {
			console.log("Fetched Successfully!");
			return { ...state, selectedMovieOrSeries: payload };
		},
	},
});

export const { removeSelectedMovieOrSeries } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllSeries = (state) => state.movies.series;
export const getSelectedMovieOrSeries = (state) =>
	state.movies.selectedMovieOrSeries;
export default movieSlice.reducer;
