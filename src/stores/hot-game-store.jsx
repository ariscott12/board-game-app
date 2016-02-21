var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({
	// listen to any available actions provided by actions.jsx, if action matches method call it
	listenables: [Actions],
	getHotGames: function() {
		// Check if hotGames data already exists if not use api to fetch data
		if(this.hotGames) {
			//console.log('exists');
			// this.games = this.hotGames
			this.triggerChange();	 
		} else {
			// fires ajax request using api module (api.jsx)
			return Api.get('hot?boardgame')
				.then(function(json) {
					this.hotGames = json.items.item;
					this.triggerChange();	 
    			}.bind(this));
		}	
	},	
	triggerChange: function() {
		// fire trigger event
		this.trigger('change', this.hotGames);
	}
});
