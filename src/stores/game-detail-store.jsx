"use strict";

const Api = require('../utils/api');
const Reflux = require('reflux');
const Actions = require('../actions');
const _ = require('underscore');

module.exports = Reflux.createStore({
	// listen to any available actions provided by actions.jsx, if action matches method call it
	listenables: [Actions],
	getGameDetails(gameIds) {
		// fires ajax request using api module (api.jsx)
		return Api.get('thing?id=' + gameIds + '&stats=1')
			.then(function(json) {
				this.games = json.items.item;  				
				this.triggerChange();	
		}.bind(this));
	},
	findGame(id) {
		if(this.games) {
			for (var i = 0; i < this.games.length; i++) {
				if(this.games[i].$.id === id) {
					return [this.games[i]];
				}
				else {
					this.getGameDetails(id);
				} 
			} 
		} else {
			this.getGameDetails(id);
		}
	},

	triggerChange() {
		// fire trigger event
		this.trigger('change', this.games);
	}
});
