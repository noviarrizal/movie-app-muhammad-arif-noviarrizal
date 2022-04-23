import React, { useEffect, useState } from "react";
import "./Home.scss";
import MovieList from "../MovieList/MovieList";
import movieApi from "../../common/api/movieApi";
import { APIKey } from "../../common/api/movieApiKey";
import { useDispatch } from "react-redux";
import { addMovies } from "../../features/movies/movieSlice";

const Home = () => {
	const movieText = "Harry";
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchMovies = async () => {
			const response = await movieApi
				.get(`?apikey=${APIKey}&s=${movieText}&type=movie`)
				.catch((err) => {
					console.log("Error :", err);
				});
			console.log(response);
			dispatch(addMovies(response.data));
		};
		fetchMovies();
	}, []);

	return (
		<>
			<div className="banner-img"></div>
			<MovieList />
		</>
	);
};

export default Home;
