import { useEffect, useState } from "react";

const api = {
	key: "fd9c5291ec3925f4f1880bad61e64113",
	base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
	const dateBuilder = (d) => {
		let months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		let days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();
		return `${day} ${date} ${month} ${year}`;
	};
	const [query, setQuery] = useState("");
	const [weather, setWeather] = useState({});
	const [background, setBackground] = useState("app");

	const search = (evt) => {
		if (evt.key == "Enter") {
			fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
				.then((res) => res.json())
				.then((result) => {
					setWeather(result);
					setQuery("");
					if (result.main.temp > 28) {
						setBackground("app warm");
					} else {
						setBackground("app");
					}
				});
		}
	};

	return (
		<div className={background}>
			<main>
				<div className="search-box">
					<input
						type="text"
						className="search-bar"
						placeholder="Search..."
						onChange={(e) => setQuery(e.target.value)}
						value={query}
						onKeyPress={search}
					/>
				</div>
				{typeof weather.main !== "undefined" ? (
					<>
						<div className="location-box">
							<div className="location">
								{weather.name}, {weather.sys.country}
							</div>
							<div className="date">{dateBuilder(new Date())}</div>
						</div>
						<div className="weather-box">
							<div className="temp">{weather.main.temp}°C</div>
							<div className="weather">{weather.weather[0].main}</div>
						</div>
					</>
				) : (
					""
				)}
			</main>
		</div>
	);
}

export default App;
