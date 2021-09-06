import { createChart } from "./chart.js";

const errorLabel = document.querySelector("label[for='error-msg']");
const latInp = document.querySelector("#latitude");
const lonInp = document.querySelector("#longitude");
const airQuality = document.querySelector(".air-quality");
const airQualityStat = document.querySelector(".air-quality-status");
const srchBtn = document.querySelector(".search-btn");
const componentsEle = document.querySelectorAll(".component-val");

const latInp2 = document.querySelector("#latitude2");
const lonInp2 = document.querySelector("#longitude2");
const srchBtn2 = document.querySelector(".search-btn-2");

const appId = "c1d2d185956c5e93de7e48f777e18c9b"; // API Key from https://home.openweathermap.org/api_keys
const link = "https://api.openweathermap.org/data/2.5/air_pollution"; // API end point

const getUserLocation = () => {
	// Get user Location
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			onPositionGathered,
			onPositionGatherError
		);
	} else {
		onPositionGatherError({
			message: "Can't Access your location. Please enter your co-ordinates",
		});
	}
};

const onPositionGathered = (pos) => {
	let lat = pos.coords.latitude.toFixed(4),
		lon = pos.coords.longitude.toFixed(4);

	// Set values of Input for user to know
	latInp.value = lat;
	lonInp.value = lon;

	// Get Air data from weather API
	getAirQuality(lat, lon);
};

const getAirQuality = async (lat, lon) => {
	// Get data from api
	const rawData = await fetch(
		`${link}?lat=${lat}&lon=${lon}&appid=${appId}`
	).catch((err) => {
		onPositionGatherError({
			message: "Something went wrong. Check your internet conection.",
		});
		console.log(err);
	});
	const airData = await rawData.json();
	console.log(airData);
	setValuesOfAir(airData);
	setComponentsOfAir(airData);
};

const setValuesOfAir = (airData) => {
	const aqi = airData.list[0].main.aqi;
	let airStat = "",
		color = "";

	// Set Air Quality Index
	airQuality.innerText = aqi;

	// Set status of air quality

	switch (aqi) {
		case 1:
			airStat = "Good";
			color = "rgb(19, 201, 28)";
			break;
		case 2:
			airStat = "Fair";
			color = "rgb(15, 134, 25)";
			break;
		case 3:
			airStat = "Moderate";
			color = "rgb(201, 204, 13)";
			break;
		case 4:
			airStat = "Poor";
			color = "rgb(204, 83, 13)";
			break;
		case 5:
			airStat = "Very Poor";
			color = "rgb(204, 13, 13)";
			break;
		default:
			airStat = "Unknown";
	}

	airQualityStat.innerText = airStat;
	airQualityStat.style.color = color;
};

const setComponentsOfAir = (airData) => {
	let components = { ...airData.list[0].components };
	const data = [];
	let xAxisLabels = [];
	componentsEle.forEach((ele, i) => {
		const attr = ele.getAttribute("data-comp");
		ele.innerText = components[attr] + " μg/m³";

		xAxisLabels.push(
			ele.previousElementSibling.textContent.split(":")[0].trimEnd()
		);
		data.push(components[attr]);
	});
	// createChart(xAxisLabels, [{ label: "City 1", data: data }]);
	/* here you need to get labels i.e the components in the air and make sure 
		for both cities the order is same (store the array in global variable)
		the second arguement is array of objects, here is where you pass data of 2 cities as an array.
		the required keys in the object is 'label' which will simply be the name of the city and the other key is
		'data' which is array of numbers which will the amount of components present in air (μg/m³).
		Ex:

		For 1 city:
		data = [12, 234, 434, 435, 45, 54]
		createChart(xAxisLabels, [{ label: "City 1", data: data }])

		For 2 cities:
		data = [12, 234, 434, 435, 45, 54]
		data2 = [12, 234, 434, 435, 45, 54]
		createChart(xAxisLabels, [{ label: "City 1", data: data }, { label: "City 2", data: data2 }])
		
		For 3 cities:
		data = [12, 234, 434, 435, 45, 54]
		data2 = [12, 234, 434, 435, 45, 54]
		data3 = [12, 234, 434, 435, 45, 54]
		createChart(xAxisLabels, [{ label: "City 1", data: data }, { label: "City 2", data: data2 }, { label: "City 3", data: data3 }])
		and soo onn...
	*/
	// This is an example for 2 cites :
	createChart(xAxisLabels, [
		{
			label: "City 1",
			data: [
				Math.floor(Math.random() * 20),
				Math.floor(Math.random() * 20),
				Math.floor(Math.random() * 20),
				Math.floor(Math.random() * 20),
				Math.floor(Math.random() * 20),
				Math.floor(Math.random() * 20),
				Math.floor(Math.random() * 20),
				Math.floor(Math.random() * 20),
			],
		},
		{
			label: "City 1",
			data: [
				Math.floor(Math.random() * 20),
				Math.floor(Math.random() * 20),
				Math.floor(Math.random() * 20),
				Math.floor(Math.random() * 20),
				Math.floor(Math.random() * 20),
				Math.floor(Math.random() * 20),
				Math.floor(Math.random() * 20),
				Math.floor(Math.random() * 20),
			],
		},
	]);
};

const onPositionGatherError = (e) => {
	errorLabel.innerText = e.message;
};

srchBtn.addEventListener("click", () => {
	getAirQuality(
		parseFloat(latInp.value).toFixed(4),
		parseFloat(lonInp.value).toFixed(4)
	);
});

srchBtn2.addEventListener("click", () => {
	getAirQuality(
		parseFloat(latInp2.value).toFixed(4),
		parseFloat(lonInp2.value).toFixed(4)
	);
});

getUserLocation();
