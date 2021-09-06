const ctx = document.getElementById("myChart").getContext("2d");

/***
 * @argument
 * An array with x-axis labels,
 * An array of objects with required keys 'label' and 'data'
 * where 'label' is string and 'data' is an array of numbers or string
 *
 ***/
const createChart = (labels, datasets) => {
	const myChart = new Chart(ctx, {
		type: "bar",
		data: {
			labels: labels,
			datasets: datasets.map((dataset) => ({
				...getNewDefOpts(),
				label: dataset.label,
				data: dataset.data,
			})),
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		},
	});
	console.log(myChart);
};

const getNewDefOpts = () => {
	const clr = `${Math.ceil(Math.random() * 170)}, ${Math.ceil(
		Math.random() * 170
	)}, ${Math.ceil(Math.random() * 170)}`;
	const defaultOpts = {
		backgroundColor: [`rgba(${clr}, 0.4)`],
		borderColor: [`rgba(${clr}, 1)`],
		borderWidth: 1,
	};
	return defaultOpts;
};

export { createChart };
