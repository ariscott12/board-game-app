var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({
	// listen to any available actions provided by actions.jsx, if action matches method call it
	listenables: [Actions],
	getSearchResults: function(query) {
	//	console.log('search');
		// fires ajax request using api module (api.jsx)
		console.log(query);
		return Api.get('search?query=' + query)
			.then(function(json) {
				
      			this.results = json.items.item;
      			//console.log(this.results);
				this.triggerChange();	 
    		}.bind(this));
		
	},
	findGame(id) {
		for (var i = 0; i < this.results.length; i++) {
			//console.log('found');
			if(this.results[i].$.id === id) {
				
				//return [this.results[i]];
			} else {
				//console.log('test');
				//this.getGameDetails(id);
			}
		}
	},
	triggerChange: function() {
		// fire trigger event
		this.trigger('change', this.results);
	}
});
