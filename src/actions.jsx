var Reflux = require('reflux');

module.exports = Reflux.createActions([
	// runs action in any store that has these methods
	'getHotGames',
	'getGameDetails',
	'getSearchResults',
	'getHotGameDetails',
	'findGame'
]);