var Fetch = require("whatwg-fetch");
var rootUrl =  'http://bgg-api.herokuapp.com/api/v1/';

module.exports = {
	get: function(url) {
		console.log('test');
		return fetch(rootUrl, + url {
			
		})
		.then(function(response) {

			return response.json();
		})
	}
}

