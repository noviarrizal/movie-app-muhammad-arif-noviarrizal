import React, { useEffect, useState } from "react";
import "./Home.scss";
import MovieList from "../MovieList/MovieList";
import { useDispatch } from "react-redux";
import {
	fetchAsyncMovies,
	fetchAsyncSeries,
} from "../../features/movies/movieSlice";

const Home = () => {
	const dispatch = useDispatch();
	const movieText = "Batman";
	const seriesText = "Friends";
	useEffect(() => {
		dispatch(fetchAsyncMovies(movieText));
		dispatch(fetchAsyncSeries(seriesText));
	}, [dispatch]);

	return (
		<>
			<div className="banner-img"></div>
			<MovieList />
		</>
	);
};

export default Home;
