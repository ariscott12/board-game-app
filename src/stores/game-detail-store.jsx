"use strict";

const Api = require('../utils/api');
const Reflux = require('reflux');
const Actions = require('../actions');
const _ = require('underscore');

module.exports = Reflux.createStore({
	// listen to any available actions provided by actions.jsx, if action matches method call it
	listenables: [Actions],
	gameIds: [],
	games: [],
	// getGameDetails(gameIds) {
	// 	let difference = _.difference(gameIds,this.gameIds);

	// 	if(difference.length > 0) {
	// 		this.gameIds = this.gameIds.concat(difference,this.gameIds);
	// 		this.fetchGameData(difference);

	// 	}  else {
	// 		this.triggerChange();	
	// 	}
	// },
	getGameDetails(gameIds) {
		// fires ajax request using api module (api.jsx)
		return Api.get('thing?id=' + gameIds + '&stats=1')
			.then(function(json) {

  				//this.games = this.games.concat(json.items.item);
  				this.games = json.items.item ;
				this.triggerChange();	
		}.bind(this));
	},
	findGame(id) {
		for (var i = 0; i < this.games.length; i++) {
			if(this.games[i].$.id === id) {
				return [this.games[i]];
			} else {
				//console.log('test');
				//this.getGameDetails(id);
			}
		}
	},
	triggerChange() {
		// fire trigger event
		this.trigger('change', this.games);
	}
});
