"use strict";

const React = require('react');
const ReactRouter =  require('react-router');
const HashHistory = require('react-router/lib/hashhistory');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;

const Main = require('./components/main.jsx');
const SearchResults = require('./components/search-results.jsx');
const GameDetails = require('./components/game-details.jsx');

module.exports = (
	<Router history = {new HashHistory}>
		<Route path = "/" component = {Main} >
			<Route path = "boardgame/:id" component = {GameDetails} />
			<Route path = "search/:query" component = {SearchResults} />
		</Route>
	</Router>
);
