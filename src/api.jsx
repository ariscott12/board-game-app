var Fetch = require("whatwg-fetch");
var rootUrl =  'http://bgg-api.herokuapp.com/api/v1/hot?boardgame';

module.exports = {
	get: function(url) {
		return fetch(rootUrl, {
			
		})
		.then(function(response) {
			return response.json();
		})
	}
}

