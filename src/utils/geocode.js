const request = require("request");

const geoCode = (address, callback) => {
	const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1Ijoic3VuaWwyMDAyIiwiYSI6ImNsMXZzcTZsejBjbTczaW1wYnBjcDAwZDIifQ.poqE3a8SVrEiJ_F-zYHPlg&limit=1`;
	request({ url: apiUrl, json: true }, (error, response) => {
		if (error) {
			callback("Unable to connect to geo location service!", undefined);
		} else if (response.body.features.length === 0) {
			callback("Unable to find corrosponding location", undefined);
		} else {
			const placeName = response.body.features[0].place_name;
			const latitude = response.body.features[0].center[1];
			const longitude = response.body.features[0].center[0];
			callback(undefined, { latitude, longitude, location: placeName });
		}
	});
  
};


// const add = (arg1, arg2, callback) => {
// 	setTimeout(() => {
// 		const sum = arg1 + arg2;
// 		callback(sum);
// 	}, 2000);
// };

// add(1,4,(sumVal) => {
// 	console.log(sumVal)
// })


module.exports = geoCode
