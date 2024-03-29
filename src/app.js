const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forCast = require("./utils/forcast");

const app = express();
const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Sunil",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Sunil",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		helpText: "This is some helpful text.",
		title: "Help",
		name: "Sunil",
	});
});

app.get("/weather", (req, res) => {
// 	// res.send({
// 	//     forecast: 'It is snowing',
// 	//     location: 'Philadelphia'
// 	// })

	if (!req.query.address) {
		return res.send({
			error: "You must provide address",
		});
	}
	const { address } = req.query;
	geoCode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({
				error,
			});
		}
		if (latitude && longitude && location) {
			forCast(latitude, longitude, (error, forCastdata) => {
				if (error) {
					return res.send({
						error,
					});
				}
				res.send({
					address: req.query.address,
					location,
					forCast: forCastdata,
				});
			});
		}
	});
	// res.send({
	// 	address: "Ahmedabad",
	// });
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Sunil",
		errorMessage: "Help article not found.",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Sunil",
		errorMessage: "Page not found.",
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
