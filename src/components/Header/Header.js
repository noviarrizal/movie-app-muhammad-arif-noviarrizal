import React, { useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import user from "../../image/user.png";
import { useDispatch } from "react-redux";
import {
	fetchAsyncMovies,
	fetchAsyncSeries,
} from "../../features/movies/movieSlice";

const Header = () => {
	const [search, setSearch] = useState("");
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		if (search === "")
			return alert("Please enter your movie or series in Seach Box");
		console.log(search);
		dispatch(fetchAsyncMovies(search));
		dispatch(fetchAsyncSeries(search));
		setSearch("");
	};

	return (
		<div className="header">
			<div className="logo">
				<Link to="/">Movie App</Link>
			</div>
			<div className="search-bar">
				<form onSubmit={submitHandler}>
					<input
						type="text"
						value={search}
						placeholder="Search Movies or Shows"
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button type="submit">
						<i className="fa fa-search"></i>
					</button>
				</form>
			</div>
			<div className="user-image">
				<img src={user} alt="user" />
			</div>
		</div>
	);
};

export default Header;
