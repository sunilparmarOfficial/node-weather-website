const request = require("request");

const forCast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=b5e83abbc6a523da777702d1b3c181d2&query=${latitude},${longitude}&units=f`;
	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback("Unable to connect to weather service!", undefined);
		} else if (response.body.error) {
			callback("Unable to find location!", undefined);
		} else {
			callback(
				undefined,
				`${response.body.current.weather_descriptions[0]} It is currently ${response.body.current.temperature} degrees out. It feels likes ${response.body.current.feelslike} degrees out.`
			);
		}
	});
};

module.exports = forCast;
