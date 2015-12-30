var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({
	// listen to any available actions provided by actions.jsx, if action matches method call it
	listenables: [Actions],
	getGameDetails: function(gameIds) {
		// fires ajax request using api module (api.jsx)

		return Api.get('thing?id=' + gameIds + '&stats=1')
			.then(function(json) {
      			this.games = json.items.item
				this.triggerChange();	 
    		}.bind(this));
		
	},
	triggerChange: function() {
		// fire trigger event
		this.trigger('change', this.games);
	}
});
